import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  SimpleChanges,
  OnChanges,
  PLATFORM_ID,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Represents a single step in a flow phase.
 */
export interface StepFlowStep {
  /** Title displayed on the step card */
  title: string;
  /** Description text below the title */
  description: string;
  /** CSS class for the icon (e.g., PrimeIcons, FontAwesome, Material Icons) */
  icon: string;
}

/**
 * Represents a phase containing multiple steps.
 */
export interface StepFlowPhase {
  /** Optional title displayed above the phase */
  phase_title?: string;
  /** Array of steps in this phase */
  steps: StepFlowStep[];
}

/**
 * Configuration for customizing the step flow appearance.
 */
export interface StepFlowConfig {
  /** Card minimum width in px (default: 200) */
  cardMinWidth?: number;
  /** Card estimated width including gap for layout calculation (default: 240) */
  cardLayoutWidth?: number;
  /** Arrow/connector stroke color (default: '#8C273B') */
  arrowColor?: string;
  /** Arrow stroke width (default: 2) */
  arrowStrokeWidth?: number;
  /** Arrowhead fill color (default: '#4e73df') */
  arrowheadColor?: string;
  /** Card background color (default: '#ffffff') */
  cardBackground?: string;
  /** Card border radius (default: '1rem') */
  cardBorderRadius?: string;
  /** Card box shadow (default: '0 0px 5px #717171') */
  cardBoxShadow?: string;
  /** Icon color (default: '#8C273B') */
  iconColor?: string;
  /** Icon font size (default: '1.5rem') */
  iconSize?: string;
  /** Title font size (default: '1.1rem') */
  titleFontSize?: string;
  /** Title font weight (default: 600) */
  titleFontWeight?: number;
  /** Description font size (default: '0.9rem') */
  descriptionFontSize?: string;
  /** Description color (default: '#555') */
  descriptionColor?: string;
  /** Phase header font size (default: '1.5rem') */
  phaseHeaderFontSize?: string;
  /** Phase header font weight (default: 600) */
  phaseHeaderFontWeight?: number;
  /** Gap between cards (default: '2rem') */
  gap?: string;
  /** Card padding (default: '1.5rem') */
  cardPadding?: string;
}

@Component({
  selector: 'jsf-step-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-stepflow.component.html',
  styleUrls: ['./json-stepflow.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class JsonStepflowComponent implements AfterViewInit, OnChanges {
  /** Array of phases, each containing steps to display */
  @Input() phases: StepFlowPhase[] = [];

  /** Optional configuration to customize appearance */
  @Input() config: StepFlowConfig = {};

  private isBrowser: boolean;

  /** Resolved config with defaults applied */
  resolvedConfig: Required<StepFlowConfig> = this.getDefaultConfig();

  phaseRows: { title: string; rows: StepFlowStep[][] }[] = [];
  arrows: { x1: number; y1: number; x2: number; y2: number }[] = [];

  @ViewChildren('stepCard', { read: ElementRef }) stepCards!: QueryList<ElementRef>;
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getDefaultConfig(): Required<StepFlowConfig> {
    return {
      cardMinWidth: 200,
      cardLayoutWidth: 240,
      arrowColor: '#8C273B',
      arrowStrokeWidth: 2,
      arrowheadColor: '#4e73df',
      cardBackground: '#ffffff',
      cardBorderRadius: '1rem',
      cardBoxShadow: '0 0px 5px #717171',
      iconColor: '#8C273B',
      iconSize: '1.5rem',
      titleFontSize: '1.1rem',
      titleFontWeight: 600,
      descriptionFontSize: '0.9rem',
      descriptionColor: '#555',
      phaseHeaderFontSize: '1.5rem',
      phaseHeaderFontWeight: 600,
      gap: '2rem',
      cardPadding: '1.5rem',
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.resolvedConfig = { ...this.getDefaultConfig(), ...this.config };
    }
    if (changes['phases'] || changes['config']) {
      this.groupStepsIntoRows();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.rebuildLayout();
      setTimeout(() => this.drawArrows());
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.rebuildLayout();
    }
  }

  getRowJustify(rowIndex: number, cardsInRow: number): string {
    const isMobile = this.isBrowser ? window.innerWidth < 768 : false;
    if (cardsInRow === 1 && isMobile) {
      return 'center';
    }
    return rowIndex % 2 === 0 ? 'flex-start' : 'flex-end';
  }

  private rebuildLayout(): void {
    this.groupStepsIntoRows();
    if (this.isBrowser) {
      setTimeout(() => this.drawArrows(), 0);
    }
  }

  private groupStepsIntoRows(): void {
    if (!this.isBrowser || !this.containerRef) {
      this.phaseRows = this.phases.map(phase => ({
        title: phase.phase_title || '',
        rows: [phase.steps]
      }));
      return;
    }

    const container = this.containerRef.nativeElement as HTMLElement;
    const cardWidth = this.resolvedConfig.cardLayoutWidth;
    const containerWidth = container.offsetWidth;
    const cardsPerRow = Math.max(1, Math.floor(containerWidth / cardWidth));

    this.phaseRows = [];

    for (const phase of this.phases) {
      const phaseData: { title: string; rows: StepFlowStep[][] } = {
        title: phase.phase_title || '',
        rows: []
      };

      const steps = phase.steps;

      for (let i = 0; i < steps.length; i += cardsPerRow) {
        let row = steps.slice(i, i + cardsPerRow);
        if (phaseData.rows.length % 2 !== 0) row = [...row].reverse();
        phaseData.rows.push(row);
      }
      this.phaseRows.push(phaseData);
    }
  }

  private drawArrows(): void {
    if (!this.isBrowser) return;
    this.arrows = [];
    const container = this.containerRef?.nativeElement as HTMLElement;

    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cardEls = this.stepCards?.toArray().map(c => c.nativeElement) || [];

    if (cardEls.length === 0) return;

    let currentCardIndex = 0;

    for (const phaseData of this.phaseRows) {
      const phaseCards: HTMLElement[][] = [];

      for (let i = 0; i < phaseData.rows.length; i++) {
        const row = phaseData.rows[i];
        const rowCards: HTMLElement[] = [];

        for (let j = 0; j < row.length; j++) {
          if (currentCardIndex < cardEls.length) {
            rowCards.push(cardEls[currentCardIndex]);
            currentCardIndex++;
          }
        }
        phaseCards.push(rowCards);
      }

      for (let i = 0; i < phaseCards.length; i++) {
        const row = phaseCards[i];
        if (row.length === 0) continue;

        const isEven = i % 2 === 0;
        const ordered = isEven ? row : [...row].reverse();

        for (let j = 0; j < ordered.length - 1; j++) {
          const from = ordered[j].getBoundingClientRect();
          const to = ordered[j + 1].getBoundingClientRect();

          this.arrows.push({
            x1: from.left + from.width / 2 - containerRect.left,
            y1: from.top + from.height / 2 - containerRect.top,
            x2: to.left + to.width / 2 - containerRect.left,
            y2: to.top + to.height / 2 - containerRect.top,
          });
        }

        if (i < phaseCards.length - 1 && phaseCards[i + 1].length > 0) {
          const from = ordered[ordered.length - 1].getBoundingClientRect();
          const nextRowIndex = isEven ? phaseCards[i + 1].length - 1 : 0;
          const to = phaseCards[i + 1][nextRowIndex].getBoundingClientRect();

          this.arrows.push({
            x1: from.left + from.width / 2 - containerRect.left,
            y1: from.top + from.height / 2 - containerRect.top,
            x2: from.left + from.width / 2 - containerRect.left,
            y2: to.top + to.height / 2 - containerRect.top,
          });
        }
      }
    }
  }
}
