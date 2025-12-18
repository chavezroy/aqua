# UI Design Specification: Visual Search Module
**Theme:** Bluefin (v1.0)
**Context:** Mobile-First Camera Interface
**Tech:** Tailwind CSS, Lucide React, Framer Motion (recommended for animations)

---

## 1. Design Philosophy: "The Bluefin HUD"
The Visual Search interface is designed to feel like a **Heads-Up Display (HUD)** used in scientific marine exploration. It overlays critical data onto the real world without obstructing the view.

* **Visual Style:** Glassmorphism, translucent overlays, high-contrast neon accents (Teal) against deep dark backgrounds.
* **Interaction Model:** "Point, Shoot, Analyze." The user never leaves the camera view; results slide up from the bottom.

---

## 2. Color Palette References (Tailwind)
The UI relies heavily on the "Deep Ocean" and "Reef Teal" definitions from the main design system.

| Element | Color Name | Tailwind Class | Hex Code |
| :--- | :--- | :--- | :--- |
| **Backdrop** | Deep Ocean | `bg-slate-900` | `#0F172A` |
| **Accent/Active** | Reef Teal | `text-teal-400` / `bg-teal-500` | `#14B8A6` |
| **Glass Effect** | Sea Glass | `backdrop-blur-md bg-white/10` | N/A |
| **Success** | Algae Green | `text-green-400` | `#22C55E` |
| **Warning** | Ammonia Yellow | `text-yellow-400` | `#FACC15` |

---

## 3. Component Breakdown

### 3.1. Layer 1: The Camera Viewport (Background)
* **Behavior:** Full-screen video feed (`<video>` element) utilizing the device's rear camera.
* **Overlay:** A subtle gradient overlay is required to ensure white text/icons remain readable regardless of lighting conditions.
    * *Implementation:* `bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/90`

### 3.2. Layer 2: The HUD (Foreground)
This layer contains the controls and guides. It sits *above* the video feed but *below* the result sheet.

#### **A. Top Bar Controls**
* **Layout:** Flexbox, `justify-between`.
* **Close Button:** Top-left. Circular glass button. Icon: `X` (Lucide).
* **Status Pill:** Center. A pill-shaped badge indicating the system is ready.
    * *Style:* `bg-black/40 border border-white/10 text-teal-300`.
    * *Text:* "AI SCANNER ACTIVE" (Uppercase, tracking-wider).
* **Flash Toggle:** Top-right. Circular glass button. Icon: `Zap` (Lucide).

#### **B. The Reticle (Focus Area)**
The central "target" box guides the user to center the fish.
* **Idle State:** A 64x64 (rem) box with white/20 borders and teal corner brackets.
* **Scanning State:**
    * Scale up to 110%.
    * Border changes to `teal-400`.
    * **Animation:** A "Laser Scan" effect (gradient line) moving top-to-bottom within the box.
    * **Glow:** Add `shadow-[0_0_40px_rgba(20,184,166,0.3)]` to simulate bioluminescence.

#### **C. Primary Controls (Bottom)**
* **Zoom Slider:** A segmented control pill (`.5x | 1x | 2x`) sitting above the shutter.
* **Shutter Button:**
    * **Outer Ring:** White border `border-4 border-white/20`.
    * **Inner Core:** Solid Teal circle `bg-teal-500`.
    * **Interaction:** On tap, the Inner Core mimics a heartbeat (scale down, then up).

---

### 3.3. Layer 3: The Result Sheet (Modal)
A "Bottom Sheet" interaction. This panel slides up from the bottom of the screen, covering 85% of the viewport, once a fish is identified.

#### **A. Header Section**
* **Match Confidence:** Small badge, e.g., "96% MATCH". Style: `bg-teal-500/10 border-teal-500/20`.
* **Species Name:** Large, Bold Typography (`text-3xl`). Text color: White.
* **Scientific Name:** Italicized, muted text (`text-slate-400`).
* **Thumbnail:** A square image of the identified fish on the right side for verification.

#### **B. Compatibility Engine Integration (Crucial)**
This section differentiates the app from generic identifiers. It immediately tells the user if the fish fits *their* tank.
* **Container:** `bg-slate-800/50 rounded-2xl border border-slate-700`.
* **Rows:**
    1.  **Temperature:** Icon + Value + Status Check (Green Check or Red X).
    2.  **pH Level:** Icon + Value + Status Check.
    3.  **Social/Aggression:** If a warning exists, use a yellow background tint (`bg-yellow-500/10`) and display the specific advisory text (e.g., "Needs groups of 6+").

#### **C. Action Buttons (Footer)**
* **Rescan:** Secondary style. `bg-slate-800 border-slate-700`.
* **Add to Tank:** Primary Action. High visibility.
    * *Style:* `bg-teal-500 text-slate-900 font-bold shadow-lg`.

---

## 4. Animation Guidelines
* **Entrance:** The Camera Viewport should fade in (`opacity: 0` -> `1`).
* **Scanning:** The Reticle needs a continuous "pulse" animation while processing.
* **Result Reveal:** The Result Sheet should slide up with a spring physics effect (not a linear slide) to feel organic and snappy.

## 5. Developer Implementation Notes
* **Z-Index Strategy:**
    * Video Feed: `z-0`
    * HUD Overlay: `z-10`
    * Result Sheet: `z-20`
* **Mobile Considerations:** Ensure the "Shutter Button" is placed high enough to avoid conflict with the iOS Home Bar indicator.