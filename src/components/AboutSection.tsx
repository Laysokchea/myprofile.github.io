import { useEffect, useRef } from "react";
import { useSectionAnimation } from "../utils/animation";
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionAnimation(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section bg-gray-50 dark:bg-[#222] py-20"
    >
      <div className="container mx-auto">
        <h2 className="animate-title text-3xl md:text-4xl font-bold mb-3 text-center">
          <span className="title-gradient">អំពីខ្ញុំ</span>
        </h2>
        <div className="w-20 h-1.5 bg-light-accent2 dark:bg-dark-accent2 mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-item order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">
              អ្នកអភិវឌ្ឍន៍គេហទំព័រដែលមានចំណង់ចំណូលចិត្តក្នុងការបង្កើតបទពិសោធន៍ឌីជីថល
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              ជម្រាបសួរ! ខ្ញុំគឺ ឡាយ​ សុខជា
              ជាអ្នកអភិវឌ្ឍន៍គេហទំព័រដែលមានបទពិសោធន៍ជាង ១៣
              ឆ្នាំក្នុងការបង្កើតគេហទំព័រដែលមានគុណភាពខ្ពស់។
              ខ្ញុំមានចំណង់ចំណូលចិត្តក្នុងការប្រើប្រាស់បច្ចេកវិទ្យាថ្មីៗ
              ដើម្បីបង្កើតបទពិសោធន៍អ្នកប្រើប្រាស់ដែលគួរឱ្យចាប់អារម្មណ៍។
            </p>
            <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              ជាមួយនឹងជំនាញក្នុងការអភិវឌ្ឍគេហទំព័រពេញលេញ
              ខ្ញុំមានបទពិសោធន៍ជាមួយបច្ចេកវិទ្យាដូចជា React, TypeScript,
              Node.js, និង បណ្ដុំឧបករណ៍ផ្សេងៗទៀត។
              ខ្ញុំប្ដេជ្ញាបង្កើតគម្រោងដែលមិនត្រឹមតែស្អាតប៉ុណ្ណោះទេ
              តែថែមទាំងប្រកបដោយគុណភាព ល្បឿនលឿន និងអាចពង្រីកបានទៀតផង។
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 bg-light-accent1/10 dark:bg-dark-accent1/10 text-light-accent1 dark:text-dark-accent1 rounded-full text-sm font-medium">
                Frontend
              </span>
              <span className="px-4 py-2 bg-light-accent1/10 dark:bg-dark-accent1/10 text-light-accent1 dark:text-dark-accent1 rounded-full text-sm font-medium">
                React
              </span>
              <span className="px-4 py-2 bg-light-accent1/10 dark:bg-dark-accent1/10 text-light-accent1 dark:text-dark-accent1 rounded-full text-sm font-medium">
                JavaScript
              </span>
              <span className="px-4 py-2 bg-light-accent1/10 dark:bg-dark-accent1/10 text-light-accent1 dark:text-dark-accent1 rounded-full text-sm font-medium">
                UI/UX
              </span>
            </div>
          </div>
          <div className="animate-item order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-[#333] shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-light-accent1 to-light-accent2 dark:from-dark-accent1 dark:to-dark-accent2 opacity-90"></div>

              <img
                src="/assets/developer.jpg"
                alt="អ្នកអភិវឌ្ឍន៍"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
