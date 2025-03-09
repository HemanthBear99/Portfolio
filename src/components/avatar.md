'use client';

import { useEffect, useRef, useState } from 'react';
import \* as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface AvatarProps {
containerClassName?: string;
}

export default function Avatar({ containerClassName = '' }: AvatarProps) {
const containerRef = useRef<HTMLDivElement>(null);
const loadingRef = useRef<HTMLDivElement>(null);
const hoverTextRef = useRef<HTMLDivElement>(null);
const [modelLoaded, setModelLoaded] = useState(false);

useEffect(() => {
if (!containerRef.current || modelLoaded) return;

    const container = containerRef.current;

    const loadModel = () => {
      const loader = new GLTFLoader();
      loader.load(
        '/hemanth_model.glb',
        (gltf) => {
          setupScene(gltf);
          setModelLoaded(true);
          if (loadingRef.current) loadingRef.current.style.display = 'none';
        },
        (xhr) => {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          if (loadingRef.current)
            loadingRef.current.innerText = `Loading...${percent}%`;
        },
        (error) => console.error('Error loading 3D model:', error)
      );
    };

    const setupScene = (gltf: any) => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0.5, 3);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.target = new THREE.Vector3(0, 0.75, 0);
      controls.update();

      const scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xffffff, 1));

      const spotlight = new THREE.SpotLight(0xffffff, 5, 8, Math.PI / 4);
      spotlight.position.set(0, 4, 2);
      spotlight.castShadow = true;
      scene.add(spotlight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2);
      keyLight.position.set(1, 1, 2);
      scene.add(keyLight);

      /** 🏛️ Add Pedestal (Ground) */
      const groundMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64),
        new THREE.MeshStandardMaterial({ color: 0x888888 })
      );
      groundMesh.receiveShadow = true;
      groundMesh.position.y -= 0.05;
      scene.add(groundMesh);

      const avatar = gltf.scene;
      avatar.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(avatar);

      /** 🎬 Animations */
      const mixer = new THREE.AnimationMixer(avatar);
      const clips = gltf.animations;

      const processedClips = clips.map((clip) =>
        THREE.AnimationClip.parse(THREE.AnimationClip.toJSON(clip))
      );

      const getAction = (name: string) => {
        const clip = THREE.AnimationClip.findByName(processedClips, name);
        if (!clip) return null;

        const action = mixer.clipAction(clip);
        action.setEffectiveTimeScale(1);
        action.setEffectiveWeight(1);
        return action;
      };

      const flipAction = getAction('flip');
      const standidleAction = getAction('standidle');
      const thankfulAction = getAction('thankful');
      const waveAction = getAction('waving');

      const actions = {
        flip: flipAction,
        standidle: standidleAction,
        thankful: thankfulAction,
        wave: waveAction,
      };

      Object.values(actions).forEach((action) => {
        if (action) {
          action.reset();
          action.play().stop();
        }
      });

      /** ✅ Initial animation sequence */
      let currentAction = flipAction;
      let flipFinished = false;

      if (flipAction) {
        flipAction.setLoop(THREE.LoopOnce, 1);
        flipAction.clampWhenFinished = true;
        flipAction.play();
      }

      /** 🎥 Smooth Animation Transition */
      const playAction = (
        newAction: THREE.AnimationAction | null,
        duration = 0.5
      ) => {
        if (!newAction || newAction === currentAction) return;
        newAction.reset();
        newAction.setEffectiveWeight(1);
        newAction.play();

        if (currentAction) {
          currentAction.crossFadeTo(newAction, duration, true);
        }

        currentAction = newAction;
      };

      /** ⏳ Animation Loop */
      const clock = new THREE.Clock();
      const animateMixer = () => {
        requestAnimationFrame(animateMixer);
        mixer.update(clock.getDelta());
        renderer.render(scene, camera);

        if (flipAction && !flipAction.isRunning() && !flipFinished) {
          playAction(standidleAction);
          flipFinished = true;
        }
      };
      animateMixer();

      /** 🎯 Mouse Events */
      const raycaster = new THREE.Raycaster();
      let isHovering = false;
      let isThankfulAction = false;

      const handleMouseMove = (ev: MouseEvent) => {
        const coords = new THREE.Vector2(
          (ev.offsetX / container.clientWidth) * 2 - 1,
          -(ev.offsetY / container.clientHeight) * 2 + 1
        );
        raycaster.setFromCamera(coords, camera);
        const intersections = raycaster.intersectObjects(avatar.children, true);

        if (intersections.length > 0) {
          if (!isHovering && !isThankfulAction) {
            isHovering = true;
            playAction(waveAction);
            if (hoverTextRef.current)
              hoverTextRef.current.style.display = 'block';
          }
        } else {
          if (isHovering && !isThankfulAction) {
            isHovering = false;
            playAction(standidleAction);
            if (hoverTextRef.current)
              hoverTextRef.current.style.display = 'none';
          }
        }
      };

      const handleMouseDown = () => {
        if (!isThankfulAction) {
          isThankfulAction = true;
          isHovering = false;
          playAction(thankfulAction);
          if (hoverTextRef.current) hoverTextRef.current.style.display = 'none';

          setTimeout(() => {
            playAction(standidleAction);
            isThankfulAction = false;
          }, 4000);

          /** 📄 Trigger Resume Download */
          const link = document.createElement('a');
          link.href = '/Hemanth_Resume.pdf';
          link.download = 'Hemanth_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mousedown', handleMouseDown);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mousedown', handleMouseDown);
        controls.dispose();
        renderer.dispose();
      };
    };

    loadModel();

}, [modelLoaded]);

return (
<div className={`${containerClassName} max-w-xs max-h-xs relative`}>
<div ref={containerRef} className="w-full h-full relative"></div>
<div
        ref={loadingRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-medium animate-pulse"
      >
Loading...
</div>
<div
        ref={hoverTextRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg hidden"
      >
Click Me
</div>
</div>
);
}
