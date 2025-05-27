/**
 * Language Switcher Component
 * Handles translation of website content between English and Spanish
 */

// Default language is Spanish
let currentLanguage = localStorage.getItem("language") || "es";

// Translations object
const translations = {
  en: {
    // Navigation
    about: "About",
    portfolio: "Portfolio",
    learning: "Learning",
    skills: "Skills",
    contact: "Contact",

    // Presentation section
    developer_desc: "Front-End Web Developer, passionate about Design UX.",
    download_cv: "Download CV",
    contact_me: "Contact me",

    // About me section
    who_im: "Who I'm",
    about_me: "About me",
    about_text_1:
      "I love to create websites that provide a unique and satisfying user experience. You can see some of my projects in the portfolio section.",
    about_text_2:
      "Self-taught, responsible, and committed to my work, constantly learning new technologies and tools to improve my skills. Below, you can see my portfolio and technologies I use.",
    about_text_3: "Feel free to contact me if you have any questions.",

    // Portfolio section
    some_projects: "Some of my Projects",
    portfolio_title: "Portfolio",

    // Learning section
    journey_progress: "My Journey & Progress",
    learning_journey: "Learning Journey",
    week: "Week",
    topics_learned: "Topics Learned",
    lab_exercises: "Lab Exercises",
    reflection: "Reflection",

    // Skills section
    skills_title: "Skills",
    front_end: "Front-End",
    design_ux: "Design UX",
    learning_skills: "Learning",
    tools: "Tools",

    // Contact section
    now_or_never: "It's now or never",
    contact_title: "Contact me",
    contact_info:
      "If you have any questions and/or would like me to be part of your team, you can fill out the form or contact me through these means:",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send",

    // Final section
    thank_you: "Thank you for visiting my web site🤟",
    also_contact: "Or you can also contact me through:",

    // Footer
    rights: "© 2024 All rights reserved.",
  },
  es: {
    // Navegación
    about: "Sobre mí",
    portfolio: "Portafolio",
    learning: "Aprendizaje",
    skills: "Habilidades",
    contact: "Contacto",

    // Sección de presentación
    developer_desc: "Desarrollador Web Front-End, apasionado por el Diseño UX.",
    download_cv: "Descargar CV",
    contact_me: "Contáctame",

    // Sección sobre mí
    who_im: "Quién soy",
    about_me: "Sobre mí",
    about_text_1:
      "Me encanta crear sitios web que brinden una experiencia de usuario única y satisfactoria. Puedes ver algunos de mis proyectos en la sección de portafolio.",
    about_text_2:
      "Autodidacta, responsable y comprometido con mi trabajo, constantemente aprendiendo nuevas tecnologías y herramientas para mejorar mis habilidades. A continuación, puedes ver mi portafolio y las tecnologías que utilizo.",
    about_text_3: "No dudes en contactarme si tienes alguna pregunta.",

    // Sección de portafolio
    some_projects: "Algunos de mis Proyectos",
    portfolio_title: "Portafolio",

    // Sección de aprendizaje
    journey_progress: "Mi Trayectoria y Progreso",
    learning_journey: "Recorrido de Aprendizaje",
    week: "Semana",
    topics_learned: "Temas Aprendidos",
    lab_exercises: "Ejercicios de Laboratorio",
    reflection: "Reflexión",

    // Sección de habilidades
    skills_title: "Habilidades",
    front_end: "Front-End",
    design_ux: "Diseño UX",
    learning_skills: "Aprendizaje",
    tools: "Herramientas",

    // Sección de contacto
    now_or_never: "Es ahora o nunca",
    contact_title: "Contáctame",
    contact_info:
      "Si tienes alguna pregunta y/o te gustaría que forme parte de tu equipo, puedes completar el formulario o contactarme a través de estos medios:",
    name: "Nombre",
    email: "Correo",
    subject: "Asunto",
    message: "Mensaje",
    send: "Enviar",

    // Sección final
    thank_you: "Gracias por visitar mi sitio web🤟",
    also_contact: "O también puedes contactarme a través de:",

    // Pie de página
    rights: "© 2024 Todos los derechos reservados.",
  },
};

// Initialize language switcher when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initLanguageSwitcher();
  setLanguage(currentLanguage);
});

/**
 * Initialize the language switcher component
 */
function initLanguageSwitcher() {
  // Get the language switcher button and dropdown
  const languageSwitcher = document.querySelector(".language-switcher");
  const languageBtn = document.querySelector(".language-btn");
  const languageOptions = document.querySelectorAll(".language-option");

  // Toggle dropdown visibility when button is clicked
  if (languageBtn) {
    languageBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      languageSwitcher.classList.toggle("active");
    });
  }

  // Handle language option selection
  if (languageOptions) {
    languageOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.preventDefault();
        const lang = this.getAttribute("data-lang");

        // Update current language
        currentLanguage = lang;
        localStorage.setItem("language", lang);

        // Update UI and translate content
        updateLanguageUI();
        translatePage();

        // Close dropdown
        languageSwitcher.classList.remove("active");
      });
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!languageSwitcher.contains(e.target)) {
      languageSwitcher.classList.remove("active");
    }
  });

  // Update UI to reflect current language
  updateLanguageUI();
}

/**
 * Update language switcher UI based on current language
 */
function updateLanguageUI() {
  const currentLangElement = document.querySelector(".current-lang span");
  const languageOptions = document.querySelectorAll(".language-option");

  if (currentLangElement) {
    currentLangElement.textContent = currentLanguage.toUpperCase();
  }

  if (languageOptions) {
    languageOptions.forEach((option) => {
      const lang = option.getAttribute("data-lang");
      if (lang === currentLanguage) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }
}

/**
 * Set the page language and translate content
 * @param {string} lang - The language code ('en' or 'es')
 */
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;
  updateLanguageUI();
  translatePage();
}

/**
 * Translate all content on the page
 */
function translatePage() {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (translations[currentLanguage][key]) {
      // Handle special cases based on element type
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        // For form elements, update placeholder
        if (element.getAttribute("placeholder")) {
          element.setAttribute(
            "placeholder",
            translations[currentLanguage][key]
          );
        }
      } else {
        // For normal elements, update text content
        element.textContent = translations[currentLanguage][key];
      }
    }
  });
}
