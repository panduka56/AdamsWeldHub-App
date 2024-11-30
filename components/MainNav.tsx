import { Flame, Gauge } from 'lucide-react'

const items = [
  // ... existing items ...
  {
    title: "Gas Flow Chart",
    href: "/gas-flow-chart",
    icon: <Gauge className="w-4 h-4" />,
    subItems: [
      {
        title: "Oxy-Fuel Guide",
        href: "/oxy-fuel-guide",
        icon: <Flame className="w-4 h-4" />
      },
      // ... other existing subitems ...
    ]
  },
  // ... other existing items ...
] 