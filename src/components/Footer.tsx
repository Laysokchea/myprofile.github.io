import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white dark:bg-[#1A1A1A] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="#" className="text-2xl font-bold title-gradient">
              LAY SOKCHEA
            </a>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
              អ្នកអភិវឌ្ឍន៍គេហទំព័រដែលមានចំណង់ចំណូលចិត្តក្នុងការបង្កើតបទពិសោធន៍ឌីជីថលដែលមានទាំងភាពទាក់ទាញ
              និងមានប្រយោជន៍
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="mb-6 w-10 h-10 rounded-full bg-light-accent1 dark:bg-dark-accent1 flex items-center justify-center text-white transition-transform hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <p className="text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} ឡាយ សុខជា.
              រក្សាសិទ្ធិគ្រប់យ៉ាង។
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
