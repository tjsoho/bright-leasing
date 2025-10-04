"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface HighwayBGProps {
    className?: string;
}

const HighwayBG = ({ className = "" }: HighwayBGProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const animationRef = useRef<number>();

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Highway geometry
        const roadGeometry = new THREE.PlaneGeometry(20, 100);
        const roadMaterial = new THREE.MeshBasicMaterial({
            color: 0x121717, // brand-black
            transparent: true,
            opacity: 0.9
        });
        const road = new THREE.Mesh(roadGeometry, roadMaterial);
        road.rotation.x = -Math.PI / 2;
        road.position.y = -2;
        scene.add(road);

        // Lane lines
        const lineGeometry = new THREE.PlaneGeometry(0.1, 100);
        const lineMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFBD34, // brand-yellow
            transparent: true,
            opacity: 0.8
        });

        // Create lane lines
        for (let i = -2; i <= 2; i += 1) {
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.rotation.x = -Math.PI / 2;
            line.position.set(i, -1.9, 0);
            scene.add(line);
        }

        // Moving particles for speed effect
        const particles: THREE.Mesh[] = [];
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0x52BAC7, // brand-teal
            transparent: true,
            opacity: 0.6
        });

        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 20,
                Math.random() * 100 - 50,
                Math.random() * 10 - 5
            );
            scene.add(particle);
            particles.push(particle);
        }

        // Animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);

            // Move particles
            particles.forEach(particle => {
                particle.position.y -= 0.5;
                if (particle.position.y < -50) {
                    particle.position.y = 50;
                }
            });

            // Move road
            road.position.z -= 0.5;
            if (road.position.z < -50) {
                road.position.z = 50;
            }

            // Move lane lines
            scene.children.forEach(child => {
                if (child instanceof THREE.Mesh && child.geometry === lineGeometry) {
                    child.position.z -= 0.5;
                    if (child.position.z < -50) {
                        child.position.z = 50;
                    }
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 w-full h-full ${className}`}
            style={{ zIndex: -1 }}
        />
    );
};

export default HighwayBG;

