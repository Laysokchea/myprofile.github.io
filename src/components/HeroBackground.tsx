import { useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// Access Three.js from window since it's loaded via CDN
declare global {
  interface Window {
    THREE: any;
  }
}

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current || !window.THREE) return;
    
    const THREE = window.THREE;
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const positionArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    const getPrimaryColor = () => {
      if (theme === 'dark') {
        return { r: 255/255, g: 46/255, b: 99/255 }; // #FF2E63
      } else {
        return { r: 255/255, g: 107/255, b: 107/255 }; // #FF6B6B
      }
    };
    
    const getSecondaryColor = () => {
      if (theme === 'dark') {
        return { r: 0/255, g: 255/255, b: 245/255 }; // #00FFF5
      } else {
        return { r: 78/255, g: 205/255, b: 196/255 }; // #4ECDC4
      }
    };
    
    const primaryColor = getPrimaryColor();
    const secondaryColor = getSecondaryColor();
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 5; // x
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 5; // y
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 3; // z
      
      // Color
      const ratio = Math.random();
      colorArray[i * 3] = primaryColor.r * ratio + secondaryColor.r * (1 - ratio);
      colorArray[i * 3 + 1] = primaryColor.g * ratio + secondaryColor.g * (1 - ratio);
      colorArray[i * 3 + 2] = primaryColor.b * ratio + secondaryColor.b * (1 - ratio);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    camera.position.z = 2;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = width / 2;
    const windowHalfY = height / 2;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };
    
    const onDocumentTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        mouseX = (event.touches[0].pageX - windowHalfX) / 100;
        mouseY = (event.touches[0].pageY - windowHalfY) / 100;
      }
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchstart', onDocumentTouchStart);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      
      particles.rotation.x += (mouseY * 0.0005 - particles.rotation.x) * 0.05;
      particles.rotation.y += (mouseX * 0.0005 - particles.rotation.y) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchstart', onDocumentTouchStart);
      
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);
  
  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

export default HeroBackground;
