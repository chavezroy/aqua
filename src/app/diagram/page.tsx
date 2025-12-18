"use client";

export default function DiagramPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">System Diagram</h1>
        <div className="flex justify-center items-center w-full overflow-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="800"
            viewBox="0 0 1000 800"
            className="w-full h-auto max-w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="100%" height="100%" fill="white" />

            <style>
              {`
                .component-box { fill: #f0f0f0; stroke: #333; stroke-width: 2; }
                .pi-board { fill: #4CAF50; stroke: #2E7D32; stroke-width: 2; }
                .hat-board { fill: #FFC107; stroke: #FFA000; stroke-width: 2; }
                .sensor-probe { fill: #9E9E9E; stroke: #616161; stroke-width: 2; }
                .pump-body { fill: #B0BEC5; stroke: #78909C; stroke-width: 2; }
                .bottle { fill: #E1F5FE; stroke: #039BE5; stroke-width: 2; opacity: 0.8; }
                .water-pipe { fill: #E3F2FD; stroke: #2196F3; stroke-width: 4; stroke-linecap: round; }
                .tubing { stroke: #03A9F4; stroke-width: 3; fill: none; stroke-dasharray: 5,5; }
                .wire-power { stroke: #F44336; stroke-width: 2; fill: none; }
                .wire-ground { stroke: #212121; stroke-width: 2; fill: none; }
                .wire-signal { stroke: #FF5722; stroke-width: 2; fill: none; }
                .wire-i2c { stroke: #9C27B0; stroke-width: 2; fill: none; }
                .label-text { font-family: Arial, sans-serif; font-size: 14px; text-anchor: middle; }
                .title-text { font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; text-anchor: middle; }
                .arrow-head { fill: #03A9F4; }
              `}
            </style>

            <g transform="translate(350, 250)">
              <rect className="pi-board" x="0" y="50" width="200" height="120" rx="10" ry="10" />
              <text className="title-text" x="100" y="115" fill="white">
                Raspberry Pi 4
              </text>
              <rect className="hat-board" x="10" y="10" width="180" height="80" rx="10" ry="10" />
              <text className="title-text" x="100" y="55" fill="black">
                Stepper Motor HAT
              </text>
              <rect x="160" y="60" width="30" height="100" fill="#333" />
            </g>

            <g transform="translate(100, 50)">
              <rect className="bottle" x="0" y="0" width="80" height="120" rx="5" />
              <text className="label-text" x="40" y="65">
                Micro (A)
              </text>
              <rect className="bottle" x="120" y="0" width="80" height="120" rx="5" />
              <text className="label-text" x="160" y="65">
                Grow (B)
              </text>
              <rect className="bottle" x="240" y="0" width="80" height="120" rx="5" />
              <text className="label-text" x="280" y="65">
                Bloom (C)
              </text>
            </g>

            <g transform="translate(100, 220)">
              <circle className="pump-body" cx="40" cy="40" r="35" />
              <text className="label-text" x="40" y="45">
                Pump A
              </text>
              <circle className="pump-body" cx="160" cy="40" r="35" />
              <text className="label-text" x="160" y="45">
                Pump B
              </text>
              <circle className="pump-body" cx="280" cy="40" r="35" />
              <text className="label-text" x="280" y="45">
                Pump C
              </text>
            </g>

            <g transform="translate(50, 600)">
              <path className="water-pipe" d="M 0,50 L 900,50" />
              <text className="label-text" x="50" y="30">
                Water In (from Reservoir)
              </text>
              <text className="label-text" x="850" y="30">
                Water Out (to Plants)
              </text>
              <polygon className="arrow-head" points="10,50 0,45 0,55" />
              <polygon
                className="arrow-head"
                points="890,50 900,45 900,55"
                transform="rotate(180 895 50)"
              />
            </g>

            <g transform="translate(150, 550)">
              <rect className="component-box" x="0" y="20" width="60" height="60" />
              <text className="label-text" x="30" y="55" fontSize="12">
                Solenoid
                <tspan x="30" dy="14">Valve</tspan>
              </text>
            </g>
            <g transform="translate(250, 580)">
              <rect className="sensor-probe" x="0" y="0" width="20" height="60" />
              <text className="label-text" x="10" y="-10" fontSize="12">
                DS18B20
                <tspan x="10" dy="14">Temp</tspan>
              </text>
            </g>
            <g transform="translate(400, 650)">
              <circle className="pump-body" cx="30" cy="30" r="30" />
              <text className="label-text" x="30" y="35" fontSize="12">
                Mixing
                <tspan x="30" dy="14">Pump</tspan>
              </text>
            </g>
            <g transform="translate(550, 580)">
              <rect className="sensor-probe" x="0" y="0" width="20" height="60" />
              <text className="label-text" x="10" y="-10" fontSize="12">
                EC
                <tspan x="10" dy="14">Sensor</tspan>
              </text>
            </g>
            <g transform="translate(650, 580)">
              <rect className="sensor-probe" x="0" y="0" width="20" height="60" />
              <text className="label-text" x="10" y="-10" fontSize="12">
                pH
                <tspan x="10" dy="14">Sensor</tspan>
              </text>
            </g>

            <g transform="translate(700, 300)">
              <rect className="component-box" x="0" y="0" width="100" height="80" />
              <text className="label-text" x="50" y="45" fontSize="12">
                ADS1115
                <tspan x="50" dy="14">ADC</tspan>
              </text>
            </g>
            <g transform="translate(150, 450)">
              <rect className="component-box" x="0" y="0" width="80" height="60" />
              <text className="label-text" x="40" y="35" fontSize="12">
                Relay
                <tspan x="40" dy="14">Module</tspan>
              </text>
            </g>
            <g transform="translate(400, 730)">
              <rect className="component-box" x="0" y="0" width="80" height="60" />
              <text className="label-text" x="40" y="35" fontSize="12">
                Relay
                <tspan x="40" dy="14">Module</tspan>
              </text>
            </g>

            <path className="tubing" d="M 140,170 L 140,220" />
            <path className="tubing" d="M 260,170 L 260,220" />
            <path className="tubing" d="M 380,170 L 380,220" />

            <path className="tubing" d="M 140,290 L 140,450 L 300,450 L 300,650" />
            <path className="tubing" d="M 260,290 L 260,430 L 320,430 L 320,650" />
            <path className="tubing" d="M 380,290 L 380,410 L 340,410 L 340,650" />

            <g stroke="#555" strokeWidth="1.5" fill="none">
              <path d="M 120,240 L 360,240 L 360,260" />
              <path d="M 240,240 L 380,240 L 380,260" />
              <path d="M 360,240 L 400,240 L 400,260" />
            </g>

            <path className="wire-signal" d="M 380,370 L 380,420 L 200,420 L 200,450" />
            <path className="wire-signal" d="M 420,370 L 420,700 L 440,700 L 440,730" />
            <path className="wire-power" d="M 180,510 L 180,570" />
            <path className="wire-power" d="M 430,790 L 430,820 L 370,820 L 370,710" />
            <path className="wire-signal" d="M 560,580 L 560,400 L 720,400 L 720,380" />
            <path className="wire-signal" d="M 660,580 L 660,420 L 760,420 L 760,380" />
            <path className="wire-i2c" d="M 710,300 L 710,280 L 540,280 L 540,320" />
            <path className="wire-signal" d="M 260,580 L 260,530 L 460,530 L 460,370" />
          </svg>
        </div>
      </div>
    </div>
  );
}

