"use client"

import Navigation from "./Navigation"
import { Camera, Flame, Speaker, Wifi, Mic } from 'lucide-react'

const statusCards = [
  { icon: Camera, label: "Active Jobs", count: "3/4", subtext: "welding" },
  { icon: Flame, label: "Gas Types", count: "6", subtext: "available" },
  { icon: Speaker, label: "Alerts", count: "3", subtext: "notifications" },
  { icon: Wifi, label: "Sensors", count: "2", subtext: "connected" },
  { icon: Mic, label: "Voice Control", count: "4", subtext: "commands" },
]

export default function WeldingDashboard() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navigation />
      
      <main className="p-6">
        {/* Status Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {statusCards.map((card, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                index === 1 ? "bg-[#CCFF00] bg-opacity-20" : "bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <card.icon className="w-5 h-5" />
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                </div>
              </div>
              <div className="text-sm text-gray-400">{card.label}</div>
              <div className="text-xl font-bold mt-1">{card.count}</div>
              <div className="text-sm text-gray-400">{card.subtext}</div>
            </div>
          ))}
        </div>

        {/* Favorites Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Favorites</h2>
            <button className="text-gray-400">
              <span className="sr-only">More options</span>
              •••
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* MIG Process Card */}
            <div className="bg-blue-500 bg-opacity-20 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-6 h-6 text-blue-400" />
                <button className="p-1 rounded-full hover:bg-blue-400 hover:bg-opacity-20">
                  <span className="sr-only">Expand</span>
                  ↓
                </button>
              </div>
              <h3 className="text-lg font-medium">MIG Welding</h3>
              <p className="text-sm text-gray-400">Ar + CO₂ Mix</p>
            </div>

            {/* TIG Process Card */}
            <div className="bg-purple-500 bg-opacity-20 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-6 h-6 text-purple-400" />
                <button className="p-1 rounded-full hover:bg-purple-400 hover:bg-opacity-20">
                  <span className="sr-only">Expand</span>
                  ↓
                </button>
              </div>
              <h3 className="text-lg font-medium">TIG Welding</h3>
              <p className="text-sm text-gray-400">Pure Argon</p>
            </div>

            {/* Oxy-Fuel Process Card */}
            <div className="bg-orange-500 bg-opacity-20 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-6 h-6 text-orange-400" />
                <button className="p-1 rounded-full hover:bg-orange-400 hover:bg-opacity-20">
                  <span className="sr-only">Expand</span>
                  ↓
                </button>
              </div>
              <h3 className="text-lg font-medium">Oxy-Fuel</h3>
              <p className="text-sm text-gray-400">Oxygen + Acetylene</p>
            </div>
          </div>
        </div>

        {/* Gas Control Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Gas Flow Control</h2>
              <p className="text-gray-400">Adjust gas mixture and flow rates</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-[#CCFF00] text-black px-6 py-2 rounded-full">
                On
              </button>
              <button className="bg-gray-700 px-6 py-2 rounded-full">
                Off
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Gas Control Cards */}
            {["Argon", "CO₂", "Oxygen"].map((gas) => (
              <div key={gas} className="bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{gas}</span>
                  <div className="w-10 h-6 bg-[#CCFF00] bg-opacity-20 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 rounded-full bg-[#CCFF00]" />
                  </div>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#CCFF00]"
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-400">Flow Rate: 65%</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

