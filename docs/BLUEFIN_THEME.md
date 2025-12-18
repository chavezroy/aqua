# Bluefin Theme - Finterest Design System

## Overview

The **Bluefin** theme is a modern glass morphism design system for Finterest, inspired by aquatic aesthetics. It features translucent cards, gradient backgrounds, and smooth animations that create a fluid, underwater-inspired interface.

---

## Design Philosophy

**"Clear Water"** - The Bluefin theme embodies the clarity and depth of ocean water, using:
- Translucent glass morphism effects
- Gradient backgrounds mimicking light through water
- Smooth, fluid animations
- High contrast text for readability
- Layered depth through opacity and blur

---

## Color Palette

### Primary Gradients
```css
/* Main Background Gradient */
background: linear-gradient(to bottom right, #22d3ee, #3b82f6, #2563eb)
/* cyan-400 → blue-500 → blue-600 */

/* Button Gradient */
background: linear-gradient(to right, #06b6d4, #3b82f6)
/* cyan-500 → blue-500 */

/* Icon Badge Gradient */
background: linear-gradient(to bottom right, #22d3ee, #3b82f6)
/* cyan-400 → blue-500 */
```

### Glass Morphism Colors
- **Primary Glass**: `rgba(255, 255, 255, 0.1)` with `backdrop-filter: blur(12px)`
- **Secondary Glass**: `rgba(255, 255, 255, 0.2)` with `backdrop-filter: blur(8px)`
- **Tertiary Glass**: `rgba(255, 255, 255, 0.3)` with `backdrop-filter: blur(8px)`

### Status Colors
- **Success**: `#22C55E` (green-500)
- **Warning**: `#F59E0B` (orange-500)
- **Critical**: `#EF4444` (red-500)
- **Info**: `#22D3EE` (cyan-400)

### Text Colors
- **Primary**: `rgba(255, 255, 255, 1)` - Main headings and important text
- **Secondary**: `rgba(255, 255, 255, 0.9)` - Subheadings
- **Tertiary**: `rgba(255, 255, 255, 0.8)` - Body text
- **Muted**: `rgba(255, 255, 255, 0.7)` - Labels and metadata

---

## Component Patterns

### Background
```tsx
<div className="min-h-screen bluefin-gradient-primary relative overflow-hidden">
  <BackgroundBubbles />
  {/* Content */}
</div>
```

### Primary Card
```tsx
<div className="bluefin-card-primary p-6">
  {/* Content */}
</div>
```

**Classes**: `bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl`

### Secondary Card (Nested)
```tsx
<div className="bluefin-card-secondary p-4">
  {/* Content */}
</div>
```

**Classes**: `bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/30`

### Header
```tsx
<header className="bluefin-header">
  {/* Navigation */}
</header>
```

**Classes**: `bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-lg`

### Gradient Button
```tsx
<button className="bluefin-btn-gradient px-4 py-2 rounded-lg">
  Action
</button>
```

**Classes**: `bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg`

### Glass Button
```tsx
<button className="bluefin-btn-glass px-4 py-2 rounded-lg">
  Secondary Action
</button>
```

**Classes**: `bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white`

### Icon Badge
```tsx
<div className="bluefin-icon-badge w-10 h-10">
  <Icon className="w-6 h-6 text-white" />
</div>
```

**Classes**: `bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg`

---

## Typography

### Headers
- Use white text with drop-shadow for readability on gradients
- **Don't use Tailwind font-size, font-weight, or line-height classes** unless specifically requested
- Let default HTML element typography from theme.css apply

### Text Shadows
```tsx
<h1 className="text-white bluefin-text-shadow-lg">Title</h1>
<p className="text-white/80 bluefin-text-shadow">Body text</p>
```

---

## Effects & Styling

### Background Bubbles
```tsx
<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
  <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
  {/* More bubbles */}
</div>
```

### Border Radius Scale
- **Large cards**: `rounded-2xl` (16px)
- **Nested cards**: `rounded-xl` (12px)
- **Small elements**: `rounded-lg` (8px)
- **Circular badges**: `rounded-full`

### Shadows
- **Primary cards**: `shadow-xl`
- **Nested elements**: `shadow-lg`
- **Hover states**: Increased shadow + opacity

---

## Progress Bars

### Container
```tsx
<div className="bluefin-progress-container h-6">
  <div
    className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 shadow-lg"
    style={{
      width: `${Math.min(percentage, 100)}%`,
      backgroundColor: getBioloadColor(percentage),
    }}
  />
</div>
```

### Color Coding
- **0-50%**: Green (`#22C55E`)
- **50-80%**: Orange (`#F59E0B`)
- **80%+**: Red (`#EF4444`)

---

## Alert Components

### Critical Alert
```tsx
<div className="bluefin-alert-critical rounded-xl p-4">
  <AlertCircle className="w-5 h-5" />
  <p>Critical issue message</p>
</div>
```

**Classes**: `bg-red-500/20 border border-red-400/30 text-red-100`

### Warning Alert
```tsx
<div className="bluefin-alert-warning rounded-xl p-4">
  <AlertTriangle className="w-5 h-5" />
  <p>Warning message</p>
</div>
```

**Classes**: `bg-orange-500/20 border border-orange-400/30 text-orange-100`

### Success Alert
```tsx
<div className="bluefin-alert-success rounded-xl p-4">
  <p className="text-green-100 font-medium">✓ All checks passed!</p>
</div>
```

**Classes**: `bg-green-500/20 border border-green-400/30 text-green-100`

---

## Z-Index Layers

```
z-0:  Background bubbles (fixed, pointer-events-none)
z-10: Main content wrapper
z-40: Sticky header
z-50: Modals/dialogs (Radix default)
```

---

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: 1024px+ (lg)

**Layout changes:**
- Mobile: Single column, stacked
- Desktop: 2/3 main content + 1/3 sidebar

---

## Animation Guidelines

### Transitions
- **Standard**: `transition-all duration-300`
- **Fast**: `transition-all duration-150`
- **Slow**: `transition-all duration-500`

### Progress Bars
- Smooth width transitions: `transition-all duration-300`

### Cards
- Hover shadow transitions: `transition-shadow duration-200`

### Buttons
- Subtle scale on hover: `hover:scale-105 transition-transform duration-200`

---

## Usage Examples

### TankOverview Component
```tsx
<div className="bluefin-card-primary p-6">
  <div className="flex items-center gap-2 mb-6">
    <div className="bluefin-icon-badge w-10 h-10">
      <Droplet className="w-6 h-6 text-white" />
    </div>
    <h2 className="font-semibold text-white text-xl bluefin-text-shadow">
      Tank Overview
    </h2>
  </div>
  
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <div className="bluefin-card-secondary p-4">
      <div className="text-white/80 mb-1">Volume</div>
      <div className="font-bold text-white text-xl">
        {volume.toFixed(1)} gal
      </div>
    </div>
    {/* More stat cards */}
  </div>
</div>
```

### Header Component
```tsx
<header className="bluefin-header">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center gap-3">
      <div className="bluefin-icon-badge w-16 h-16">
        <span className="text-4xl">🐠</span>
      </div>
      <div>
        <h1 className="font-bold text-3xl sm:text-4xl text-white bluefin-text-shadow-lg">
          Finterest
        </h1>
        <p className="text-white/90 bluefin-text-shadow">
          Your Virtual Aquarium
        </p>
      </div>
    </div>
  </div>
</header>
```

---

## Best Practices

1. **Glass Morphism Stacking**
   - Parent: `bg-white/10`
   - Child: `bg-white/20`
   - Nested child: `bg-white/30`

2. **Text Readability**
   - Always use text shadows on white text over gradients
   - Use appropriate opacity levels for hierarchy

3. **Consistency**
   - Use theme utility classes when available
   - Maintain consistent spacing (p-4, p-6, gap-3, gap-6)

4. **Performance**
   - Use `backdrop-filter` sparingly (can impact performance)
   - Consider `will-change` for animated elements

5. **Accessibility**
   - Ensure sufficient contrast ratios
   - Test with screen readers
   - Provide focus states for all interactive elements

---

## Migration Guide

To migrate existing components to Bluefin theme:

1. Replace background classes with `bluefin-gradient-primary`
2. Replace card classes with `bluefin-card-primary` or `bluefin-card-secondary`
3. Replace button classes with `bluefin-btn-gradient` or `bluefin-btn-glass`
4. Add `bluefin-text-shadow` to white text over gradients
5. Update icon badges to use `bluefin-icon-badge`
6. Replace alert classes with `bluefin-alert-*` variants

---

## Theme File Location

The Bluefin theme CSS is located at:
```
/src/styles/bluefin-theme.css
```

Import it in your main CSS file:
```css
@import './styles/bluefin-theme.css';
```

---

## End of Bluefin Theme Documentation

This design system provides a cohesive, modern aesthetic for the Finterest application while maintaining usability and accessibility standards.
