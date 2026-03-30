'use client'

import { useState, useEffect } from 'react'

const FULL_TEXT = 'kateholterhoff'
const BOLD_LENGTH = 4

export default function TypingHeroTitle() {
  const [visibleLength, setVisibleLength] = useState(0)

  useEffect(() => {
    let intervalId: number | undefined

    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleLength((currentLength) => {
          if (currentLength >= FULL_TEXT.length) {
            if (intervalId) {
              window.clearInterval(intervalId)
            }

            return currentLength
          }

          return currentLength + 1
        })
      }, 150)
    }, 1000)

    return () => {
      window.clearTimeout(startTimer)
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

  const displayedText = FULL_TEXT.slice(0, visibleLength)

  const renderText = () => {
    if (displayedText.length <= BOLD_LENGTH) {
      return (
        <span className="font-bold">
          {displayedText}
        </span>
      )
    }

    const boldText = displayedText.slice(0, BOLD_LENGTH)
    const normalText = displayedText.slice(BOLD_LENGTH)

    return (
      <>
        <span className="font-bold">{boldText}</span>
        <span className="font-normal">{normalText}</span>
      </>
    )
  }

  return (
    <span className="typing-container">{renderText()}</span>
  )
}
