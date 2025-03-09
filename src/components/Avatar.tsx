'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    // Scene resources for cleanup
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let mixer: THREE.AnimationMixer;
    let animationFrameId: number;

    const loadModel = () => {
      const loader = new GLTFLoader();
      let object: THREE.Group | null = null; // Store the loaded model reference

      loader.load(
        '/hemanth_model.glb',
        (gltf) => {
          object = gltf.scene;
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

      // Return a cleanup function
      return () => {
        if (object) {
          object.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material) => material.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          });
        }
      };
    };

    const setupScene = (gltf: GLTF) => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 1.5, 3);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.target = new THREE.Vector3(0, 0.75, 0);
      controls.update();

      scene = new THREE.Scene();
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
      mixer = new THREE.AnimationMixer(avatar);
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
        animationFrameId = requestAnimationFrame(animateMixer);
        mixer.update(clock.getDelta());
        controls.update(); // Update controls in animation loop
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

      // Handle window resize
      const handleResize = () => {
        if (!container) return;

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('resize', handleResize);

      // Return cleanup function to be called when component unmounts
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('resize', handleResize);

        // Cancel animation frame
        cancelAnimationFrame(animationFrameId);

        // Dispose THREE.js resources
        controls.dispose();
        renderer.dispose();

        // Dispose geometries and materials
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();

            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) =>
                  disposeMaterial(material)
                );
              } else {
                disposeMaterial(object.material);
              }
            }
          }
        });
      };
    };

    // Helper to dispose material resources
    const disposeMaterial = (material: THREE.Material) => {
      material.dispose();

      function isTexture(value: any): value is THREE.Texture {
        return value && typeof value.dispose === 'function';
      }

      if ('map' in material && isTexture(material.map)) material.map.dispose();
      if ('normalMap' in material && isTexture(material.normalMap))
        material.normalMap.dispose();
      if ('specularMap' in material && isTexture(material.specularMap))
        material.specularMap.dispose();

      if ('envMap' in material && isTexture(material.envMap))
        material.envMap.dispose();
    };

    // Start loading the model
    const cleanup = loadModel();

    // Return main cleanup function
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
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
        Click Me for Resume
      </div>
    </div>
  );
}
