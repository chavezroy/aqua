# 🐠 AquaHarmony
**Responsive Web Application for Aquarium Compatibility**

> **Status:** Draft / MVP Phase
> **Target Platform:** Web (Mobile-First)
> **License:** MIT (Proposed)

---

## 📖 Executive Summary
**AquaHarmony** is a web-based utility designed to help aquarium hobbyists stock their tanks responsibly. By cross-referencing user-defined tank parameters (volume, filtration) against a database of fish species, the app provides real-time compatibility scores.

**The Core Problem:** New hobbyists often inadvertently combine incompatible species, leading to fish mortality.
**The Solution:** A "Virtual Tank" builder that flags conflicts immediately using a logic-based compatibility engine.

---

## 🛠 Tech Stack
This project uses a modern React-based stack to ensure performance and type safety for complex logic.

* **Framework:** Next.js (React)
* **Language:** TypeScript (Strict typing for data comparison)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** Zustand
* **Database (MVP):** Local JSON / In-Memory
* **Database (Scale):** Supabase (PostgreSQL)

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
1.  **Tankometer:** Visual progress bar for bioload capacity (Green -> Yellow -> Red).
2.  **Fish Card:** Grid item with thumbnail, name, and quantity stepper.
3.  **Alert Toast:** Dynamic feedback for compatibility warnings.

---

## ⚙️ Functional Requirements (MVP)

### 1. Tank Configuration
The user must define the physical environment before adding livestock.
* **Inputs:** Volume (Gallons/Liters), Dimensions, Filter Capacity.
* **Logic:** System calculates surface area and "Base Bioload Capacity."

### 2. Compatibility Engine (The "Brain")
The core logic that runs every time a fish is added.
* **Temp/pH Check:** Verifies fish requirements against tank settings.
* **Size Check:** Ensures tank volume > Fish Minimum Volume.
* **Aggression Check:** Flags predatory risks (e.g., Size Difference > 50%).
* **Schooling Check:** Advisory warning if schooling fish count < 6.

### 3. Dashboard
* **Stocking Bar:** Visualizes current bioload % vs max capacity.
* **Health Score:** "Perfect Match" vs "Incompatible."

---

## 📝 User Stories & Acceptance Criteria

### Epic 1: Tank Configuration
* **Story 1.1:** As a user, I want to input tank volume so the app knows my capacity.
    * *AC:* Accepts Gallons/Liters; Validates non-negative numbers.
* **Story 1.2:** As a user, I want to set Temperature and pH targets.
    * *AC:* Sliders for Temp (60-90°F) and pH (5.0-9.0); "Reset to Standard" button.

### Epic 2: Fish Management
* **Story 2.1:** As a user, I want to search for fish by name.
    * *AC:* Real-time filter; Supports common and scientific names.
* **Story 2.2:** As a user, I want to adjust quantities of specific fish.
    * *AC:* +/- Stepper controls; Removing last item deletes the row.

### Epic 3: The Engine
* **Story 3.1:** As a system, I want to validate Temp/pH compatibility.
    * *AC:* Trigger WARNING if tank parameters are outside fish range.
* **Story 3.2:** As a system, I want to validate Tank Size.
    * *AC:* Trigger CRITICAL ERROR if Tank Vol < Fish Min Vol.
* **Story 3.3:** As a system, I want to detect aggression.
    * *AC:* Trigger WARNING if aggressive species is mixed with small peaceful species.

---

## 💾 Data Model (JSON Schema)

The application relies on a `Species` object structure for logic checks.

```json
{
  "id": "101",
  "common_name": "Neon Tetra",
  "scientific_name": "Paracheirodon innesi",
  "adult_size_cm": 4,
  "bioload_score": 2,
  "min_tank_liters": 40,
  "parameters": {
    "temp_min": 20,
    "temp_max": 26,
    "ph_min": 6.0,
    "ph_max": 7.5
  },
  "social": {
    "aggression": "peaceful",
    "schooling_required": true,
    "min_group_size": 6
  }
}




Project Structure (Proposed)
/src
  /components
    /ui           # Buttons, Inputs, Cards
    /tank         # TankVisualizer, BioloadMeter
    /fish         # FishSearch, FishCard
  /lib
    compatibilityEngine.ts  # Logic functions
    fishDatabase.json       # Static Data
  /store
    useTankStore.ts         # Zustand State
  /app
    page.tsx                # Dashboard
    setup.tsx               # Onboarding
