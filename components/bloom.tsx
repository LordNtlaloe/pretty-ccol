"use client"

import { EffectComposer, Bloom } from "@react-three/postprocessing"

export default function BloomLayer() {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.6}
                luminanceThreshold={0.7}
                luminanceSmoothing={0.9}
            />
        </EffectComposer>
    )
}