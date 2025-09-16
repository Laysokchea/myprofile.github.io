import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger, registerScrollTrigger } from "../utils/gsapUtils";
import { useToast } from "@/components/ui/use-toast";
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

registerScrollTrigger();

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        ".contact-form",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".contact-info",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "សូមបញ្ចូលឈ្មោះរបស់អ្នក";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "សូមបញ្ចូលអ៊ីមែលដែលត្រឹមត្រូវ";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "សូមបញ្ចូលសាររបស់អ្នក";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Show success toast
        toast({
          title: "សូមអរគុណ!",
          description:
            "សាររបស់អ្នកត្រូវបានផ្ញើជោគជ័យ។ យើងនឹងឆ្លើយតបឱ្យបានឆាប់បំផុត។",
          duration: 5000,
        });

        // Celebration animation
        const formElement = formRef.current;
        if (formElement && gsap) {
          gsap.fromTo(
            formElement,
            { scale: 1 },
            {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(formElement, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.in",
                });
              },
            }
          );

          // Create confetti effect
          const confettiColors = ["#FF6B6B", "#4ECDC4", "#FFF", "#FFD166"];
          for (let i = 0; i < 50; i++) {
            const confetti = document.createElement("div");
            confetti.className =
              "absolute w-3 h-3 rounded-full pointer-events-none";
            confetti.style.backgroundColor =
              confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.top = "50%";
            confetti.style.left = "50%";
            formElement.appendChild(confetti);

            gsap.to(confetti, {
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              opacity: 0,
              duration: 1 + Math.random() * 1,
              ease: "power2.out",
              onComplete: () => {
                if (formElement.contains(confetti)) {
                  formElement.removeChild(confetti);
                }
              },
            });
          }
        }
      }, 1500);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section bg-gray-50 dark:bg-[#222] py-20"
    >
      <div className="container mx-auto">
        <h2 className="section-title text-3xl md:text-4xl font-bold mb-3 text-center">
          <span className="title-gradient">ទាក់ទងខ្ញុំ</span>
        </h2>
        <div className="w-20 h-1.5 bg-light-accent2 dark:bg-dark-accent2 mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="contact-form">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#2D2D2D] rounded-xl shadow-lg p-8"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium">
                  ឈ្មោះ
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-[#333] focus:outline-none focus:ring-2 focus:ring-light-accent1 dark:focus:ring-dark-accent1 transition-colors`}
                  placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">
                  អ៊ីមែល
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-[#333] focus:outline-none focus:ring-2 focus:ring-light-accent1 dark:focus:ring-dark-accent1 transition-colors`}
                  placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 font-medium">
                  ប្រធានបទ
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333] focus:outline-none focus:ring-2 focus:ring-light-accent1 dark:focus:ring-dark-accent1 transition-colors"
                  placeholder="បញ្ចូលប្រធានបទរបស់អ្នក"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  សាររបស់អ្នក
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-[#333] focus:outline-none focus:ring-2 focus:ring-light-accent1 dark:focus:ring-dark-accent1 transition-colors`}
                  placeholder="បញ្ចូលសាររបស់អ្នក"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-light-accent1 dark:bg-dark-accent1 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-light-accent1/90 dark:hover:bg-dark-accent1/90"
                }`}
              >
                {isSubmitting ? "កំពុងផ្ញើ..." : "ផ្ញើសារ"}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="bg-white dark:bg-[#2D2D2D] rounded-xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 title-gradient">
                ព័ត៌មានទំនាក់ទំនង
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-light-accent1/10 dark:bg-dark-accent1/10 flex items-center justify-center mr-4">
                    <Mail
                      size={24}
                      className="text-light-accent1 dark:text-dark-accent1"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">អ៊ីមែល</h4>
                    <a
                      href="mailto:contact@example.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-light-accent1 dark:hover:text-dark-accent1 transition-colors"
                    >
                      laysokchea09@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-light-accent1/10 dark:bg-dark-accent1/10 flex items-center justify-center mr-4">
                    <Phone
                      size={24}
                      className="text-light-accent1 dark:text-dark-accent1"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">ទូរស័ព្ទ</h4>
                    <a
                      href="tel:+85510898782"
                      className="text-gray-600 dark:text-gray-300 hover:text-light-accent1 dark:hover:text-dark-accent1 transition-colors"
                    >
                      +855 10898782
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-bold mb-4">បណ្តាញសង្គម</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-light-accent1/10 dark:bg-dark-accent1/10 flex items-center justify-center text-light-accent1 dark:text-dark-accent1 transition-transform hover:scale-110"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-light-accent1/10 dark:bg-dark-accent1/10 flex items-center justify-center text-light-accent1 dark:text-dark-accent1 transition-transform hover:scale-110"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-light-accent1/10 dark:bg-dark-accent1/10 flex items-center justify-center text-light-accent1 dark:text-dark-accent1 transition-transform hover:scale-110"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-light-accent1/10 dark:bg-dark-accent1/10 flex items-center justify-center text-light-accent1 dark:text-dark-accent1 transition-transform hover:scale-110"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
