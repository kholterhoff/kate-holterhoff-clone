'use client'

import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export default function TypingAnimation({
  text,
  speed = 100,
  delay = 500,
  className = ""
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Start typing after initial delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, isTyping, speed, text])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorTimer)
  }, [])

  // Stop cursor blinking after typing is complete
  useEffect(() => {
    if (currentIndex >= text.length && isTyping) {
      setTimeout(() => {
        setShowCursor(false)
      }, 2000) // Show cursor for 2 seconds after completion
    }
  }, [currentIndex, text.length, isTyping])

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`typing-cursor ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
      >
        |
      </span>
    </span>
  )
}
