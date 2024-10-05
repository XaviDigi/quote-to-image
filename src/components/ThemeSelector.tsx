import React from 'react'
import { Palette } from 'lucide-react'

interface ThemeSelectorProps {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  const themes = [
    { id: 'minimalistic', name: 'Minimalistic' },
    { id: 'vintage', name: 'Vintage' },
    { id: 'artistic', name: 'Artistic' },
    { id: 'cinematic', name: 'Cinematic' },
  ]

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Design Style
      </label>
      <div className="flex items-center">
        <Palette className="mr-2" />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ThemeSelector