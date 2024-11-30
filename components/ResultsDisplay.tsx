import { motion } from 'framer-motion'

interface ResultsDisplayProps {
  process: string;
  material: string;
  thickness: number;
  gasMixPreferences: string[];
  recommendedGases: string[];
}

export default function ResultsDisplay({ 
  process, 
  material, 
  thickness, 
  gasMixPreferences,
  recommendedGases 
}: ResultsDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#222222]/80 p-6 rounded-xl border border-[#FF8C42]/10"
    >
      <h2 className="text-2xl font-[350] text-[#E5E5E5] mb-4">Recommended Gas Mix</h2>
      {recommendedGases.length > 0 ? (
        <div>
          <div className="text-4xl font-[350] text-[#FF8C42] mb-6">{recommendedGases[0]}</div>
          {recommendedGases.length > 1 && (
            <div className="text-[#E5E5E5]/60">
              Alternative options:
              <ul className="list-disc list-inside mt-2 space-y-1">
                {recommendedGases.slice(1).map((gas, i) => (
                  <li key={i}>{gas}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-[#FF8C42] mb-6">
          No recommendations available for the selected combination
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-[#E5E5E5]/60">
        <div>
          <strong className="text-[#E5E5E5]">Process:</strong> {process}
        </div>
        <div>
          <strong className="text-[#E5E5E5]">Material:</strong> {material}
        </div>
        <div>
          <strong className="text-[#E5E5E5]">Thickness:</strong> {thickness} mm
        </div>
        <div>
          <strong className="text-[#E5E5E5]">Gas Mix Preferences:</strong> {gasMixPreferences.join(', ')}
        </div>
      </div>
      <div className="mt-6 p-4 bg-[#1A1A1A]/50 rounded-lg border border-[#FF8C42]/10">
        <h3 className="text-xl font-[350] text-[#E5E5E5] mb-2">Safety Precautions</h3>
        <ul className="list-disc list-inside text-[#E5E5E5]/60 space-y-2">
          <li>Always wear appropriate personal protective equipment (PPE)</li>
          <li>Ensure proper ventilation in the welding area</li>
          <li>Follow manufacturer&apos;s guidelines for gas handling and storage</li>
          <li>Regularly inspect equipment for leaks or damage</li>
        </ul>
      </div>
      <p>Don&apos;t forget to check your settings!</p>
    </motion.div>
  )
}

