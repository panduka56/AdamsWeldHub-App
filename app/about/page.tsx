'use client'

import { motion } from 'framer-motion'
import { 
  Mail, Phone, MapPin, Clock, 
  Facebook, Linkedin, Instagram,
  Factory, Car, Building2, Zap, Ship, Palette
} from 'lucide-react'

const industries = [
  { name: 'Manufacturing and Fabrication', icon: Factory },
  { name: 'Automotive and Aerospace', icon: Car },
  { name: 'Construction and Infrastructure', icon: Building2 },
  { name: 'Energy and Utilities', icon: Zap },
  { name: 'Shipbuilding and Marine', icon: Ship },
  { name: 'Artisanal and Creative Works', icon: Palette },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-[350] mb-4">Welcome to Adams WeldHub</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Professional welding gas solutions and expertise for all your industrial needs.
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-xl p-8 border border-gray-200 dark:border-[#FF8C42]/20"
        >
          <h2 className="text-2xl font-[350] mb-4">Our Mission</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42]" />
              </div>
              <div>
                <span className="font-medium">Superior Quality Products:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive range of welding gases and equipment meeting highest industry standards.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42]" />
              </div>
              <div>
                <span className="font-medium">Expert Knowledge:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  Team of seasoned professionals committed to sharing expertise.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42]" />
              </div>
              <div>
                <span className="font-medium">Unparalleled Customer Service:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  Prioritizing customer needs with personalized support and reliable solutions.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-xl p-8 border border-gray-200 dark:border-[#FF8C42]/20"
        >
          <h2 className="text-2xl font-[350] mb-4">Why Choose Adams WeldHub</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42]" />
              </div>
              <div>
                <span className="font-medium">Extensive Product Selection</span>
                <p className="text-gray-600 dark:text-gray-400">
                  From standard gases to specialized mixtures for specific applications.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42]" />
              </div>
              <div>
                <span className="font-medium">Competitive Pricing</span>
                <p className="text-gray-600 dark:text-gray-400">
                  Best value without compromising on quality.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42]" />
              </div>
              <div>
                <span className="font-medium">Technical Support</span>
                <p className="text-gray-600 dark:text-gray-400">
                  Expert assistance with gas selection, equipment setup, and troubleshooting.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Industries Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-[350] mb-6">Industries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry) => (
            <div 
              key={industry.name}
              className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 text-center
                         border border-gray-200 dark:border-[#FF8C42]/20"
            >
              <industry.icon className="w-8 h-8 mx-auto mb-2 text-[#FF8C42]" />
              <span className="text-sm">{industry.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1E1E1E] rounded-xl p-8 border border-gray-200 dark:border-[#FF8C42]/20"
      >
        <h2 className="text-2xl font-[350] mb-6">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#FF8C42]" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#FF8C42]" />
              <span>info@adamsweldhub.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-[#FF8C42]" />
              <span>123 Welding Way, Industrial City, IN 45678</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[#FF8C42]" />
              <span>Monday–Friday, 8 AM–5 PM</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[#FF8C42] hover:text-[#FF8C42]/80">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#FF8C42] hover:text-[#FF8C42]/80">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#FF8C42] hover:text-[#FF8C42]/80">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 