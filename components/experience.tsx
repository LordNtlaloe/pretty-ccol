"use client"

import { Canvas } from "@react-three/fiber"
import { JSX } from "react"
import Stars from "./stars"
import CameraRig from "./camera-rig"
import FloatingOrb from "./floating-orbs"
import Sky from "./three/sky"
import BloomLayer from "./bloom"
import Hearts from "./hearts"
import TextMessage from "./text-message"

export default function Experience(): JSX.Element {
    return (
        <Canvas
            camera={{ position: [0, 2, 8], fov: 50 }}
            style={{ height: "100vh", background: "#1a001a" }}
        >
            <Sky />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={0.4} />
            <pointLight position={[0, 2, 2]} intensity={0.8} color="#FF69B4" />

            <FloatingOrb />
            <Hearts />
            <TextMessage />
            <Stars />
            <CameraRig />
            <BloomLayer />
        </Canvas>
    )
}