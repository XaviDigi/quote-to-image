export type QuoteCategory = 'inspirational' | 'love' | 'success' | 'wisdom' | 'humor'

const quoteCategories: Record<QuoteCategory, string[]> = {
  inspirational: [
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "It always seems impossible until it's done.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "You are never too old to set another goal or to dream a new dream."
  ],
  love: [
    "The best thing to hold onto in life is each other.",
    "Love is composed of a single soul inhabiting two bodies.",
    "Where there is love there is life.",
    "To love and be loved is to feel the sun from both sides.",
    "The greatest happiness of life is the conviction that we are loved."
  ],
  success: [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The secret of success is to do the common thing uncommonly well.",
    "Success usually comes to those who are too busy to be looking for it.",
    "The road to success and the road to failure are almost exactly the same.",
    "Success is not how high you have climbed, but how you make a positive difference to the world."
  ],
  wisdom: [
    "The only true wisdom is in knowing you know nothing.",
    "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    "The fool doth think he is wise, but the wise man knows himself to be a fool.",
    "By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.",
    "The invariable mark of wisdom is to see the miraculous in the common."
  ],
  humor: [
    "I'm not afraid of death. I just don't want to be there when it happens.",
    "The last thing I want to do is hurt you. But it's still on my list.",
    "I used to think I was indecisive, but now I'm not so sure.",
    "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
    "I'm not arguing, I'm just explaining why I'm right."
  ]
}

export const getRandomQuote = (category: QuoteCategory): string => {
  const quotes = quoteCategories[category]
  return quotes[Math.floor(Math.random() * quotes.length)]
}