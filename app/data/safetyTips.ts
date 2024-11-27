import { AlertTriangle, Shield, Wrench, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SafetyTip {
  id: string;
  title: string;
  summary: string;
  details: {
    introduction: string;
    keyPoints: string[];
  };
  procedures?: {
    title: string;
    steps: string[];
  }[];
  warnings?: string[];
  equipment?: string[];
  icon: LucideIcon;
  category: string;
}

export const safetyTips: SafetyTip[] = [
  {
    id: "ppe-usage",
    title: "Proper Use of Personal Protective Equipment (PPE)",
    summary: "Essential guidelines for wearing appropriate PPE during welding.",
    icon: Shield,
    category: "Personal Protection",
    details: {
      introduction: "Wearing appropriate PPE is crucial for your safety during welding operations. Each piece of equipment serves a specific protective function.",
      keyPoints: [
        "Always wear a welding helmet with proper filter lenses",
        "Use flame-resistant clothing to protect against sparks and heat",
        "Wear safety gloves designed for welding to prevent burns",
        "Use ear protection in noisy environments",
        "Ensure proper ventilation to avoid inhaling harmful fumes"
      ]
    }
  },
  {
    id: "gas-cylinders",
    title: "Safe Handling of Gas Cylinders",
    summary: "Guidelines on storing, transporting, and using gas cylinders safely.",
    icon: AlertTriangle,
    category: "Gas Safety",
    details: {
      introduction: "Gas cylinders require careful handling and storage to prevent accidents. Following proper procedures is essential for safety.",
      keyPoints: [
        "Store cylinders upright and secure them to prevent tipping",
        "Keep cylinders away from heat sources and direct sunlight",
        "Use appropriate regulators and check for leaks regularly",
        "Never attempt to repair damaged cylinders yourself",
        "Follow proper procedures when connecting and disconnecting cylinders"
      ]
    }
  },
  {
    id: "fire-prevention",
    title: "Fire Prevention Measures",
    summary: "Steps to minimize fire risks during welding operations.",
    icon: AlertTriangle,
    category: "Fire Safety",
    details: {
      introduction: "Fire prevention is critical in welding operations. Following proper procedures helps maintain a safe working environment.",
      keyPoints: [
        "Keep flammable materials away from the welding area",
        "Have fire extinguishers readily accessible",
        "Inspect equipment regularly for faulty wiring or gas leaks",
        "Use welding curtains to contain sparks",
        "Be aware of your surroundings and potential hazards"
      ]
    }
  },
  {
    id: "electrical-safety",
    title: "Electrical Safety",
    summary: "Best practices to prevent electrical accidents.",
    icon: AlertTriangle,
    category: "Electrical Safety",
    details: {
      introduction: "Electrical safety is paramount in welding operations to prevent shock and other electrical hazards.",
      keyPoints: [
        "Ensure all equipment is properly grounded",
        "Inspect cables and connectors for damage before use",
        "Do not weld in damp or wet conditions",
        "Disconnect power sources before performing maintenance",
        "Use insulated tools and wear rubber-soled shoes"
      ]
    }
  },
  {
    id: "ventilation",
    title: "Ventilation and Fume Control",
    summary: "Importance of proper ventilation to prevent exposure to hazardous fumes.",
    icon: AlertTriangle,
    category: "Environmental Safety",
    details: {
      introduction: "Proper ventilation is essential to protect against harmful fumes and maintain air quality in the welding area.",
      keyPoints: [
        "Weld in well-ventilated areas or use local exhaust systems",
        "Use respirators when necessary",
        "Be aware of the materials being welded and potential toxic fumes",
        "Avoid welding in confined spaces without appropriate precautions",
        "Monitor air quality regularly"
      ]
    }
  },
  {
    id: "workspace-safety",
    title: "Workspace Safety",
    summary: "Creating and maintaining a safe welding environment.",
    icon: Users,
    category: "Workspace Management",
    details: {
      introduction: "A well-organized and properly maintained workspace is essential for safe welding operations.",
      keyPoints: [
        "Keep work area clean and free of obstacles",
        "Ensure adequate lighting in the welding area",
        "Maintain clear access to emergency exits and equipment",
        "Store tools and equipment properly when not in use",
        "Post appropriate warning signs in welding areas"
      ]
    }
  },
  {
    id: "equipment-maintenance",
    title: "Equipment Maintenance",
    summary: "Proper care and maintenance of welding equipment.",
    icon: Wrench,
    category: "Equipment Safety",
    details: {
      introduction: "Regular maintenance of welding equipment is crucial for safety and optimal performance.",
      keyPoints: [
        "Inspect equipment before each use",
        "Follow manufacturer's maintenance schedules",
        "Replace worn or damaged parts immediately",
        "Keep detailed maintenance records",
        "Only use compatible replacement parts"
      ]
    }
  },
  {
    id: "emergency-procedures",
    title: "Emergency Procedures",
    summary: "How to handle welding-related emergencies.",
    icon: AlertTriangle,
    category: "Emergency Response",
    details: {
      introduction: "Knowing how to respond to emergencies is critical for workplace safety.",
      keyPoints: [
        "Know the location of emergency equipment",
        "Understand emergency shutdown procedures",
        "Keep first aid supplies readily available",
        "Know how to respond to different types of fires",
        "Maintain clear communication channels for emergencies"
      ]
    }
  }
];

export const categories = Array.from(new Set(safetyTips.map(tip => tip.category)));