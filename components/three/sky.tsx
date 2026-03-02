"use client"

import { JSX, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Sky(): JSX.Element {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null)

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value =
                clock.getElapsedTime()
        }
    })

    return (
        <mesh scale={50}>
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                side={THREE.BackSide}
                uniforms={{
                    uTime: { value: 0 },
                }}
                vertexShader={`
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
                fragmentShader={`
          varying vec3 vPos;
          uniform float uTime;

          void main() {
            float h = normalize(vPos).y * 0.5 + 0.5;

            vec3 top = vec3(0.80, 0.70, 0.90);
            vec3 bottom = vec3(1.00, 0.80, 0.85);

            float noise = sin(vPos.x * 2.0 + uTime * 0.1) * 0.02;

            vec3 color = mix(bottom, top, h + noise);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
            />
        </mesh>
    )
}