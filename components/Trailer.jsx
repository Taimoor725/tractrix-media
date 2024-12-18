import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { applyProps } from '@react-three/fiber'
import useStateStore from "@/stores/stateStore"
import * as THREE from 'three';

export function Trailer(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/trailer-transformed.glb')
    const { actions } = useAnimations(animations, group);
    const { colors, activeColor, woodColors, activeWoodColor } = useStateStore();

    useEffect(() => {
        for (const key in actions) {
            if (actions.hasOwnProperty(key)) {
                actions[key].play();
                actions[key].clampWhenFinished = true;
                actions[key].loop = THREE.LoopOnce;
            }
        }
    }, [actions]);

    const blackWood = useTexture({
        map: `/textures/wood/${woodColors[0].src}/diff.jpg`,
        aoMap: `/textures/wood/${woodColors[0].src}/arm.jpg`,
        metalnessMap: `/textures/wood/${woodColors[0].src}/arm.jpg`,
    });

    const whiteWood = useTexture({
        map: `/textures/wood/${woodColors[1].src}/diff.jpg`,
        aoMap: `/textures/wood/${woodColors[1].src}/arm.jpg`,
        metalnessMap: `/textures/wood/${woodColors[1].src}/arm.jpg`,
    });

    whiteWood.map.colorSpace = THREE.SRGBColorSpace;
    blackWood.map.colorSpace = THREE.SRGBColorSpace;

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: colors.filter(color => color.name === activeColor)[0].hex,
        metalness: 0.8,
        roughness: 0.45,
        envMapIntensity: 2.0,
    });

    useEffect(() => {
        applyProps(bodyMaterial, { color: colors.filter(color => color.name === activeColor)[0].hex });
    }, [activeColor])

    useLayoutEffect(() => {
        applyProps(materials.floor_roof, { color: 0xffffffff, toneMapping: false, transparent: true, side: THREE.DoubleSide });
        woodColors.filter(color => color.name === activeWoodColor)[0].name === "black" ?
            applyProps(materials.floor_roof, { ...blackWood }) :
            applyProps(materials.floor_roof, { ...whiteWood });
        applyProps(materials.Rubber_Rough_001_Black_50cm, { color: "black", metalness: 0.2, roughness: 0.9 });
    }, [activeColor, materials, nodes, activeWoodColor]);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <mesh name="walktop001" geometry={nodes.walktop001.geometry} material={materials.floor_roof} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop002" geometry={nodes.walktop002.geometry} material={materials.C_Gun_Metal_03} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop003" geometry={nodes.walktop003.geometry} material={materials.metal} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop005" geometry={nodes.walktop005.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop007" geometry={nodes.walktop007.geometry} material={materials.C_Iron_Corroded_Stained} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop008" geometry={nodes.walktop008.geometry} material={materials.Speckled_Plastic_01} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop010" geometry={nodes.walktop010.geometry} material={materials.Rubber_Grip_01_1} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop011" geometry={nodes.walktop011.geometry} material={materials.Iron_Cast_01} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                {/* <mesh name="walktop013" geometry={nodes.walktop013.geometry} material={materials.Neon_Red} rotation={[Math.PI / 2, 0, 0]} scale={0.21} /> */}
                <mesh name="walktop021" geometry={nodes.walktop021.geometry} material={materials.Paper_Speaker} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop022" geometry={nodes.walktop022.geometry} material={materials['default']} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop032" geometry={nodes.walktop032.geometry} material={materials.Iron_01_1} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop033" geometry={nodes.walktop033.geometry} material={materials.C_Iron_Corroded_Stained_1} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop034" geometry={nodes.walktop034.geometry} material={materials.jack} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop041" geometry={nodes.walktop041.geometry} material={materials.D_Black_Plastic_Dull} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                {/* <mesh name="walktop042" geometry={nodes.walktop042.geometry} material={materials.Neon_Orange} rotation={[Math.PI / 2, 0, 0]} scale={0.21} /> */}
                <mesh name="walktop043" geometry={nodes.walktop043.geometry} rotation={[Math.PI / 2, 0, 0]} scale={0.21} >
                    <meshStandardMaterial {...materials.D_Tinted_Glass} emissive={'red'} emissiveIntensity={100} />
                </mesh>

                <mesh name="walktop045" geometry={nodes.walktop045.geometry} material={materials.Plastic_01_1} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop046" geometry={nodes.walktop046.geometry} material={materials.Rubber_Rough_001_Black_50cm} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop047" geometry={nodes.walktop047.geometry} material={materials.D_Grey_Plastic_Aged} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop050" geometry={nodes.walktop050.geometry} material={materials.M_Solar_Cell} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop051" geometry={nodes.walktop051.geometry} material={materials.speaker_side} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop053" geometry={nodes.walktop053.geometry} material={materials.fan} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop054" geometry={nodes.walktop054.geometry} material={materials['Material.001']} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop062" geometry={nodes.walktop062.geometry} material={materials.D_Bumpy_Plastic} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop063" geometry={nodes.walktop063.geometry} material={materials.D_Bumpy_Plastic_1} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <mesh name="walktop064" geometry={nodes.walktop064.geometry} material={materials.D_Bumpy_Plastic_2} rotation={[Math.PI / 2, 0, 0]} scale={0.21} />
                <group name="walktop068" position={[-0.045, 5.613, 3.593]} rotation={[2.804, 0, 0]} scale={0.21}>
                    <mesh name="walktop068_1" geometry={nodes.walktop068_1.geometry} material={bodyMaterial} />
                    <mesh name="walktop068_2" geometry={nodes.walktop068_2.geometry} material={materials.metal} />
                    <mesh name="walktop068_3" geometry={nodes.walktop068_3.geometry} material={materials.C_Iron_Corroded_Stained} />
                </group>
                <group name="walktop069" position={[-0.021, 0.851, 3.739]} rotation={[-0.326, 0, 0]} scale={0.21}>
                    <mesh name="walktop071" geometry={nodes.walktop071.geometry} material={bodyMaterial} />
                    <mesh name="walktop071_1" geometry={nodes.walktop071_1.geometry} material={materials.floor_roof} />
                    <mesh name="walktop071_2" geometry={nodes.walktop071_2.geometry} material={materials.metal} />
                    <mesh name="walktop071_3" geometry={nodes.walktop071_3.geometry} material={materials.metal} />
                    <mesh name="walktop071_4" geometry={nodes.walktop071_4.geometry} material={materials.metal} />
                    <mesh name="walktop071_5" geometry={nodes.walktop071_5.geometry} material={materials.metal} />
                </group>
                <mesh name="walktop036" geometry={nodes.walktop036.geometry} material={materials.C_Gun_Metal_03} position={[-2.05, 2.429, 1.231]} rotation={[Math.PI / 2, 0, 1.567]} scale={0.21} />
                <group name="walktop038" position={[2.072, 2.841, -1.466]} rotation={[Math.PI / 2, 0, 1.572]} scale={0.21}>
                    <mesh name="walktop076" geometry={nodes.walktop076.geometry} material={materials.C_Gun_Metal_03} />
                    <mesh name="walktop076_1" geometry={nodes.walktop076_1.geometry} material={materials.Iron_Cast_01_1} />
                    <mesh name="walktop076_2" geometry={nodes.walktop076_2.geometry} material={materials.Starry_Night_Paracord} />
                    <mesh name="walktop076_3" geometry={nodes.walktop076_3.geometry} material={materials.logo2_2} />
                    <mesh name="walktop076_4" geometry={nodes.walktop076_4.geometry} material={materials.C_Aluminum_Damaged} />
                    <mesh name="walktop076_5" geometry={nodes.walktop076_5.geometry} material={materials.Dark_Specks_Paracord} />
                </group>
                <group name="walktop016" position={[1.95, 2.84, 1.231]} rotation={[Math.PI / 2, 0, -1.525]} scale={0.21}>
                    <mesh name="walktop082" geometry={nodes.walktop082.geometry} material={materials.C_Gun_Metal_03} />
                    <mesh name="walktop082_1" geometry={nodes.walktop082_1.geometry} material={materials.C_Aluminum_Damaged} />
                    <mesh name="walktop082_2" geometry={nodes.walktop082_2.geometry} material={materials.Iron_Cast_01_1} />
                    <mesh name="walktop082_3" geometry={nodes.walktop082_3.geometry} material={materials.Rubber_Grip_01_2} />
                    <mesh name="walktop082_4" geometry={nodes.walktop082_4.geometry} material={materials.Dark_Specks_Paracord} />
                    <mesh name="walktop082_5" geometry={nodes.walktop082_5.geometry} material={materials.logo2_2} />
                </group>
                <mesh name="walktop017" geometry={nodes.walktop017.geometry} material={materials.C_Gun_Metal_03} position={[-2.03, 2.443, -1.469]} rotation={[Math.PI / 2, 0, -1.563]} scale={0.21} />
                <group name="walktop018" position={[-2.177, 5.634, 0]} rotation={[Math.PI / 2, 1.397, 0]} scale={0.21}>
                    <mesh name="walktop084" geometry={nodes.walktop084.geometry} material={bodyMaterial} />
                    <mesh name="walktop084_1" geometry={nodes.walktop084_1.geometry} material={materials.metal} />
                    <mesh name="walktop084_2" geometry={nodes.walktop084_2.geometry} material={materials.metal} />
                    <mesh name="walktop084_3" geometry={nodes.walktop084_3.geometry} material={materials.metal} />
                </group>
                <group name="walktop019" position={[2.15, 5.634, 0]} rotation={[Math.PI / 2, -1.358, 0]} scale={0.21}>
                    <mesh name="walktop085" geometry={nodes.walktop085.geometry} material={bodyMaterial} />
                    <mesh name="walktop085_1" geometry={nodes.walktop085_1.geometry} material={materials.metal} />
                    <mesh name="walktop085_2" geometry={nodes.walktop085_2.geometry} material={materials.metal} />
                    <mesh name="walktop085_3" geometry={nodes.walktop085_3.geometry} material={materials.metal} />
                </group>
                <mesh name="walktop020" geometry={nodes.walktop020.geometry} material={materials.C_Gun_Metal_03} position={[-2.03, 4.751, -1.469]} rotation={[Math.PI / 2, 0, -1.563]} scale={0.21} />
                <mesh name="walktop039" geometry={nodes.walktop039.geometry} material={materials.C_Gun_Metal_03} position={[-2.05, 4.799, 1.231]} rotation={[Math.PI / 2, 0, 1.567]} scale={0.21} />
                <mesh name="walktop048" geometry={nodes.walktop048.geometry} material={materials.C_Gun_Metal_03} position={[1.95, 5.015, 1.231]} rotation={[Math.PI / 2, 0, -1.525]} scale={0.21} />
                <mesh name="walktop065" geometry={nodes.walktop065.geometry} material={materials.C_Gun_Metal_03} position={[2.072, 5.011, -1.466]} rotation={[Math.PI / 2, 0, 1.572]} scale={0.21} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/trailer-transformed.glb')
