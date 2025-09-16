import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger, registerScrollTrigger } from "../utils/gsapUtils";

registerScrollTrigger();

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "សុខ ចាន់ដា",
    position: "នាយកគ្រប់គ្រង",
    company: "AcmeTech",
    image: "/assets/សុខ ចាន់ដា.jpg",
    text: "ការងាររបស់ ឡាយ សុខជា គឺអស្ចារ្យណាស់! គាត់មិនត្រឹមតែបង្កើតគេហទំព័រដែលមើលទៅស្អាតប៉ុណ្ណោះទេ តែថែមទាំងងាយស្រួលប្រើទៀតផង។ ខ្ញុំពិតជាមានការកោតសរសើរចំពោះគាត់ខ្លាំងណាស់។",
  },
  {
    id: 2,
    name: "ប៊ុន សុភីរិទ្ធ",
    position: "ប្រធានផ្នែកព័ត៌មានវិទ្យា",
    company: "GlobalTech",
    image: "/assets/ប៊ុន សុភីរិទ.jpg",
    text: "ខ្ញុំបានធ្វើការជាមួយ ឡាយ សុខជា លើគម្រោងជាច្រើន ហើយគាត់តែងតែបង្ហាញភាពឆ្នើមប្រសើរ។ គាត់បានរចនាគេហទំព័ររបស់យើងឡើងវិញ ហើយលទ្ធផលគឺអស្ចារ្យទាំងស្រុង។",
  },
  {
    id: 3,
    name: "សោភ័ណ មករា",
    position: "ម្ចាស់អាជីវកម្ម",
    company: "CreativeSolutions",
    image: "/assets/សោភ័ណ មករា.jpg",
    text: "ខ្ញុំពិតជាសប្បាយចិត្តដែលបានជ្រើសរើស ឡាយ សុខជា សម្រាប់គម្រោងរបស់យើង។ គាត់មានភាពវិជ្ជាជីវៈ និងងាយស្រួលក្នុងការធ្វើការជាមួយ។ លទ្ធផលដែលបានមកគឺលើសពីការរំពឹងទុករបស់ខ្ញុំ។",
  },
  {
    id: 4,
    name: "សុគន្ធ វិសាល",
    position: "នាយកប្រតិបត្តិ",
    company: "TechInnovate",
    image: "/assets/សុគន្ធ វិសាល.jpg",
    text: "កិច្ចសហការរបស់យើងជាមួយ ឡាយ សុខជា គឺលើសពីការរំពឹងទុក។ គាត់មិនត្រឹមតែជាអ្នកបច្ចេកទេសដែលមានជំនាញប៉ុណ្ណោះទេ តែថែមទាំងជាអ្នកដែលមានស្មារតីច្នៃប្រឌិតខ្ពស់ទៀតផង។",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxVisibleItems = 3;
  const autoplayInterval = 5000;

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

      gsap.fromTo(
        ".testimonial-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonial-container",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - maxVisibleItems ? 0 : prevIndex + 1
      );
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - maxVisibleItems : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - maxVisibleItems ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section bg-white dark:bg-[#1A1A1A] py-20"
    >
      <div className="container mx-auto">
        <h2 className="section-title text-3xl md:text-4xl font-bold mb-3 text-center">
          <span className="title-gradient">ការវាយតម្លៃរបស់អតិថិជន</span>
        </h2>
        <div className="w-20 h-1.5 bg-light-accent2 dark:bg-dark-accent2 mx-auto mb-16 rounded-full"></div>

        <div className="testimonial-container relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  activeIndex * (100 / maxVisibleItems)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial-card w-full md:w-1/3 min-w-full md:min-w-[33.333%] px-4"
                >
                  <div className="bg-gray-50 dark:bg-[#2D2D2D] rounded-xl p-6 shadow-md h-full flex flex-col">
                    <div className="mb-4 flex-grow">
                      <svg
                        className="w-8 h-8 text-light-accent1 dark:text-dark-accent1 mb-4 opacity-50"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {testimonial.text}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: testimonials.length - maxVisibleItems + 1,
            }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === index
                    ? "bg-light-accent1 dark:bg-dark-accent1"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 md:translate-x-0 w-10 h-10 rounded-full bg-white dark:bg-[#333] shadow-md flex items-center justify-center z-10 hover:bg-gray-100 dark:hover:bg-[#444] transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 md:translate-x-0 w-10 h-10 rounded-full bg-white dark:bg-[#333] shadow-md flex items-center justify-center z-10 hover:bg-gray-100 dark:hover:bg-[#444] transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
