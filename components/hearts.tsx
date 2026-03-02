"use client"

import { JSX, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Hearts(): JSX.Element {
    const groupRef = useRef<THREE.Group>(null)
    const heartsRef = useRef<THREE.Mesh[]>([])

    // Create heart shape geometry
    const createHeartShape = () => {
        const shape = new THREE.Shape()

        // Draw a heart shape using bezier curves
        shape.moveTo(0, 0.25)
        shape.bezierCurveTo(-0.25, -0.25, -0.75, 0, 0, 0.75)
        shape.bezierCurveTo(0.75, 0, 0.25, -0.25, 0, 0.25)

        return shape
    }

    const heartShape = createHeartShape()
    const geometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.1,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.05,
        bevelThickness: 0.05
    })

    // Scale down the geometry
    geometry.scale(0.3, 0.3, 0.3)
    geometry.center()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (groupRef.current) {
            // Rotate all hearts slowly
            groupRef.current.rotation.y += 0.001

            // Animate individual hearts
            heartsRef.current.forEach((heart, i) => {
                if (heart) {
                    // Floating motion
                    heart.position.y += Math.sin(t * 2 + i) * 0.002
                    // Gentle rotation
                    heart.rotation.x = Math.sin(t * 1.5 + i) * 0.1
                    heart.rotation.z = Math.cos(t * 1.5 + i) * 0.1
                }
            })
        }
    })

    // Create multiple hearts at different positions
    const heartPositions = [
        { x: -1.5, y: 0.2, z: -0.5, color: "#FF69B4", scale: 0.8 },
        { x: 1.2, y: -0.3, z: 0.8, color: "#FFB6C1", scale: 0.6 },
        { x: -0.8, y: 0.8, z: -1.2, color: "#FFC0CB", scale: 0.7 },
        { x: 1.8, y: 0.5, z: 1.5, color: "#FF1493", scale: 0.5 },
        { x: -1.8, y: -0.6, z: 1.2, color: "#DB7093", scale: 0.9 },
        { x: 0.5, y: -0.8, z: -1.5, color: "#FFA07A", scale: 0.6 },
        { x: -0.3, y: 1.0, z: 1.8, color: "#FF69B4", scale: 0.7 },
        { x: 1.5, y: -0.9, z: -0.8, color: "#FFB6C1", scale: 0.8 },
    ]

    return (
        <group ref={groupRef}>
            {heartPositions.map((pos, i) => (
                <mesh
                    key={i}
                    ref={(el) => {
                        if (el) heartsRef.current[i] = el
                    }}
                    position={[pos.x, pos.y, pos.z]}
                    scale={pos.scale}
                    geometry={geometry}
                    onClick={(e) => {
                        e.stopPropagation()
                        alert("❤️ you're pretty cool! ❤️")
                    }}
                >
                    <meshStandardMaterial
                        color={pos.color}
                        emissive={pos.color}
                        emissiveIntensity={0.8}
                        roughness={0.3}
                        metalness={0.1}
                    />
                </mesh>
            ))}
        </group>
    )
}