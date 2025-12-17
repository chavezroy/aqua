# 🐠 AquaHarmony

**Responsive Web Application for Aquarium Compatibility**

> **Status:** MVP Phase  
> **Target Platform:** Web (Mobile-First)  
> **License:** MIT

---

## 📖 Executive Summary

**AquaHarmony** is a web-based utility designed to help aquarium hobbyists stock their tanks responsibly. By cross-referencing user-defined tank parameters (volume, filtration) against a database of fish species, the app provides real-time compatibility scores.

**The Core Problem:** New hobbyists often inadvertently combine incompatible species, leading to fish mortality.  
**The Solution:** A "Virtual Tank" builder that flags conflicts immediately using a logic-based compatibility engine.

---

## 🛠 Tech Stack

* **Framework:** Next.js 14 (React)
* **Language:** TypeScript (Strict typing for data comparison)
* **Styling:** Tailwind CSS v3.4
* **Icons:** Lucide React
* **Animations:** Motion (Framer Motion)
* **State Management:** Zustand
* **Database (MVP):** Local JSON / In-Memory with localStorage persistence
* **Database (Scale):** Supabase (PostgreSQL) - Planned

---

## 🎨 Design System

**Philosophy:** "Clear Water." Spacious, fluid, and clinically clean.

### Color Palette

| Color Name | Hex | Usage |
| :--- | :--- | :--- |
| **Deep Ocean** | `#0F172A` | Primary Headers & Buttons |
| **Reef Teal** | `#14B8A6` | Accents & Active States |
| **Mist** | `#F8FAFC` | Backgrounds |
| **Algae Green** | `#22C55E` | Status: Safe |
| **Ammonia Yellow** | `#F59E0B` | Status: Warning |
| **Coral Red** | `#EF4444` | Status: Critical Error |

### Components

1. **LoadingScreen:** Animated loading sequence with floating bubbles and wave patterns (3-second display)
2. **SplashScreen:** Welcome screen with animated logo, feature cards, and saved tanks access
3. **Tankometer (BioloadMeter):** Visual progress bar for bioload capacity (Green -> Yellow -> Red)
4. **Fish Card:** Grid item with species details, temperature/pH ranges, aggression badges, and quantity stepper
5. **Alert Toast:** Dynamic feedback for compatibility warnings and critical errors
6. **Tank Visualizer:** Overview display showing tank parameters, dimensions, surface area, and current stock
7. **Fish Search:** Real-time search with autocomplete for common and scientific names

---

## ⚙️ Functional Requirements (MVP)

### 1. Tank Configuration
The user must define the physical environment before adding livestock.
* **Inputs:** 
  - Volume (Gallons/Liters) - manual entry or auto-calculated from dimensions
  - Dimensions (Length × Width × Height) - optional, in inches or centimeters
  - Filter Capacity (GPH/LPH) - adjusts based on unit preference
  - Temperature (60-90°F / 15-32°C) - slider control with unit toggle
  - pH (5.0-9.0) - slider control
  - Tank Name (optional) - for saving multiple tank configurations
* **Unit Preferences:**
  - Toggle between Metric (Liters, Centimeters, °C) and Imperial (Gallons, Inches, °F)
  - Unit preference persists across sessions via localStorage
  - All displays update automatically based on selected unit system:
    - Volume: Gallons ↔ Liters
    - Dimensions: Inches ↔ Centimeters
    - Temperature: Fahrenheit ↔ Celsius
    - Filter Capacity: GPH ↔ LPH
  - Unit toggle available in header on dashboard and setup page
* **Logic:** System calculates surface area and "Base Bioload Capacity" using dimensions when provided
* **Save/Load:** Save tank configurations with custom names (e.g., "Den Tank", "Kid's Room", "Kitchen Bowl")

### 2. Compatibility Engine (The "Brain")
The core logic that runs every time a fish is added.
* **Temp/pH Check:** Verifies fish requirements against tank settings.
* **Size Check:** Ensures tank volume > Fish Minimum Volume.
* **Aggression Check:** Flags predatory risks (e.g., Size Difference > 50%).
* **Schooling Check:** Advisory warning if schooling fish count < 6.

### 3. Dashboard
* **Stocking Bar:** Visualizes current bioload % vs max capacity with color-coded status
* **Health Score:** "Perfect Match" vs "Incompatible" (0-100 scale)
* **Tank Management:** 
  - Save current tank configuration with custom name
  - Change between saved tanks
  - Clear tank to start fresh
  - Edit tank settings
* **Real-time Updates:** All compatibility checks update instantly when fish are added/removed

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AquariumCompat
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📝 Usage

### Initial Load Sequence
1. **Loading Screen** (3 seconds) - Animated welcome with floating bubbles
2. **Splash Screen** - Welcome screen with app features
   - Click "Start Building Your Tank" to configure a new tank
   - Click "View Saved Tanks" to load an existing configuration

### Tank Setup
1. **Configure Tank:** Navigate to `/setup` or click "Setup Tank" on the homepage
   - Enter tank dimensions (optional) - auto-calculates volume
   - Or manually enter tank volume (gallons or liters)
   - Set temperature (60-90°F) and pH (5.0-9.0) using sliders
   - Optionally add filter capacity
   - Name your tank (e.g., "Den Tank", "Kid's Room") and save it

### Managing Fish
1. **Add Fish:** Use the search bar at the top to find fish by common or scientific name
   - Click on a fish to add it to your tank
   - Adjust quantities using +/- buttons on fish cards
   - View fish details: size, temperature/pH ranges, aggression level

2. **Monitor Compatibility:** 
   - View real-time compatibility issues in the sidebar
   - Check bioload percentage (color-coded: green/yellow/red)
   - Monitor health score (0-100)
   - See tank overview with all parameters and surface area

### Saved Tanks
1. **Save Tank:** Click "Save Tank" button in dashboard header
   - Enter a name for your tank configuration
   - Saves both tank settings and current fish stock
   - Persists to browser localStorage

2. **Load Tank:** 
   - From Dashboard: Click "Change Tank" to see all saved tanks
   - From Splash Screen: Click "View Saved Tanks" to see and load saved configurations
   - Click on any saved tank to load it instantly

3. **Delete Tank:** Click trash icon next to tank name in the "Change Tank" dropdown

---

## 📁 Project Structure

```
/src
  /app
    page.tsx                # Dashboard (with loading/splash sequence)
    setup/page.tsx          # Tank Configuration
    layout.tsx              # Root Layout
    globals.css             # Global Styles & Tailwind
  /components
    LoadingScreen.tsx       # Animated loading sequence
    SplashScreen.tsx        # Welcome screen with saved tanks
    /ui                    # Reusable UI Components
      Button.tsx
      Input.tsx
      Card.tsx
      Toast.tsx
    /tank                  # Tank-related Components
      TankVisualizer.tsx   # Tank overview with parameters
      BioloadMeter.tsx     # Color-coded bioload indicator
    /fish                  # Fish-related Components
      FishSearch.tsx       # Real-time fish search
      FishCard.tsx         # Fish display with details
  /lib
    compatibilityEngine.ts  # Core Logic Functions
    fishDatabase.json       # Fish Species Data (14 species)
  /store
    useTankStore.ts        # Zustand State Management with localStorage
  /types
    index.ts               # TypeScript Type Definitions
```

---

## 🧪 Compatibility Engine Logic

The engine performs the following checks:

1. **Temperature Validation:** Converts Fahrenheit to Celsius and checks against fish requirements
2. **pH Validation:** Ensures tank pH is within fish's acceptable range
3. **Tank Size Validation:** Critical error if tank is too small for fish species
4. **Aggression Check:** Warns if aggressive species may prey on smaller peaceful fish (>50% size difference)
5. **Schooling Validation:** Warns if schooling fish are added in insufficient numbers

**Health Score Calculation:**
- Starts at 100
- -30 points per critical issue
- -10 points per warning issue
- Minimum score: 0

**Bioload Calculation:**
- Sum of (fish bioload_score × quantity) for all stocked fish
- Uses surface area calculation when dimensions are provided for more accuracy
- Falls back to volume-based calculation (tank volume × 0.5 bioload per liter)
- Percentage capped at 100%

**Surface Area Calculation:**
- Calculated from tank dimensions (length × width × height)
- Used for enhanced bioload capacity estimation
- Displayed in Tank Visualizer when dimensions are available

---

## 📊 Fish Database

Currently includes 14 species:
- Neon Tetra
- Betta
- Goldfish
- Angelfish
- Guppy
- Corydoras Catfish
- Oscar
- Zebra Danio
- Molly
- Platy
- Swordtail
- Discus
- Tiger Barb
- Cherry Barb

Each species includes:
- Common and scientific names
- Adult size (cm)
- Bioload score
- Minimum tank size (liters)
- Temperature and pH ranges
- Social behavior (aggression level, schooling requirements)

---

## ✨ Recent Updates

### v0.2.0 - Current Features
- ✅ **Loading Screen Sequence** - Animated 3-second loading screen with floating bubbles
- ✅ **Enhanced Splash Screen** - Welcome screen with feature cards and saved tanks access
- ✅ **Tank Naming & Saving** - Save multiple tank configurations with custom names
- ✅ **Tank Management** - Load, switch between, and delete saved tanks
- ✅ **Surface Area Calculation** - Automatic calculation from tank dimensions
- ✅ **Enhanced Fish Cards** - Display temperature/pH ranges, aggression levels, and schooling indicators
- ✅ **Mobile-First Design** - Fully responsive with optimized mobile layouts
- ✅ **LocalStorage Persistence** - Saved tanks persist across browser sessions
- ✅ **Improved UI/UX** - Better spacing, animations, and visual feedback

## 🎯 Future Enhancements

- [ ] Expand fish database (100+ species)
- [ ] Add fish images/thumbnails
- [ ] Export/import tank configurations (JSON)
- [ ] Integration with Supabase for cloud storage
- [ ] Community tank sharing
- [ ] Advanced filtration recommendations
- [ ] Plant compatibility checker
- [ ] Tank history/versioning
- [ ] Print-friendly tank reports

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

