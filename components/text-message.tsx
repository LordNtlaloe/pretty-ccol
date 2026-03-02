"use client"

import { JSX, useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function TextMessage(): JSX.Element {
    const textGroupRef = useRef<THREE.Group>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const textureRef = useRef<THREE.CanvasTexture | null>(null)

    useEffect(() => {
        // Create canvas for text
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 256
        const ctx = canvas.getContext('2d')

        if (ctx) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw background glow
            ctx.shadowColor = '#FF69B4'
            ctx.shadowBlur = 20

            // Draw main text
            ctx.font = 'bold 48px "Arial", "Helvetica", sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            // Gradient for text
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
            gradient.addColorStop(0, '#FF69B4')
            gradient.addColorStop(0.5, '#FFB6C1')
            gradient.addColorStop(1, '#FF1493')

            ctx.fillStyle = gradient
            ctx.shadowColor = '#FF69B4'
            ctx.shadowBlur = 15

            // Draw first line
            ctx.fillText('from me to you,', canvas.width / 2, canvas.height / 3)

            // Draw second line with different style
            ctx.font = 'bold 64px "Arial", "Helvetica", sans-serif'
            ctx.shadowBlur = 20
            ctx.fillStyle = '#FFFFFF'
            ctx.shadowColor = '#FF1493'
            ctx.fillText("you're pretty cool", canvas.width / 2, canvas.height * 2 / 3)

            // Add small hearts decoration
            ctx.font = '32px "Arial"'
            ctx.fillStyle = '#FF69B4'
            ctx.shadowBlur = 10
            ctx.fillText('❤️', canvas.width / 4, canvas.height - 30)
            ctx.fillText('❤️', canvas.width * 3 / 4, canvas.height - 30)
        }

        canvasRef.current = canvas
        textureRef.current = new THREE.CanvasTexture(canvas)
    }, [])

    useFrame((state) => {
        if (textGroupRef.current) {
            // Gentle floating animation
            const t = state.clock.getElapsedTime()
            textGroupRef.current.position.y = Math.sin(t * 0.5) * 0.2

            // Subtle rotation
            textGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
            textGroupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05
        }
    })

    return (
        <group ref={textGroupRef} position={[0, 1.5, 0]}>
            {/* Main text panel */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[3, 1.5]} />
                <meshStandardMaterial
                    map={textureRef.current}
                    transparent
                    side={THREE.DoubleSide}
                    emissive="#FF69B4"
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Glow effect behind text */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[3.2, 1.7]} />
                <meshBasicMaterial
                    color="#FF69B4"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Floating small hearts around text */}
            {[-1.2, 0, 1.2].map((x, i) => (
                <mesh key={i} position={[x, -0.8, 0.2]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="#FF69B4" emissive="#FFB6C1" />
                </mesh>
            ))}
        </group>
    )
}