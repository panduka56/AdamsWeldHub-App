import { Flame, Wind, Droplet, Box, Cylinder } from 'lucide-react'

export const CategoryIcon = ({ category }: { category: string }) => {
  const { Icon, iconColor } = getIconAndColors(category)
  return <Icon className={`w-5 h-5 ${iconColor}`} />
}

export const CategoryDefaultImage = ({ category }: { category: string }) => {
  const { Icon, bgColor, iconColor, borderColor } = getIconAndColors(category)

  return (
    <div className={`w-full h-full flex items-center justify-center ${bgColor} border ${borderColor} rounded-lg`}>
      <div className="relative w-24 h-24">
        <Icon className={`w-full h-full ${iconColor}`} />
      </div>
    </div>
  )
}

function getIconAndColors(category: string) {
  switch (category) {
    case 'MIG Welding Gas':
      return {
        Icon: Flame,
        bgColor: 'bg-orange-500/10',
        iconColor: 'text-orange-500',
        borderColor: 'border-orange-500/20'
      }
    case 'TIG Welding Gas':
      return {
        Icon: Flame,
        bgColor: 'bg-blue-500/10',
        iconColor: 'text-blue-500',
        borderColor: 'border-blue-500/20'
      }
    case 'Oxy Fuel Gas':
      return {
        Icon: Wind,
        bgColor: 'bg-purple-500/10',
        iconColor: 'text-purple-500',
        borderColor: 'border-purple-500/20'
      }
    case 'Trade - Beer & Cellar Gas':
      return {
        Icon: Droplet,
        bgColor: 'bg-amber-500/10',
        iconColor: 'text-amber-500',
        borderColor: 'border-amber-500/20'
      }
    default:
      return {
        Icon: Cylinder,
        bgColor: 'bg-gray-400/10',
        iconColor: 'text-gray-400',
        borderColor: 'border-gray-400/20'
      }
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'MIG Welding Gas':
      return 'bg-orange-500/10 text-orange-500'
    case 'TIG Welding Gas':
      return 'bg-blue-500/10 text-blue-500'
    case 'Oxy Fuel Gas':
      return 'bg-gray-500/10 text-gray-500'
    case 'Beer Gas':
      return 'bg-amber-500/10 text-amber-500'
    default:
      return 'bg-gray-400/10 text-gray-400'
  }
} 