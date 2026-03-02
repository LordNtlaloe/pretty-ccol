"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function CameraRig(): null {
    const { camera, mouse } = useThree()
    const target = useRef(new THREE.Vector2())

    useFrame(() => {
        target.current.x = mouse.x * 0.5
        target.current.y = mouse.y * 0.5

        camera.position.x += (target.current.x - camera.position.x) * 0.05
        camera.position.y += (target.current.y - camera.position.y) * 0.05

        camera.lookAt(0, 0, 0)
    })

    return null
}