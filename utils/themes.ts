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
      primary: 'bg-blue-600',
      secondary: 'bg-blue-300',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hover: 'hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'Royal Purple',
      primary: 'bg-purple-600',
      secondary: 'bg-purple-300',
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
      hover: 'hover:bg-purple-700',
      textColor: 'text-white'
    },
    {
      name: 'Forest Green',
      primary: 'bg-emerald-600',
      secondary: 'bg-emerald-300',
      gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      hover: 'hover:bg-emerald-700',
      textColor: 'text-white'
    },
    {
      name: 'Sunset Rose',
      primary: 'bg-rose-600',
      secondary: 'bg-rose-300',
      gradient: 'bg-gradient-to-r from-rose-500 to-rose-600',
      hover: 'hover:bg-rose-700',
      textColor: 'text-white'
    },
    {
      name: 'Golden Amber',
      primary: 'bg-amber-500',
      secondary: 'bg-amber-300',
      gradient: 'bg-gradient-to-r from-amber-500 to-amber-600',
      hover: 'hover:bg-amber-600',
      textColor: 'text-white'
    },
    {
      name: 'Crimson Red',
      primary: 'bg-red-600',
      secondary: 'bg-red-300',
      gradient: 'bg-gradient-to-r from-red-500 to-red-600',
      hover: 'hover:bg-red-700',
      textColor: 'text-white'
    },
    {
      name: 'Teal',
      primary: 'bg-teal-600',
      secondary: 'bg-teal-300',
      gradient: 'bg-gradient-to-r from-teal-500 to-teal-600',
      hover: 'hover:bg-teal-700',
      textColor: 'text-white'
    }
  ]