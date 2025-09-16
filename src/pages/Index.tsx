
import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

// Access GSAP from window since it's loaded via CDN
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const Index = () => {
  useEffect(() => {
    // Set up smooth scrolling
    const setupScrollAnimation = () => {
      const sections = document.querySelectorAll(".animate-on-scroll");
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
      
      sections.forEach((section) => {
        observer.observe(section);
      });
      
      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    };
    
    setupScrollAnimation();
    
    // Clean up animations on unmount if ScrollTrigger is available
    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);
  
  return (
    <ThemeProvider>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </ThemeProvider>
  );
};

export default Index;
