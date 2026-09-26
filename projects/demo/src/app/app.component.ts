import { Component } from '@angular/core';
import { JsonStepflowComponent } from 'json-stepflow';
import type { StepFlowPhase, StepFlowConfig } from 'json-stepflow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonStepflowComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onboardingPhases: StepFlowPhase[] = [
    {
      phase_title: 'Phase 1: User Registration & Verification',
      steps: [
        { title: 'Create Account', description: 'Register with work email and password', icon: 'pi pi-user-plus' },
        { title: 'Verify Email', description: 'Confirm account with secure OTP verification', icon: 'pi pi-envelope' },
        { title: 'Complete Profile', description: 'Provide personal details and photo', icon: 'pi pi-id-card' },
        { title: 'Security Setup', description: 'Configure 2-factor authentication', icon: 'pi pi-shield' },
        { title: 'Download Guide', description: 'Save onboarding documentation in PDF format', icon: 'pi pi-download' }
      ]
    },
    {
      phase_title: 'Phase 2: Organization & Project Setup',
      steps: [
        { title: 'Access Workspace', description: 'Sign into the management portal', icon: 'pi pi-sign-in' },
        { title: 'Company Details', description: 'Fill organization and domain info', icon: 'pi pi-building' },
        { title: 'Invite Teammates', description: 'Invite coworkers and assign roles', icon: 'pi pi-users' },
        { title: 'Connect Tools', description: 'Integrate Slack, GitHub, and Cloud APIs', icon: 'pi pi-link' },
        { title: 'Billing Details', description: 'Select subscription tier and billing method', icon: 'pi pi-credit-card' },
        { title: 'Submit Documents', description: 'Upload compliance and tax certificates', icon: 'pi pi-upload' },
        { title: 'Sign Agreement', description: 'Sign digital SLA and privacy policy', icon: 'pi pi-file-edit' },
        { title: 'Review & Confirm', description: 'Final check of all workspace settings', icon: 'pi pi-check-circle' },
        { title: 'Confirmation Email', description: 'Receive confirmation and credentials via email', icon: 'pi pi-send' },
        { title: 'Go Live', description: 'Deploy first project and monitor real-time updates', icon: 'pi pi-bell' }
      ]
    }
  ];

  customPhases: StepFlowPhase[] = [
    {
      phase_title: 'Software Development & Release Pipeline',
      steps: [
        { title: 'Requirements', description: 'Gather and analyze feature requirements', icon: 'pi pi-file-edit' },
        { title: 'Design', description: 'Create system architecture and UI mocks', icon: 'pi pi-palette' },
        { title: 'Development', description: 'Write clean code with unit test coverage', icon: 'pi pi-code' },
        { title: 'Code Review', description: 'Peer reviews and security linting checks', icon: 'pi pi-check-square' },
        { title: 'QA Testing', description: 'Automated E2E tests and staging validation', icon: 'pi pi-wrench' },
        { title: 'Deployment', description: 'Zero-downtime release to production cloud', icon: 'pi pi-cloud-upload' },
        { title: 'Monitoring', description: 'Real-time telemetry and health metrics', icon: 'pi pi-chart-line' }
      ]
    }
  ];

  customConfig: StepFlowConfig = {
    arrowColor: '#2563eb',
    arrowheadColor: '#1d4ed8',
    cardBackground: '#f0f9ff',
    cardBorderRadius: '0.75rem',
    cardBoxShadow: '0 2px 8px rgba(37, 99, 235, 0.15)',
    iconColor: '#2563eb',
    iconSize: '2rem',
    descriptionColor: '#475569',
    phaseHeaderFontSize: '1.5rem',
    phaseHeaderFontWeight: 700,
  };
}
