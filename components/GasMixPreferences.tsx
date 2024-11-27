import { motion } from 'framer-motion';

interface GasMixPreferencesProps {
  onChange: (mix: string[]) => void;
  selected: string[];
  process: string;
  material: string;
}

interface GasOption {
  id: string;
  name: string;
  description: string;
}

type MaterialGases = {
  'Aluminum': string[];
  'Mild-Steel': string[];
  'Stainless-Steel': string[];
  'Copper': string[];
}

type ProcessGases = {
  'MIG': MaterialGases;
  'TIG': MaterialGases;
  'Flux-Cored'?: Partial<MaterialGases>;
  'Oxy-Fuel'?: Partial<MaterialGases>;
}

const gasMixes: ProcessGases = {
  'MIG': {
    'Aluminum': ['argon', 'helium'],
    'Mild-Steel': ['argon', 'co2'],
    'Stainless-Steel': ['argon', 'co2', 'helium'],
    'Copper': ['argon', 'helium'],
  },
  'TIG': {
    'Aluminum': ['argon', 'helium'],
    'Mild-Steel': ['argon', 'helium'],
    'Stainless-Steel': ['argon', 'hydrogen'],
    'Copper': ['argon', 'helium'],
  },
};

export default function GasMixPreferences({
  onChange,
  selected,
  process,
  material,
}: GasMixPreferencesProps) {
  const availableGases = gasMixes[process as keyof ProcessGases]?.[material as keyof MaterialGases] || [];

  const gasOptions: GasOption[] = availableGases.map((id: string) => ({
    id,
    name: id.toUpperCase() === 'CO2' ? 'CO₂' : id.charAt(0).toUpperCase() + id.slice(1),
    description: `Pure ${id.charAt(0).toUpperCase() + id.slice(1)}`,
  }));

  const handleSelect = (id: string) => {
    const newSelection = selected.includes(id)
      ? selected.filter((mix) => mix !== id)
      : [...selected, id];

    onChange(newSelection);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {gasOptions.map((mix: GasOption) => (
        <motion.button
          key={mix.id}
          onClick={() => handleSelect(mix.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            p-4 rounded-xl border transition-all duration-200
            ${selected.includes(mix.id)
              ? 'bg-[#FF8C42]/10 border-[#FF8C42] text-[#FF8C42]'
              : 'bg-[#222222]/80 border-[#FF8C42]/10 text-[#E5E5E5]/60 hover:bg-[#FF8C42]/5'
            }
          `}
        >
          <div className="text-lg font-[350] mb-1">{mix.name}</div>
          <div className="text-sm opacity-60">{mix.description}</div>
        </motion.button>
      ))}
    </div>
  );
}
