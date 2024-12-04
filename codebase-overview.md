# AdamsGas Welding Hub - Codebase Overview

## Core Application Structure

### Pages & Routing (`app/`)

app/
├── page.tsx                 // Main landing page with calculator
├── about/page.tsx           // Company info and mission statement
├── gas-flow-chart/page.tsx  // Gas flow reference charts
├── notes/page.tsx           // Notes & bookmarks feature
├── troubleshooting/
│   ├── page.tsx            // Troubleshooting guide main page
│   └── [id]/page.tsx       // Individual troubleshooting issue pages

Key Components
Calculators & Tools

components/
├── WeldingGasCalculator.tsx     // Main gas mixture calculator
├── BulkSavingsCalculator.tsx    // Bulk purchase savings calculator
├── DiscountCalculator.tsx       // Price discount calculator
├── QuickOrderTool.tsx          // Fast ordering interface

Documentation & Reference
components/
├── WeldingDefectsTroubleshooting.tsx  // Defects diagnosis tool
├── QuickReference.tsx                 // Quick reference sheets
└── NotesSection.tsx                   // Notes management component

Data Management
Static Data Files
app/data/
├── safetyTips.ts           // Safety guidelines and procedures
├── troubleshootingIssues.ts // Common welding issues database
└── safety.ts               // Safety protocols and equipment

Types & Interfaces
Key interfaces include:
interface Note {
  id: string
  content: string
  timestamp: string
  title: string
  header?: string
}

interface TroubleshootingIssue {
  id: string
  title: string
  category: string
  description: string
  causes: string[]
  solutions: string[]
  equipment: string[]
}

interface SafetyTip {
  id: string
  title: string
  description: string
  icon: LucideIcon
  steps: string[]
  procedures: {
    title: string
    steps: string[]
  }[]
  warnings: string[]
  equipment: string[]
}

Feature Breakdown
Notes System
Full CRUD operations for notes
Local storage persistence
Search functionality
Import/export capabilities
Rich text formatting support
Troubleshooting Guide
Categorized issues database
Searchable solutions
Equipment recommendations
Step-by-step fixes
Gas Flow Charts
Interactive reference tables
Material-specific recommendations
Optimal flow rate guidelines
Safety warnings
Safety Guidelines
Categorized safety tips
Equipment checklists
Emergency procedures
Warning systems
UI/UX Components
Motion & Animation
Uses Framer Motion for:
Page transitions
Component animations
Interactive feedback
Smooth scrolling
Theme & Styling
Dark mode support
Custom color scheme (primary: #FF8C42)
Responsive design
TailwindCSS utilities
Utilities & Configuration
Component Configuration
)
Project Structure
guidelines
Key Connections & Dependencies
Notes System:
NotesSection.tsx → notes/page.tsx
Local storage integration
Export/import functionality
Troubleshooting:
WeldingDefectsTroubleshooting.tsx → troubleshooting/page.tsx
troubleshootingIssues.ts data integration
Safety:
safety.ts → SafetyTip components
Icon integration with Lucide
Calculators:
All calculator components → main page
Shared utility functions
Future Development Notes
Areas for Expansion:
Calculator implementations needed
Additional troubleshooting cases
Enhanced note features
Integration Points:
API endpoints for future backend
User authentication system
Cloud storage for notes
Performance Considerations:
Local storage limitations
Static generation optimization
Animation performance
This codebase is structured as a comprehensive welding resource platform with a focus on user tools, safety, and technical documentation. The modular component structure allows for easy expansion and maintenance.