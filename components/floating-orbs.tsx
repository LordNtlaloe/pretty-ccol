"use client"

import { JSX, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ThreeEvent } from "@react-three/fiber"

export default function FloatingHeart(): JSX.Element {
    const meshRef = useRef<THREE.Mesh | null>(null)

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
        depth: 0.15,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.05,
        bevelThickness: 0.05
    })

    // Scale and center the geometry
    geometry.scale(0.4, 0.4, 0.4)
    geometry.center()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (meshRef.current) {
            // Floating up and down motion
            meshRef.current.position.y = Math.sin(t * 1.5) * 0.4

            // Gentle rotation
            meshRef.current.rotation.y += 0.005
            meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1
            meshRef.current.rotation.z = Math.cos(t * 0.5) * 0.1

            // Subtle scale pulse
            const scale = 1 + Math.sin(t * 3) * 0.05
            meshRef.current.scale.set(scale, scale, scale)
        }
    })

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        alert("from me to you, you're pretty cool ❤️")
    }

    return (
        <mesh
            ref={meshRef}
            onClick={handleClick}
            position={[0, 0, 0]}
        >
            <primitive object={geometry} />
            <meshStandardMaterial
                color="#FF69B4"
                emissive="#FF1493"
                emissiveIntensity={2}
                roughness={0.2}
                metalness={0.1}
            />
        </mesh>
    )
}