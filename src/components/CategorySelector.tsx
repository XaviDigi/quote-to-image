import React from 'react'
import { BookOpen } from 'lucide-react'
import { QuoteCategory } from '../utils/quoteCategories'

interface CategorySelectorProps {
  category: QuoteCategory
  setCategory: (category: QuoteCategory) => void
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ category, setCategory }) => {
  const categories: QuoteCategory[] = ['inspirational', 'love', 'success', 'wisdom', 'humor']

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-brown mb-2">
        Quote Category
      </label>
      <div className="flex items-center">
        <BookOpen className="mr-2 text-brown" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as QuoteCategory)}
          className="select w-full"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CategorySelector