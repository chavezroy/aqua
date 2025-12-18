# Finterest - UI Elements & Functionality Documentation

## Overview
This document provides a comprehensive list of all UI elements in the Finterest dashboard with functionality briefs for UI designers.

---

## 1. HEADER SECTION

### 1.1 Application Branding
**Location:** Top left of header
**Elements:**
- **Fish Emoji Icon** (🐠)
  - Visual identifier for the application
  - Static decorative element
  
- **Application Title** ("Finterest")
  - Primary brand name
  - Typography: Bold, 3xl-4xl responsive sizing
  - Color: Default text color (dark)

- **Subtitle** ("Your Virtual Aquarium")
  - Descriptive tagline
  - Typography: Regular weight, gray-600
  - Static text

- **Current Tank Name** (e.g., "Basment")
  - Displays the name of the active tank configuration
  - Only visible when a tank has been named
  - Typography: Large, gray-500, medium weight
  - Dynamic content

### 1.2 Action Buttons (Header Right)
**Layout:** Horizontal flex row, responsive wrapping
**Responsive Behavior:** Full labels on desktop, abbreviated on mobile

#### 1.2.1 Start Over Button
- **Icon:** Home icon (lucide-react)
- **Label:** "Start Over" (desktop) / "Start" (mobile)
- **Variant:** Secondary (gray)
- **Functionality:** 
  - Clears current tank configuration
  - Returns user to splash/start screen
  - Resets all fish stock
  - Shows info toast notification

#### 1.2.2 Change Tank Button
- **Icon:** Folder open icon
- **Label:** "Change Tank" (desktop) / "Change" (mobile)
- **Variant:** Secondary (gray)
- **Visibility:** Only shown when saved tanks exist
- **Functionality:**
  - Opens dropdown menu with saved tank list
  - Dropdown includes:
    - "New Tank" button (teal/cyan primary color)
    - List of saved tanks with:
      - Tank name
      - Volume and species count
      - Delete button (trash icon) per tank
  - Clicking a tank loads that configuration
  - Clicking "New Tank" navigates to unit selection screen

#### 1.2.3 Save Tank Button
- **Icon:** Save/floppy disk icon
- **Label:** "Save Tank" (desktop) / "Save" (mobile)
- **Variant:** Secondary (gray)
- **Functionality:**
  - Opens modal dialog for saving current tank
  - Modal contains:
    - Title: "Save Tank Configuration"
    - Text input for tank name
    - Cancel button (gray)
    - Save button (dark primary)
  - Saves current tank config + fish stock to localStorage
  - Shows success toast on save

#### 1.2.4 Edit Tank Button
- **Icon:** Settings/gear icon
- **Label:** "Edit Tank" (desktop) / "Edit" (mobile)
- **Variant:** Secondary (gray)
- **Functionality:**
  - Navigates to `/setup` page
  - Allows editing tank parameters (volume, dimensions, temperature, pH, filter)

#### 1.2.5 Clear Tank Button
- **Icon:** Trash icon
- **Label:** "Clear Tank" (desktop) / "Clear" (mobile)
- **Variant:** Danger (red)
- **Visibility:** Only shown when fish are stocked
- **Functionality:**
  - Removes all fish from current tank
  - Resets bioload and health score
  - Does not clear tank configuration

---

## 2. ADD FISH SECTION

### 2.1 Section Container
- **Background:** White card with shadow
- **Padding:** 6 (p-6)
- **Layout:** Full width, rounded corners

### 2.2 Section Heading
- **Text:** "Add Fish"
- **Typography:** 2xl, semibold
- **Spacing:** Margin bottom 4

### 2.3 Fish Search Component
- **Search Input:**
  - **Icon:** Search icon (left side, absolute positioned)
  - **Placeholder:** "Search by common or scientific name..."
  - **Styling:** Full width, padding left for icon, rounded, border, focus ring
  - **Functionality:**
    - Real-time filtering as user types
    - Searches both common and scientific names
    - Case-insensitive matching

- **Search Results Dropdown:**
  - **Visibility:** Only shown when search term exists
  - **Styling:** Max height 60, scrollable, border, rounded
  - **Empty State:** "No fish found" message (gray-500)
  - **Result Items:**
    - Clickable buttons
    - Shows common name (bold)
    - Shows scientific name (italic, gray)
    - Hover state: light gray background
    - Clicking adds fish to tank and clears search

---

## 3. TANK OVERVIEW SECTION

### 3.1 Container
- **Background:** Gradient (blue-50 to blue-100)
- **Border:** 2px, blue-200
- **Padding:** 6
- **Layout:** Rounded corners

### 3.2 Section Header
- **Icon:** Droplet icon (teal/cyan color)
- **Title:** "Tank Overview"
- **Typography:** Large, semibold

### 3.3 Stats Grid
**Layout:** 2 columns (mobile) / 4 columns (desktop)
**Card Style:** White background, rounded, shadow-sm, padding 3

#### 3.3.1 Volume Card
- **Label:** "Volume" (xs, gray-500)
- **Value:** Formatted volume (e.g., "51.9 gal")
- **Sub-value:** Dimensions if available (e.g., "40.0" × 20.0" × 15.0"")
- **Typography:** Large, bold for value

#### 3.3.2 Temperature Card
- **Icon:** Thermometer icon (12px)
- **Label:** "Temperature" (xs, gray-500)
- **Value:** Formatted temperature (e.g., "75°F")
- **Unit:** Based on user preference (Fahrenheit/Celsius)

#### 3.3.3 pH Level Card
- **Label:** "pH Level" (xs, gray-500)
- **Value:** pH number (e.g., "7.0")
- **Sub-label:** pH classification:
  - "Acidic" (pH < 7)
  - "Neutral" (pH = 7)
  - "Alkaline" (pH > 7)
- **Typography:** xs, gray-400 for classification

#### 3.3.4 Stock Card
- **Icon:** Gauge icon (12px)
- **Label:** "Stock" (xs, gray-500)
- **Value:** Total fish count (bold, large)
- **Sub-value:** Species count (e.g., "4 species")
- **Typography:** xs, gray-400

### 3.4 Surface Area Display
- **Visibility:** Only shown when dimensions are available
- **Layout:** Border top separator, margin top 4
- **Icon:** Ruler icon (teal/cyan)
- **Label:** "Surface Area:"
- **Value:** Formatted surface area (e.g., "800 in²")
- **Unit:** Based on user preference (in² or cm²)

---

## 4. TANK STATUS SECTION

### 4.1 Container
- **Background:** White card with shadow
- **Padding:** 6
- **Layout:** Rounded corners, margin bottom 6

### 4.2 Section Heading
- **Text:** "Tank Status"
- **Typography:** 2xl, semibold
- **Spacing:** Margin bottom 4

### 4.3 Bioload Meter
- **Label Row:**
  - Left: "Bioload Capacity" (sm, medium weight)
  - Right: Percentage value (e.g., "77.5%") (sm, medium weight)

- **Progress Bar:**
  - **Background:** Gray-200, rounded-full, height 4
  - **Fill Bar:**
    - Dynamic width based on percentage
    - Color coding:
      - Green (#22C55E): < 50%
      - Orange/Yellow (#F59E0B): 50-80%
      - Red (#EF4444): > 80%
    - Smooth transition animation (300ms)
    - Rounded corners

### 4.4 Health Score Display
- **Label:** "Health Score" (sm, gray-600)
- **Value:** Large number display (e.g., "0/100")
- **Typography:** 3xl, bold
- **Color:** Default text color
- **Calculation:** Based on compatibility issues (100 - penalties)

---

## 5. CURRENT STOCK SECTION

### 5.1 Container
- **Background:** White card with shadow
- **Padding:** 6
- **Layout:** Rounded corners

### 5.2 Section Heading
- **Text:** "Current Stock"
- **Typography:** 2xl, semibold
- **Spacing:** Margin bottom 4

### 5.3 Empty State
- **Text:** "No fish added yet"
- **Color:** Gray-500
- **Visibility:** Only shown when no fish are stocked

### 5.4 Fish Cards Grid
- **Layout:** 1 column (mobile) / 2 columns (desktop)
- **Gap:** 4 units between cards

#### 5.4.1 Fish Card Component
**Container:**
- Border: gray-200, rounded-lg
- Padding: 4
- Hover: Shadow-md transition

**Card Header:**
- **Left Side:**
  - Common name (semibold, large)
  - Scientific name (italic, small, gray-500)
- **Right Side:**
  - Remove button (X icon)
  - Gray-400, hover: red-500
  - Click removes fish from tank

**Card Body:**
- **Size Display:** "Size: 2.8"" (or cm)
- **Min Tank:** "Min Tank: 5.3 gal" (formatted)
- **Temperature Range:**
  - Icon: Thermometer (14px, gray-400)
  - Format: "75-82°F" (or °C)
- **pH Range:**
  - Icon: Droplet (14px, gray-400)
  - Format: "pH 6.5-7.5"

**Behavior Tags:**
- **Aggression Badge:**
  - Green (peaceful): bg-green-100, text-green-700
  - Yellow (semi-aggressive): bg-yellow-100, text-yellow-700
  - Red (aggressive): bg-red-100, text-red-700
  - Rounded, xs, medium weight, padding 2
- **Schooling Badge:**
  - Blue: bg-blue-100, text-blue-700
  - Only shown if schooling_required = true
  - Same styling as aggression badge

**Quantity Controls:**
- **Layout:** Horizontal flex, gap 3
- **Decrease Button:** Minus icon, hover gray-100
- **Quantity Display:** Centered, semibold, width 8
- **Increase Button:** Plus icon, hover gray-100
- **Functionality:** Updates fish quantity, removes if quantity reaches 0

---

## 6. COMPATIBILITY ISSUES SECTION

### 6.1 Container
- **Background:** White card with shadow
- **Padding:** 6
- **Layout:** Rounded corners
- **Position:** Sticky (top-4) on desktop
- **Height:** Max height calc(100vh - 2rem), scrollable

### 6.2 Section Heading
- **Text:** "Compatibility Issues"
- **Typography:** xl-2xl responsive, semibold
- **Spacing:** Margin bottom 4

### 6.3 Empty State
- **Text:** "✓ All checks passed!"
- **Color:** Green-600
- **Weight:** Medium
- **Visibility:** Only shown when no issues exist

### 6.4 Issues List
- **Layout:** Vertical stack, gap 2 (space-y-2)
- **Scrollable:** If content exceeds max height

#### 6.4.1 Issue Toast Components
**Warning Type (Orange):**
- Background: Orange/yellow theme
- Border: Matching color
- Icon: Warning symbol
- Message: Issue description
- Examples:
  - "Betta prefers 75-82°F, but tank is 75°F"
  - "Betta may prey on Oscar (size difference > 50%)"
  - "Tiger Barb requires a school of at least 6, but only 1 added"

**Critical Type (Red):**
- Background: Red theme
- Border: Matching color
- Icon: Critical/error symbol
- Message: Critical issue description
- Examples:
  - "Oscar requires minimum 52.8 gal tank, but tank is only 51.9 gal"

**Styling:**
- Rounded corners
- Padding for readability
- Clear visual hierarchy
- Color-coded by severity

---

## 7. MODAL DIALOGS

### 7.1 Save Tank Dialog
**Trigger:** Save Tank button
**Overlay:**
- Background: Black with 50% opacity
- Position: Fixed, full screen
- Z-index: 50

**Dialog Container:**
- Background: White
- Layout: Rounded-lg, padding 6
- Max width: Medium (max-w-md)
- Centered on screen

**Content:**
- **Title:** "Save Tank Configuration" (xl, bold)
- **Input Field:**
  - Type: Text
  - Placeholder: "Enter tank name (e.g., Den Tank, Kid's Room)"
  - Full width, rounded, border, focus ring
  - Auto-focus on open
- **Actions:**
  - Cancel button (gray, flex-1)
  - Save button (dark primary, flex-1)
  - Horizontal flex layout

### 7.2 Delete Confirmation Dialog
**Trigger:** Delete button in Change Tank dropdown
**Component:** Custom AlertDialog
**Content:**
- Title: "Delete Tank"
- Message: "Are you sure you want to delete '[Tank Name]'? This action cannot be undone."
- Actions:
  - Cancel button
  - Delete button (destructive/red variant)
**Functionality:** Confirms before permanent deletion

---

## 8. TOAST NOTIFICATIONS

### 8.1 Toast Container
- **Position:** Fixed (typically top-right)
- **Z-index:** High (above other content)
- **Layout:** Stacked vertically
- **Animation:** Slide in/out transitions

### 8.2 Toast Types
- **Success:** Green theme, checkmark icon
- **Info:** Blue theme, info icon
- **Warning:** Orange/yellow theme, warning icon
- **Critical:** Red theme, error icon

### 8.3 Toast Behavior
- Auto-dismiss after timeout
- Manual dismiss (X button)
- Non-blocking (doesn't prevent interaction)

---

## 9. RESPONSIVE BEHAVIOR

### 9.1 Breakpoints
- **Mobile:** Default (< 640px)
  - Single column layouts
  - Abbreviated button labels
  - Stacked header elements

- **Tablet:** sm (≥ 640px)
  - Full button labels
  - 2-column fish card grid

- **Desktop:** lg (≥ 1024px)
  - 3-column main layout
  - 4-column tank overview grid
  - Sidebar compatibility issues

### 9.2 Layout Grid
- **Main Content:** 2/3 width on desktop (lg:col-span-2)
- **Sidebar:** 1/3 width on desktop
- **Gap:** 6 units between sections

---

## 10. COLOR SYSTEM

### 10.1 Primary Colors
- **Teal/Cyan:** #14B8A6 (primary actions, accents)
- **Dark Teal:** #0D9488 (hover states)
- **Dark Slate:** #0F172A (primary buttons)
- **Dark Slate Hover:** #1E293B

### 10.2 Status Colors
- **Success/Green:** #22C55E (bioload < 50%, peaceful fish)
- **Warning/Orange:** #F59E0B (bioload 50-80%, semi-aggressive)
- **Danger/Red:** #EF4444 (bioload > 80%, aggressive fish, critical issues)

### 10.3 Neutral Colors
- **Background:** White, gray-50, gray-100
- **Text:** Default (dark), gray-600, gray-500, gray-400
- **Borders:** gray-200, gray-300

### 10.4 Badge Colors
- **Peaceful:** green-100 bg, green-700 text
- **Semi-aggressive:** yellow-100 bg, yellow-700 text
- **Aggressive:** red-100 bg, red-700 text
- **Schooling:** blue-100 bg, blue-700 text

---

## 11. TYPOGRAPHY SCALE

- **3xl-4xl:** Application title (responsive)
- **2xl:** Section headings
- **xl:** Dialog titles, sidebar headings
- **lg:** Card titles, fish names
- **Base (default):** Body text, descriptions
- **sm:** Labels, metadata
- **xs:** Fine print, dimensions, sub-labels

---

## 12. INTERACTIVE STATES

### 12.1 Buttons
- **Default:** Base color
- **Hover:** Darker shade, subtle scale/opacity change
- **Active:** Pressed state
- **Disabled:** Reduced opacity, no interaction

### 12.2 Cards
- **Default:** Static
- **Hover:** Shadow increase, subtle lift
- **Clickable:** Cursor pointer

### 12.3 Input Fields
- **Default:** Border, white background
- **Focus:** Ring (2px, teal color), border highlight
- **Error:** Red border (if validation fails)

---

## 13. ANIMATIONS & TRANSITIONS

- **Progress Bars:** Smooth width transitions (300ms)
- **Cards:** Hover shadow transitions
- **Modals:** Fade in/out
- **Toasts:** Slide in/out
- **Buttons:** Subtle scale on hover

---

## 14. ACCESSIBILITY CONSIDERATIONS

- **Icons:** Paired with text labels
- **Color Contrast:** WCAG AA compliant
- **Focus States:** Visible focus rings
- **Keyboard Navigation:** All interactive elements accessible
- **Screen Readers:** Semantic HTML, ARIA labels where needed
- **Touch Targets:** Minimum 44x44px for mobile

---

## 15. DATA DISPLAY PATTERNS

### 15.1 Units
- **Imperial:** Gallons, inches, Fahrenheit
- **Metric:** Liters, centimeters, Celsius
- **Toggle:** Available in settings (not shown in main dashboard)

### 15.2 Formatting
- **Volume:** 1 decimal place (e.g., "51.9 gal")
- **Temperature:** 1 decimal place (e.g., "75.0°F")
- **pH:** 1 decimal place (e.g., "7.0")
- **Dimensions:** 1 decimal place (e.g., "40.0"")
- **Percentages:** 1 decimal place (e.g., "77.5%")

---

## Notes for Designers

1. **Consistency:** All cards use white background, rounded-lg, shadow
2. **Spacing:** Consistent padding (p-4, p-6) and gaps (gap-2, gap-4, gap-6)
3. **Hierarchy:** Clear visual hierarchy through typography scale and color
4. **Feedback:** All actions provide visual feedback (hover, transitions, toasts)
5. **Progressive Disclosure:** Dropdowns and modals hide complexity until needed
6. **Mobile-First:** Design scales up from mobile, not down from desktop

