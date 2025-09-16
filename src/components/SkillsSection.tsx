import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerScrollTrigger } from "../utils/gsapUtils";

registerScrollTrigger();

interface Skill {
  name: string;
  percentage: number;
  color?: string;
}

const frontendSkills: Skill[] = [
  { name: "HTML & CSS", percentage: 95 },
  { name: "JavaScript", percentage: 90 },
  { name: "React", percentage: 85 },
  { name: "TypeScript", percentage: 80 },
  { name: "Tailwind CSS", percentage: 85 },
];

const backendSkills: Skill[] = [
  { name: "Node.js", percentage: 80 },
  { name: "Express", percentage: 75 },
  { name: "MySQL", percentage: 70 },
  { name: "SQLITE3", percentage: 65 },
  { name: "LARAVEL", percentage: 75 },
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;
    
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${skill.percentage}%`,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, [skill.percentage]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm font-semibold text-light-accent1 dark:text-dark-accent1">
          {skill.percentage}%
        </span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="skill-bar h-full"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section bg-white dark:bg-[#1A1A1A] py-20"
    >
      <div className="container mx-auto">
        <h2 className="animate-title text-3xl md:text-4xl font-bold mb-3 text-center">
          <span className="title-gradient">ជំនាញរបស់ខ្ញុំ</span>
        </h2>
        <div className="w-20 h-1.5 bg-light-accent2 dark:bg-dark-accent2 mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-item">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <span className="w-8 h-8 bg-light-accent1 dark:bg-dark-accent1 rounded-full flex items-center justify-center text-white mr-3">
                1
              </span>
              ជំនាញ Frontend
            </h3>
            {frontendSkills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="animate-item">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <span className="w-8 h-8 bg-light-accent2 dark:bg-dark-accent2 rounded-full flex items-center justify-center text-white mr-3">
                2
              </span>
              ជំនាញ Backend
            </h3>
            {backendSkills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div className="mt-20 animate-item">
          <h3 className="text-2xl font-semibold mb-8 text-center">ជំនាញទូទៅផ្សេងទៀត</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Git", "Docker", "UI/UX Design", "Responsive Design", "Performance Optimization", "SEO", "Testing", "CI/CD"].map((skill) => (
              <span
                key={skill}
                className="px-5 py-3 bg-gray-100 dark:bg-[#2D2D2D] rounded-lg text-gray-800 dark:text-gray-200 font-medium transition-transform hover:scale-105 hover:shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
