/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 dollyg.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/dollyg.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.valet_manual.geometry} material={materials['default']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/dollyg.glb')
