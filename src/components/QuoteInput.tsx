import React from 'react'

interface QuoteInputProps {
  quote: string
  setQuote: (quote: string) => void
}

const QuoteInput: React.FC<QuoteInputProps> = ({ quote, setQuote }) => {
  return (
    <div className="mb-4">
      <label htmlFor="quote" className="block text-sm font-medium text-brown mb-2">
        Your Quote
      </label>
      <textarea
        id="quote"
        rows={3}
        className="input w-full"
        placeholder="Enter your quote or select a random one"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
    </div>
  )
}

export default QuoteInput