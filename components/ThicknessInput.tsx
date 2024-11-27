import { useState } from 'react'

interface ThicknessInputProps {
  onChange: (value: number) => void
  value: number
}

export default function ThicknessInput({ onChange, value }: ThicknessInputProps) {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="thickness" className="text-silver mb-2">
        Material Thickness (mm)
      </label>
      <input
        type="range"
        id="thickness"
        min="0"
        max="50"
        step="0.1"
        value={localValue}
        onChange={handleChange}
        className="w-full max-w-md appearance-none bg-jet-black h-2 rounded-full"
      />
      <div className="text-electric-cyan mt-4 text-2xl font-bold">{localValue.toFixed(1)} mm</div>
    </div>
  )
}

