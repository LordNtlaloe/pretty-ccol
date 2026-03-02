"use client"

import { JSX, useMemo } from "react"
import { Points, PointMaterial } from "@react-three/drei"

export default function Stars(): JSX.Element {
    const positions = useMemo(() => {
        const arr = new Float32Array(300 * 3)

        for (let i = 0; i < 300; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 10
            arr[i * 3 + 1] = (Math.random() - 0.5) * 10
            arr[i * 3 + 2] = (Math.random() - 0.5) * 10
        }

        return arr
    }, [])

    return (
        <Points positions={positions}>
            <PointMaterial size={0.03} color="#ffffff" transparent />
        </Points>
    )
}