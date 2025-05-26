'use client'

import { useState, useEffect } from 'react'

export default function TypingHeroTitle() {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)

  const fullText = "kateholterhoff"
  const boldPortion = "kate" // First 4 characters should be bold

  // Start typing after initial delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    return () => clearTimeout(startTimer)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentIndex >= fullText.length) {
      if (currentIndex >= fullText.length) {
        setTypingComplete(true)
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + fullText[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, 150)

    return () => clearTimeout(timer)
  }, [currentIndex, isTyping, fullText.length])



  const renderText = () => {
    if (displayedText.length <= boldPortion.length) {
      // Still typing the bold portion
      return (
        <span className="font-bold">
          {displayedText}
        </span>
      )
    } else {
      // Typing the normal portion
      const boldText = displayedText.slice(0, boldPortion.length)
      const normalText = displayedText.slice(boldPortion.length)

      return (
        <>
          <span className="font-bold">{boldText}</span>
          <span className="font-normal">{normalText}</span>
        </>
      )
    }
  }

  return (
    <span className="typing-container">
      {renderText()}
    </span>
  )
}
