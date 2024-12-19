// Ruo Yang Jiang 261055118

import styled, { ThemeProvider } from 'styled-components'
import defaultTheme, { Theme } from '../styles/theme'
import React, { useEffect, useRef, useState } from 'react'
import sykkuno from '../assets/sykkuno.png'

type AnimationProps = {
  theme?: Theme
}

const SpriteCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: black;
`

export default function AnimationComponent(props: AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const X = useRef(0) // Store x position
  const Y = useRef(0) // Store y position
  const [animationType, setAnimationType] = useState<
    | 'walkLeft'
    | 'walkRight'
    | 'pause'
    | 'danglingLeft'
    | 'danglingRight'
    | 'fallLeft'
    | 'fallRight'
  >('walkLeft')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animations = {
      walkLeft: { row: 0, frameCount: 3 },
      walkRight: { row: 1, frameCount: 3 },
      pause: { row: 0, frameCount: 1 },
      danglingLeft: { row: 2, frameCount: 3 },
      danglingRight: { row: 3, frameCount: 3 },
      fallLeft: { row: 4, frameCount: 3 },
      fallRight: { row: 5, frameCount: 3 },
    } as const

    let frameIndex = 0
    const frameWidth = 128
    const frameHeight = 128

    let x = canvas.width / 2 - frameWidth / 2 // Start character in the center (adjusted for sprite width)
    let y = canvas.height - frameHeight
    const speed = 1 // character speed along x axis

    let frameCounter = 0

    const updateFrame = () => {
      const anim = animations[animationType]
      const frameDelay = 20 // higher number = slower speed of frame switching

      frameCounter += 1
      if (frameCounter >= frameDelay) {
        frameIndex = (frameIndex + 1) % anim.frameCount
        frameCounter = 0
      }

      if (!isDragging) {
        if (animationType === 'walkLeft') x -= speed
        if (animationType === 'walkRight') x += speed
        if (animationType === 'fallLeft' || animationType === 'fallRight') {
          // Make the character fall straight down
          y += speed // Adjust speed multiplier for faster/slower fall

          // Stop falling when the character reaches the bottom of the canvas
          if (y + frameHeight >= canvas.height) {
            y = canvas.height - frameHeight

            // After falling, switch to a pause state
            //setAnimationType('pause')
          }
        }

        // Ensure the character stays within canvas bounds
        const canvasWidth = canvas.width
        if (x < 0) x = 0
        if (x + frameWidth > canvasWidth) x = canvasWidth - frameWidth
      }
    }

    const drawFrame = () => {
      const anim = animations[animationType]
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        spriteSheet,
        frameIndex * frameWidth,
        anim.row * frameHeight,
        frameWidth,
        frameHeight,
        x,
        y,
        frameWidth,
        frameHeight
      )
    }

    const spriteSheet = new Image()
    spriteSheet.src = sykkuno

    const loop = () => {
      updateFrame()
      drawFrame()
      requestAnimationFrame(loop)
    }

    spriteSheet.onload = () => {
      const containerWidth = canvas.offsetWidth
      const containerHeight = canvas.offsetHeight
      canvas.width = containerWidth
      canvas.height = containerHeight
      y = canvas.height - frameHeight

      loop()
    }

    // Mouse event handlers for dragging
    const handleMouseDown = (e: MouseEvent) => {
      const mouseX = e.clientX - canvas.offsetLeft
      const mouseY = e.clientY - canvas.offsetTop

      if (
        mouseX >= x &&
        mouseX <= x + frameWidth &&
        mouseY >= y &&
        mouseY <= y + frameHeight
      ) {
        setIsDragging(true)
        setDragOffset({ x: mouseX - x, y: mouseY - y })
        setAnimationType(
          animationType == 'walkLeft' ? 'danglingLeft' : 'danglingRight'
        )
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const mouseX = e.clientX - canvas.offsetLeft
        const mouseY = e.clientY - canvas.offsetTop

        x = mouseX - dragOffset.x
        y = mouseY - dragOffset.y

        // Keep character within canvas bounds while dragging
        if (x < 0) x = 0
        if (x + frameWidth > canvas.width) x = canvas.width - frameWidth
        if (y < 0) y = 0
        if (y + frameHeight > canvas.height) y = canvas.height - frameHeight
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setAnimationType(
        animationType == 'danglingLeft' ? 'fallLeft' : 'fallRight'
      )
    }

    // Add event listeners for mouse interactions
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, animationType])

  // Random animation change every few seconds
  useEffect(() => {
    if (isDragging) return

    const randomizeAnimation = () => {
      const rand = Math.random()
      if (rand < 0.33) {
        setAnimationType('walkLeft')
      } else if (rand < 0.66) {
        setAnimationType('walkRight')
      } else {
        setAnimationType('pause')
      }
    }

    const interval = setInterval(randomizeAnimation, 1000)

    return () => clearInterval(interval)
  }, [isDragging])

  return (
    <ThemeProvider theme={props.theme ?? defaultTheme}>
      <SpriteCanvas ref={canvasRef} />
    </ThemeProvider>
  )
}
