export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  gradient: string;
  hover: string;
  textColor: string;
}

export const themes: Theme[] = [
  {
    name: 'Ocean Blue',
    primary: '#2563eb', // blue-600
    secondary: '#60a5fa', // blue-300
    gradient: 'linear-gradient(to right, #3b82f6, #2563eb)',
    hover: '#1d4ed8', // blue-700
    textColor: '#ffffff'
  },
  {
    name: 'Royal Purple',
    primary: '#9333ea', // purple-600
    secondary: '#c084fc', // purple-300
    gradient: 'linear-gradient(to right, #a855f7, #9333ea)',
    hover: '#7e22ce', // purple-700
    textColor: '#ffffff'
  },
  {
    name: 'Forest Green',
    primary: '#059669', // emerald-600
    secondary: '#34d399', // emerald-300
    gradient: 'linear-gradient(to right, #10b981, #059669)',
    hover: '#047857', // emerald-700
    textColor: '#ffffff'
  },
  {
    name: 'Sunset Rose',
    primary: '#e11d48', // rose-600
    secondary: '#fb7185', // rose-300
    gradient: 'linear-gradient(to right, #f43f5e, #e11d48)',
    hover: '#be123c', // rose-700
    textColor: '#ffffff'
  },
  {
    name: 'Golden Amber',
    primary: '#f59e0b', // amber-500
    secondary: '#fbbf24', // amber-300
    gradient: 'linear-gradient(to right, #f59e0b, #d97706)',
    hover: '#d97706', // amber-600
    textColor: '#ffffff'
  },
  {
    name: 'Deep Teal',
    primary: '#0d9488', // teal-600
    secondary: '#2dd4bf', // teal-300
    gradient: 'linear-gradient(to right, #14b8a6, #0d9488)',
    hover: '#0f766e', // teal-700
    textColor: '#ffffff'
  },
  {
    name: 'Rich Indigo',
    primary: '#4f46e5', // indigo-600
    secondary: '#818cf8', // indigo-300
    gradient: 'linear-gradient(to right, #6366f1, #4f46e5)',
    hover: '#4338ca', // indigo-700
    textColor: '#ffffff'
  },
  {
    name: 'Crimson Red',
    primary: '#dc2626', // red-600
    secondary: '#f87171', // red-300
    gradient: 'linear-gradient(to right, #ef4444, #dc2626)',
    hover: '#b91c1c', // red-700
    textColor: '#ffffff'
  },
  {
    name: 'Slate Gray',
    primary: '#475569', // slate-600
    secondary: '#94a3b8', // slate-300
    gradient: 'linear-gradient(to right, #64748b, #475569)',
    hover: '#334155', // slate-700
    textColor: '#ffffff'
  },
  {
    name: 'Warm Orange',
    primary: '#ea580c', // orange-600
    secondary: '#fb923c', // orange-300
    gradient: 'linear-gradient(to right, #f97316, #ea580c)',
    hover: '#c2410c', // orange-700
    textColor: '#ffffff'
  },
  {
    name: 'Cool Cyan',
    primary: '#0891b2', // cyan-600
    secondary: '#22d3ee', // cyan-300
    gradient: 'linear-gradient(to right, #06b6d4, #0891b2)',
    hover: '#0e7490', // cyan-700
    textColor: '#ffffff'
  },
  {
    name: 'Vibrant Pink',
    primary: '#db2777', // pink-600
    secondary: '#f472b6', // pink-300
    gradient: 'linear-gradient(to right, #ec4899, #db2777)',
    hover: '#be185d', // pink-700
    textColor: '#ffffff'
  },
  {
    name: 'Deep Navy',
    primary: '#1e40af', // blue-800
    secondary: '#60a5fa', // blue-300
    gradient: 'linear-gradient(to right, #2563eb, #1e40af)',
    hover: '#1e3a8a', // blue-900
    textColor: '#ffffff'
  }
];