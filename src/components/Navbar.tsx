
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <a
          href="#"
          className="text-2xl font-bold title-gradient"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
        >
       LAY SOKCHEA
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="font-medium hover:text-light-accent1 dark:hover:text-dark-accent1 transition-colors"
          >
            អំពីខ្ញុំ
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="font-medium hover:text-light-accent1 dark:hover:text-dark-accent1 transition-colors"
          >
            ជំនាញ
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="font-medium hover:text-light-accent1 dark:hover:text-dark-accent1 transition-colors"
          >
            គម្រោង
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="font-medium hover:text-light-accent1 dark:hover:text-dark-accent1 transition-colors"
          >
            ការវាយតម្លៃ
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="button-primary text-sm"
          >
            ទាក់ទងខ្ញុំ
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-[#1A1A1A] z-40 flex flex-col items-center pt-10 space-y-6 md:hidden animate-fade-in">
          <button
            onClick={() => scrollToSection("about")}
            className="font-medium text-xl hover:text-light-accent1 dark:hover:text-dark-accent1"
          >
            អំពីខ្ញុំ
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="font-medium text-xl hover:text-light-accent1 dark:hover:text-dark-accent1"
          >
            ជំនាញ
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="font-medium text-xl hover:text-light-accent1 dark:hover:text-dark-accent1"
          >
            គម្រោង
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="font-medium text-xl hover:text-light-accent1 dark:hover:text-dark-accent1"
          >
            ការវាយតម្លៃ
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="button-primary text-lg mt-4"
          >
            ទាក់ទងខ្ញុំ
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
