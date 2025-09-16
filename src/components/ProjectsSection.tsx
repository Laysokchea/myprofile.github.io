import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger, registerScrollTrigger } from "../utils/gsapUtils";

registerScrollTrigger();

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "គេហទំព័រលក់ទំនិញតាមអនឡាញ",
    description: "គេហទំព័រលក់ទំនិញតាមអនឡាញដែលបង្កើតឡើងជាមួយ React, Node.js និង MongoDB។ វាមានមុខងារជាច្រើនដូចជា ការស្វែងរក ការបញ្ជាទិញ និងការបង់ប្រាក់។",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    link: "#",
  },
  {
    id: 2,
    title: "កម្មវិធីគ្រប់គ្រងការងារ",
    description: "កម្មវិធីគ្រប់គ្រងការងារដែលមានលក្ខណៈពិសេសដូចជា ការបង្កើតភារកិច្ច ការចែករំលែកជាមួយក្រុម និងការជូនដំណឹង។",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Vuex"],
    link: "#",
  },
  {
    id: 3,
    title: "កម្មវិធីកំសាន្ត",
    description: "កម្មវិធីកំសាន្តដែលមានភាពទាន់សម័យ មានលក្ខណៈពិសេសដូចជា ការលេងតន្ត្រី ការទាញយកវីដេអូ និងជជែកជាក្រុម។",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    technologies: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB"],
    link: "#",
  },
  {
    id: 4,
    title: "កម្មវិធីព័ត៌មាន",
    description: "កម្មវិធីព័ត៌មានដែលបង្ហាញពីព័ត៌មានថ្មីៗ អត្ថបទ និងវីដេអូ។ វាមានមុខងារស្វែងរក និងចែករំលែកលើបណ្តាញសង្គម។",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
    technologies: ["Next.js", "GraphQL", "Apollo", "Prisma", "PostgreSQL"],
    link: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;
    
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-2 py-1 bg-light-accent1/70 dark:bg-dark-accent1/70 text-white rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs font-medium px-2 py-1 bg-gray-700/50 text-white rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 bg-white dark:bg-[#2D2D2D]">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>
        <a
          href={project.link}
          className="inline-flex items-center text-light-accent1 dark:text-dark-accent1 font-medium hover:underline"
        >
          មើលព័ត៌មានលម្អិត
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;
    
    if (sectionRef.current) {
      gsap.fromTo(
        ".section-title",
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
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section bg-gray-50 dark:bg-[#222] py-20"
    >
      <div className="container mx-auto">
        <h2 className="section-title text-3xl md:text-4xl font-bold mb-3 text-center">
          <span className="title-gradient">គម្រោងរបស់ខ្ញុំ</span>
        </h2>
        <div className="w-20 h-1.5 bg-light-accent2 dark:bg-dark-accent2 mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="button-primary inline-flex items-center"
          >
            មើលគម្រោងទាំងអស់
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
