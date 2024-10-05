import React, { useState } from 'react'
import QuoteInput from './components/QuoteInput'
import CategorySelector from './components/CategorySelector'
import ImagePreview from './components/ImagePreview'
import { Image, Download, RefreshCw } from 'lucide-react'
import { generateImage } from './utils/imageGenerator'
import { getRandomQuote, QuoteCategory } from './utils/quoteCategories'

const App: React.FC = () => {
  const [quote, setQuote] = useState('')
  const [category, setCategory] = useState<QuoteCategory>('inspirational')
  const [imageUrl, setImageUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateImage = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const generatedImageUrl = await generateImage(quote, category)
      setImageUrl(generatedImageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
      setError(`An error occurred while generating the image. Please try again.`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRandomQuote = () => {
    const randomQuote = getRandomQuote(category)
    setQuote(randomQuote)
  }

  return (
    <div className="min-h-screen bg-beige flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-brown">Quote to Image</h1>
      <div className="w-full max-w-3xl bg-light-beige rounded-lg shadow-md p-6">
        <CategorySelector category={category} setCategory={setCategory} />
        <QuoteInput quote={quote} setQuote={setQuote} />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleRandomQuote}
            className="btn btn-secondary"
          >
            <RefreshCw className="inline-block mr-2" />
            Random Quote
          </button>
          <button
            onClick={handleGenerateImage}
            disabled={isGenerating || !quote}
            className={`btn btn-primary ${
              isGenerating || !quote ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Image className="inline-block mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-600 bg-red-100 border border-red-400 rounded p-2">
            {error}
          </div>
        )}
      </div>
      {imageUrl && (
        <div className="mt-8 w-full max-w-3xl">
          <ImagePreview imageUrl={imageUrl} />
          <a
            href={imageUrl}
            download="quote-image.png"
            className="mt-4 btn btn-primary w-full flex items-center justify-center"
          >
            <Download className="inline-block mr-2" />
            Download Image
          </a>
        </div>
      )}
    </div>
  )
}

export default App