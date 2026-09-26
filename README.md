# json-stepflow

An Angular component that converts JSON data into beautiful, responsive step-flow visualizations with **automatic layout adjustment** based on device width and height.

![Angular](https://img.shields.io/badge/Angular-17%2B-red)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **JSON to Steps**: Simply pass a JSON array of phases/steps and get a beautiful flow diagram
- **Responsive Layout**: Automatically adjusts the number of cards per row based on container width
- **Boustrophedon (Snake) Layout**: Rows alternate direction (left-to-right, then right-to-left) for a natural reading flow
- **SVG Arrow Connectors**: Automatic arrow lines connecting steps in order
- **Multiple Phases**: Support for grouping steps into labeled phases
- **Fully Customizable**: Colors, sizes, fonts, shadows — all configurable via a simple config object
- **SSR Compatible**: Works with Angular Universal / Server-Side Rendering
- **Standalone Component**: No module imports needed — just import the component directly
- **Icon Agnostic**: Works with PrimeIcons, FontAwesome, Material Icons, or any CSS icon library

## Installation

```bash
npm install json-stepflow
```

## Quick Start

### 1. Import the component

```typescript
import { Component } from '@angular/core';
import { JsonStepflowComponent } from 'json-stepflow';
import type { StepFlowPhase } from 'json-stepflow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonStepflowComponent],
  template: `
    <jsf-step-flow [phases]="phases"></jsf-step-flow>
  `
})
export class AppComponent {
  phases: StepFlowPhase[] = [
    {
      phase_title: 'Account Onboarding',
      steps: [
        { title: 'Create Account', description: 'Sign up with your work email', icon: 'pi pi-user-plus' },
        { title: 'Verify Email', description: 'Confirm your email with OTP', icon: 'pi pi-check-circle' },
        { title: 'Setup Profile', description: 'Enter profile and organization details', icon: 'pi pi-user-edit' },
        { title: 'Get Started', description: 'Access dashboard and begin', icon: 'pi pi-rocket' }
      ]
    }
  ];
}
```

### 2. Data Structure (JSON)

```json
[
  {
    "phase_title": "Phase 1: Initial Setup",
    "steps": [
      { "title": "Sign Up", "description": "Create your account credentials", "icon": "pi pi-user-plus" },
      { "title": "Verify Identity", "description": "2-step verification code", "icon": "pi pi-shield" },
      { "title": "Profile Info", "description": "Add personal and team information", "icon": "pi pi-id-card" },
      { "title": "Select Plan", "description": "Choose subscription tier", "icon": "pi pi-th-large" }
    ]
  },
  {
    "phase_title": "Phase 2: Workspace Configuration",
    "steps": [
      { "title": "Create Workspace", "description": "Define workspace name and domain", "icon": "pi pi-folder" },
      { "title": "Invite Members", "description": "Send invitations to teammates", "icon": "pi pi-users" },
      { "title": "Integrations", "description": "Connect GitHub, Slack, and cloud tools", "icon": "pi pi-link" },
      { "title": "Permissions", "description": "Configure roles and access rights", "icon": "pi pi-lock" },
      { "title": "Billing Setup", "description": "Add payment method securely", "icon": "pi pi-credit-card" },
      { "title": "Launch Project", "description": "Deploy your first active project", "icon": "pi pi-send" }
    ]
  }
]
```

## Customization

Pass a `config` object to customize the appearance:

```typescript
import { StepFlowConfig } from 'json-stepflow';

config: StepFlowConfig = {
  cardMinWidth: 180,
  cardLayoutWidth: 220,
  arrowColor: '#3b82f6',
  arrowheadColor: '#1d4ed8',
  arrowStrokeWidth: 2,
  cardBackground: '#f8fafc',
  cardBorderRadius: '0.75rem',
  cardBoxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  iconColor: '#3b82f6',
  iconSize: '2rem',
  titleFontSize: '1rem',
  titleFontWeight: 700,
  descriptionFontSize: '0.85rem',
  descriptionColor: '#64748b',
  phaseHeaderFontSize: '1.5rem',
  phaseHeaderFontWeight: 700,
  gap: '1.5rem',
  cardPadding: '1.25rem',
};
```

```html
<jsf-step-flow [phases]="phases" [config]="config"></jsf-step-flow>
```

## API Reference

### Selector: `<jsf-step-flow>`

| Input | Type | Default | Description |
|---|---|---|---|
| `phases` | `StepFlowPhase[]` | `[]` | Array of phases containing steps |
| `config` | `StepFlowConfig` | `{}` | Optional configuration for styling |

### StepFlowPhase

| Property | Type | Required | Description |
|---|---|---|---|
| `phase_title` | `string` | No | Title shown above phase |
| `steps` | `StepFlowStep[]` | Yes | Array of steps |

### StepFlowStep

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Step card title |
| `description` | `string` | Yes | Step card description |
| `icon` | `string` | Yes | CSS icon class (any icon lib) |

### StepFlowConfig

All properties are optional:

| Property | Type | Default | Description |
|---|---|---|---|
| `cardMinWidth` | `number` | `200` | Minimum width of card in px |
| `cardLayoutWidth` | `number` | `240` | Width used for row calculation (card + gap) |
| `arrowColor` | `string` | `'#8C273B'` | Connecting line color |
| `arrowStrokeWidth` | `number` | `2` | Line thickness |
| `arrowheadColor` | `string` | `'#4e73df'` | Arrow marker fill color |
| `cardBackground` | `string` | `'#ffffff'` | Card background color |
| `cardBorderRadius` | `string` | `'1rem'` | Card corner rounding |
| `cardBoxShadow` | `string` | `'0 0px 5px #717171'` | Card box shadow |
| `iconColor` | `string` | `'#8C273B'` | Step icon color |
| `iconSize` | `string` | `'1.5rem'` | Step icon size |
| `titleFontSize` | `string` | `'1.1rem'` | Card title size |
| `titleFontWeight` | `number` | `600` | Card title font weight |
| `descriptionFontSize` | `string` | `'0.9rem'` | Card description size |
| `descriptionColor` | `string` | `'#555'` | Card description text color |
| `phaseHeaderFontSize` | `string` | `'1.5rem'` | Phase title text size |
| `phaseHeaderFontWeight` | `number` | `600` | Phase title font weight |
| `gap` | `string` | `'2rem'` | Gap between cards |
| `cardPadding` | `string` | `'1.5rem'` | Card inner padding |

## How It Works

1. **Input**: You provide a JSON array of phases, each with steps.
2. **Layout**: The component measures the container width and calculates how many cards fit per row.
3. **Snake Pattern**: Odd rows are reversed to create a natural boustrophedon reading flow.
4. **Arrows**: SVG lines are drawn connecting each step to the next in logical order.
5. **Responsive**: On window resize, the layout recalculates automatically.

## Compatibility

| Angular Version | Supported |
|---|---|
| 19.x | Yes |
| 18.x | Yes |
| 17.x | Yes |

## License

MIT
