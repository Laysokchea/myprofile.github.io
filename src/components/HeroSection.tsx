import { useRef, useEffect } from "react";
import { gsap } from "../utils/gsapUtils";
import HeroBackground from "./HeroBackground";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap) return;

    if (heroRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-greeting",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
    }
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="hero-greeting text-lg md:text-xl mb-3 md:mb-4 text-light-accent1 dark:text-dark-accent1 font-medium">
            សូមស្វាគមន៍មកកាន់ពិភពរបស់ខ្ញុំ
          </p>
          <h1 className="hero-name text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            សួស្តី! ខ្ញុំគឺ <span className="title-gradient">ឡាយ សុខជា</span>
          </h1>
          <h2 className="hero-title text-2xl md:text-3xl font-medium mb-6">
            អ្នកអភិវឌ្ឍន៍គេហទំព័រដែលមានចំណង់ចំណូលចិត្ត
          </h2>
          <p className="hero-description text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            ខ្ញុំជាអ្នកអភិវឌ្ឍន៍គេហទំព័រដែលមានចំណង់ចំណូលចិត្តក្នុងការបង្កើតបទពិសោធន៍ឌីជីថលដែលមានទាំងភាពទាក់ទាញ
            និងមានប្រយោជន៍
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={scrollToProjects}
              className="hero-cta button-primary animate-pulse"
            >
              មើលគម្រោងរបស់ខ្ញុំ
            </button>
            <a href="#contact" className="hero-cta button-secondary">
              ទាក់ទងខ្ញុំ
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        >
          <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
