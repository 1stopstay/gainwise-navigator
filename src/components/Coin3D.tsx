import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Coin3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Create coin geometry
    const geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00FFAB,
      specular: 0x00FF73,
      shininess: 100,
    });
    const coin = new THREE.Mesh(geometry, material);
    scene.add(coin);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      coin.rotation.x += 0.01;
      coin.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-[400px] h-[400px] mx-auto" />;
}