
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerScrollTrigger } from "./gsapUtils";

// Register ScrollTrigger plugin if available
registerScrollTrigger();

export const useScrollAnimation = (
  selector: string,
  options: { y?: number; x?: number; opacity?: number; duration?: number; stagger?: number; delay?: number } = {}
) => {
  const { y = 50, x = 0, opacity = 0, duration = 1, stagger = 0.2, delay = 0 } = options;
  const ref = useRef(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;
    
    const element = ref.current;
    
    if (element) {
      const items = gsap.utils.toArray(`${selector}`);

      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity, y, x },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, [selector, y, x, opacity, duration, stagger, delay]);

  return ref;
};

export const useSectionAnimation = (sectionRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;
    
    if (sectionRef.current) {
      const titles = sectionRef.current.querySelectorAll(".animate-title");
      const items = sectionRef.current.querySelectorAll(".animate-item");
      
      gsap.fromTo(
        titles,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, [sectionRef]);
};
