"use client"

import { JSX, useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function TextMessage(): JSX.Element {
    const textGroupRef = useRef<THREE.Group>(null)
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

    useEffect(() => {
        // Create canvas for text
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 256
        const ctx = canvas.getContext('2d')

        if (ctx) {
            // Clear canvas with transparent background
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw text with proper sizing
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            // First line
            ctx.font = 'bold 42px "Arial", "Helvetica", sans-serif'

            // Gradient for first line
            const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, 0)
            gradient1.addColorStop(0, '#FF69B4')
            gradient1.addColorStop(0.5, '#FFB6C1')
            gradient1.addColorStop(1, '#FF1493')

            ctx.fillStyle = gradient1
            ctx.shadowColor = '#FF69B4'
            ctx.shadowBlur = 15
            ctx.fillText('from me to you,', canvas.width / 2, 90)

            // Second line
            ctx.font = 'bold 52px "Arial", "Helvetica", sans-serif'

            const gradient2 = ctx.createLinearGradient(0, 0, canvas.width, 0)
            gradient2.addColorStop(0, '#FF1493')
            gradient2.addColorStop(0.5, '#FF69B4')
            gradient2.addColorStop(1, '#FFB6C1')

            ctx.fillStyle = gradient2
            ctx.shadowColor = '#FF1493'
            ctx.shadowBlur = 20
            ctx.fillText("you're pretty cool", canvas.width / 2, 165)

            // Small hearts decoration
            ctx.font = '28px "Arial"'
            ctx.fillStyle = '#FF69B4'
            ctx.shadowBlur = 10
            ctx.fillText('❤️', 120, 220)
            ctx.fillText('❤️', canvas.width - 120, 220)

            // Create texture and force update
            const newTexture = new THREE.CanvasTexture(canvas)
            newTexture.needsUpdate = true
            setTexture(newTexture)
        }
    }, [])

    useFrame((state) => {
        if (textGroupRef.current) {
            // Gentle floating animation
            const t = state.clock.getElapsedTime()
            textGroupRef.current.position.y = 2.2 + Math.sin(t * 0.5) * 0.2

            // Subtle rotation
            textGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
        }
    })

    if (!texture) {
        
    }

    return (
        <group ref={textGroupRef} position={[0, 2.2, 0]}>
            {/* Main text panel - adjusted size for text */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[4, 2]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    side={THREE.DoubleSide}
                    emissive="#FF69B4"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Simple glow effect */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[4.2, 2.2]} />
                <meshBasicMaterial
                    color="#FF69B4"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Small hearts around text - positioned relative to new panel size */}
            <mesh position={[-1.8, -1, 0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#FF69B4" emissive="#FFB6C1" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -1.1, 0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#FF1493" emissive="#FF69B4" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[1.8, -1, 0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#FF69B4" emissive="#FFB6C1" emissiveIntensity={0.5} />
            </mesh>
        </group>
    )
}