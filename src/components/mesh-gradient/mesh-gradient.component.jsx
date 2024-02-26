// import React, { useRef, useState, useEffect } from "react";
// import * as THREE from "three";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { PerspectiveCamera } from "@react-three/drei";
// // import vertex from '../../shaders/mesh-gradient/vertex.glsl';
// // import fragment from '../../shaders/mesh-gradient/fragment.glsl';

// const vertex = `
// uniform float time;
// varying vec2 vUv;
// varying vec3 vColor;
// const int MAX_COLORS = 5;
// uniform vec3 uColor[MAX_COLORS];

// //	Simplex 3D Noise
// //	by Ian McEwan, Ashima Arts
// //  https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
// //
// vec4 permute(vec4 x) {
//     return mod(((x * 34.0) + 1.0) * x, 289.0);
// }
// vec4 taylorInvSqrt(vec4 r) {
//     return 1.79284291400159 - 0.85373472095314 * r;
// }

// float snoise(vec3 v) {
//     const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
//     const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

// // First corner
//     vec3 i = floor(v + dot(v, C.yyy));
//     vec3 x0 = v - i + dot(i, C.xxx);

// // Other corners
//     vec3 g = step(x0.yzx, x0.xyz);
//     vec3 l = 1.0 - g;
//     vec3 i1 = min(g.xyz, l.zxy);
//     vec3 i2 = max(g.xyz, l.zxy);

//   //  x0 = x0 - 0. + 0.0 * C
//     vec3 x1 = x0 - i1 + 1.0 * C.xxx;
//     vec3 x2 = x0 - i2 + 2.0 * C.xxx;
//     vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// // Permutations
//     i = mod(i, 289.0);
//     vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

// // Gradients
// // ( N*N points uniformly over a square, mapped onto an octahedron.)
//     float n_ = 1.0 / 7.0; // N=7
//     vec3 ns = n_ * D.wyz - D.xzx;

//     vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,N*N)

//     vec4 x_ = floor(j * ns.z);
//     vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)

//     vec4 x = x_ * ns.x + ns.yyyy;
//     vec4 y = y_ * ns.x + ns.yyyy;
//     vec4 h = 1.0 - abs(x) - abs(y);

//     vec4 b0 = vec4(x.xy, y.xy);
//     vec4 b1 = vec4(x.zw, y.zw);

//     vec4 s0 = floor(b0) * 2.0 + 1.0;
//     vec4 s1 = floor(b1) * 2.0 + 1.0;
//     vec4 sh = -step(h, vec4(0.0));

//     vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
//     vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

//     vec3 p0 = vec3(a0.xy, h.x);
//     vec3 p1 = vec3(a0.zw, h.y);
//     vec3 p2 = vec3(a1.xy, h.z);
//     vec3 p3 = vec3(a1.zw, h.w);

// //Normalise gradients
//     vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
//     p0 *= norm.x;
//     p1 *= norm.y;
//     p2 *= norm.z;
//     p3 *= norm.w;

// // Mix final noise value
//     vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
//     m = m * m;
//     return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
// }

// // Author       : Johnny Leek
// // Inspiration  : Yuri Artiukh
// void main() {
//     // Calculate base coordinate position
//     vec2 base = uv * vec2(3., 4.);

//     // Apply slight tilt + incline
//     float tilt = -0.5 * uv.y;
//     float incline = uv.x * 0.1;

//     // Apply slight offset between -0.25 and 0.25 of the y position
//     float offset = incline * mix(-.25, 0.25, uv.y);

//     // Calculate noise based on base position
//     float noise = snoise(vec3(base.x + time * 3., base.y, time * 10.));

//     // Ignore negative noise values
//     noise = max(0., noise);

//     // Calculate final position
//     vec3 pos = vec3(position.x, position.y, position.z + noise * 0.1 + tilt + incline + offset);

//     // Set base color to the last color in our array
//     vColor = uColor[MAX_COLORS - 1];

//     // Iterate through the other colors in the array
//     for(int i = 0; i < MAX_COLORS - 1; i++) {
//         // Calculate some more noise values to use for the color
//         float flow = 5. + float(i) * 0.3;
//         float speed = 8. + float(i) * 0.3;
//         float seed = 1. + float(i) * 4.;

//         vec2 frequency = vec2(0.3, 0.4);

//         // Create min and max values for our noise (based on the current color index)
//         float noiseFloor = 0.2;
//         float noiseCeil = 0.4 + float(i) * 0.07;

//         // Calculate noise
//         float noise = smoothstep(noiseFloor, noiseCeil, snoise(vec3(base.x * frequency.x + time * flow, base.y * frequency.y, time * speed + seed)));

//         // Mix the color with the base color based on our noise
//         vColor = mix(vColor, uColor[i], noise);
//     }

//     // Set the new uV and position of the vertex
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }
// `;

// const fragment = `
// varying vec3 vColor;
// void main() {
//     gl_FragColor = vec4(vColor, 1.0);
// }
// `;

// const MeshGradient = ({
//   colors,
//   wireframe = false,
//   speed = 0.01,
//   backgroundColor = "#FFFFFF",
//   backgroundOpacity = 1.0,
//   onGradientClick,
//   onGradientContextMenu,
//   onGradientDoubleClick,
//   onGradientWheel,
//   onGradientPointerUp,
//   onGradientPointerDown,
//   onGradientPointerOver,
//   onGradientPointerOut,
//   onGradientPointerEnter,
//   onGradientPointerLeave,
//   onGradientPointerMove,
//   onGradientPropsUpdate,
// }) => {
//   // Store a ref to the mesh and shader material
//   const meshRef = useRef(null);
//   const shaderRef = useRef(null);

//   // Access the Three renderer so that we can modify its properties on initialization
//   const renderer = useThree((state) => state.gl);

//   // Store the time in state so that we can pass it to the shader
//   const [time, setTime] = useState(0);

//   // Map hex colors to Three.Color objects
//   const colorPalette = colors.map((color) => new THREE.Color(color));

//   // When the component is rendered, set the Three.JS renderer properties
//   useEffect(() => {
//     // Renderer settings
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setClearColor(backgroundColor, backgroundOpacity);
//     //renderer.useLegacyLights = true;
//     renderer.LinearEncoding = THREE.SRGBColorSpace;

//     return () => renderer.dispose();
//   });

//   // Every frame, update the time with the current speed, multiplied by the delta time (to ensure a consistent rate across all devices)
//   useFrame((_, delta) => setTime(time + speed * delta));

//   /**
//    * Render a mesh at the origin.
//    *
//    * The ShaderMaterial handles the gradient. It contains 2 uniforms:
//    * - time: The time passed since the component was rendered
//    * - colorPalette: The array of colors to be used in the gradient
//    *
//    * These are passed to the vertex and fragment shaders, which are defined in ../shaders/[fragment / vertex].glsl
//    */

//   return (
//     <mesh
//       ref={meshRef}
//       position={new THREE.Vector3(0, 0, 0)}
//       onClick={onGradientClick ? (e) => onGradientClick(e) : undefined}
//       onContextMenu={onGradientContextMenu ? (e) => onGradientContextMenu(e) : undefined}
//       onDoubleClick={onGradientDoubleClick ? (e) => onGradientDoubleClick(e) : undefined}
//       onWheel={onGradientWheel ? (e) => onGradientWheel(e) : undefined}
//       onPointerUp={onGradientPointerUp ? (e) => onGradientPointerUp(e) : undefined}
//       onPointerDown={onGradientPointerDown ? (e) => onGradientPointerDown(e) : undefined}
//       onPointerOver={onGradientPointerOver ? (e) => onGradientPointerOver(e) : undefined}
//       onPointerOut={onGradientPointerOut ? (e) => onGradientPointerOut(e) : undefined}
//       onPointerEnter={onGradientPointerEnter ? (e) => onGradientPointerEnter(e) : undefined}
//       onPointerLeave={onGradientPointerLeave ? (e) => onGradientPointerLeave(e) : undefined}
//       onPointerMove={onGradientPointerMove ? (e) => onGradientPointerMove(e) : undefined}
//       onUpdate={onGradientPropsUpdate ? (e) => onGradientPropsUpdate(e) : undefined}
//     >
//       <planeGeometry args={[1, 1, 500, 500]} />
//       <shaderMaterial
//         extensions={{
//           derivatives: true,
//           fragDepth: false,
//           drawBuffers: false,
//           shaderTextureLOD: false,
//         }}
//         ref={shaderRef}
//         side={THREE.DoubleSide}
//         uniforms={{
//           time: { value: time },
//           uColor: { value: colorPalette },
//         }}
//         wireframe={wireframe}
//         vertexShader={vertex}
//         fragmentShader={fragment}
//         key={Math.random()}
//       />
//     </mesh>
//   );
// };

// const MeshGradientRenderer = ({
//   width,
//   height,
//   colors,
//   wireframe,
//   speed,
//   backgroundColor,
//   backgroundOpacity,
//   onGradientClick,
//   onGradientContextMenu,
//   onGradientDoubleClick,
//   onGradientWheel,
//   onGradientPointerUp,
//   onGradientPointerDown,
//   onGradientPointerOver,
//   onGradientPointerOut,
//   onGradientPointerEnter,
//   onGradientPointerLeave,
//   onGradientPointerMove,
//   onGradientPropsUpdate,
//   style,
//   children,
//   ...containerProps
// }) => {
//   return (
//     <>
//       <div style={{ position: "absolute", zIndex: -1, ...style }} {...containerProps}>
//         <Canvas>
//           <PerspectiveCamera makeDefault manual position={new THREE.Vector3(0, 0, 0.5)} near={0.001} far={1000} />
//           <MeshGradient
//             colors={colors}
//             wireframe={wireframe}
//             speed={speed}
//             backgroundColor={backgroundColor}
//             backgroundOpacity={backgroundOpacity}
//             onGradientClick={onGradientClick}
//             onGradientContextMenu={onGradientContextMenu}
//             onGradientDoubleClick={onGradientDoubleClick}
//             onGradientWheel={onGradientWheel}
//             onGradientPointerUp={onGradientPointerUp}
//             onGradientPointerDown={onGradientPointerDown}
//             onGradientPointerOver={onGradientPointerOver}
//             onGradientPointerOut={onGradientPointerOut}
//             onGradientPointerEnter={onGradientPointerEnter}
//             onGradientPointerLeave={onGradientPointerLeave}
//             onGradientPointerMove={onGradientPointerMove}
//             onGradientPropsUpdate={onGradientPropsUpdate}
//           />
//         </Canvas>
//       </div>
//       {children}
//     </>
//   );
// };

// export default MeshGradientRenderer;

