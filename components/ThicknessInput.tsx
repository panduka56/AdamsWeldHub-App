import { useState } from 'react'

interface ThicknessInputProps {
  value: number
  onChange: (value: number) => void
  onCalculate?: () => void
}

export default function ThicknessInput({ value, onChange, onCalculate }: ThicknessInputProps) {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full max-w-xl mx-auto">
      <div className="w-full space-y-6">
        <div className="text-center">
          <label htmlFor="thickness" className="text-[#E5E5E5]/60 mb-2 block text-lg">
            Material Thickness (mm)
          </label>
          <div className="text-[#FF8C42] text-4xl font-[350] mb-8">
            {localValue.toFixed(1)} mm
          </div>
        </div>

        <input
          type="range"
          id="thickness"
          min="0"
          max="50"
          step="0.1"
          value={localValue}
          onChange={handleChange}
          className="w-full appearance-none bg-[#222222] h-2 rounded-full"
        />

        <div className="flex justify-center mt-8">
          <button
            onClick={onCalculate}
            className="px-8 py-3 rounded-lg bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90 transition-colors text-lg"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  )
}

