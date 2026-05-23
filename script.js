const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector(".contact-form");
const languageButtons = document.querySelectorAll(".language-switch button");
const contactEmail = "eiria@eiria-ltd.com";

const getStoredLanguage = () => {
  try {
    return window.localStorage?.getItem("eiria-lang") || "ja";
  } catch {
    return "ja";
  }
};

const setStoredLanguage = (lang) => {
  try {
    window.localStorage?.setItem("eiria-lang", lang);
  } catch {
    // Some embedded browsers disable localStorage. The toggle still works for the current page.
  }
};

let currentLang = getStoredLanguage();

const pageCopy = {
  title: "EIRIA Inc. | AI Education, AI Adoption Support, and Creative Operations",
  description: "EIRIA Inc. connects learning and action through AI education, AI adoption support, and web, social media, and document production.",
};

const translations = [
  { selector: ".brand-name", text: "EIRIA Inc." },
  { selector: '.site-nav a[href="#concept"]', text: "About" },
  { selector: '.site-nav a[href="#story"]', text: "Story" },
  { selector: '.site-nav a[href="#services"]', text: "Services" },
  { selector: '.site-nav a[href="#message"]', text: "Message" },
  { selector: '.site-nav a[href="#company"]', text: "Company" },
  { selector: '.site-nav a[href="#sai"]', text: "SAISEI" },
  { selector: ".header-cta", text: "Contact" },
  { selector: "#hero-title", html: "<span>EIRIA</span><span>Inc.</span>" },
  { selector: ".hero-statement", text: "Connecting AI learning with practical creative operations." },
  { selector: ".hero-lead", text: "EIRIA supports people and organizations through AI education, AI adoption, and web, social media, and document production." },
  { selector: ".hero-actions .button.primary", text: "Contact Us" },
  { selector: ".hero-actions .button.secondary", text: "Visit SAISEI" },
  { selector: ".hero-points span:nth-child(1)", text: "AI Education" },
  { selector: ".hero-points span:nth-child(2)", text: "AI Adoption" },
  { selector: ".hero-points span:nth-child(3)", text: "Creative Operations" },
  { selector: ".value-strip div:nth-child(1) p", text: "Bringing practical AI to people who want to learn." },
  { selector: ".value-strip div:nth-child(2) p", text: "Turning content and documents into sustainable operations." },
  { selector: ".value-strip div:nth-child(3) p", text: "Building spaces where people can keep challenging themselves." },
  { selector: "#virtual-title", text: "Step into a virtual space where learning, creation, and operations connect." },
  { selector: ".virtual-copy p:not(.eyebrow)", text: "EIRIA is not only a place to learn AI. We design an environment where knowledge, expression, work, and community connect and become the next action." },
  { selector: "#concept-title", text: "Creating an era where people can say, “I am myself.”" },
  { selector: ".concept-body > p:nth-child(1)", text: "AI is not only for specialists. It helps organize writing, structure information, create materials, and plan work in everyday life and business." },
  { selector: ".concept-body > p:nth-child(2)", text: "EIRIA does not stop at learning. We create safe learning spaces, trusted consultation, and systems that connect production and operation to real work." },
  { selector: ".name-note p:not(.eyebrow)", text: "The name EIRIA contains two I’s. One represents self-recognition: “I am here.” The other represents agency: “I choose and act.”" },
  { selector: "#story-title", text: "Founding Story" },
  { selector: ".story-heading > p:not(.eyebrow)", text: "Choosing the future by your own will, not by someone else’s expectations." },
  { selector: ".story-anchor-card h3", text: "Self-Recognition and Agency" },
  { selector: ".story-anchor-card p:not(.eyebrow)", text: "The two I’s in EIRIA represent recognizing yourself and choosing to act with your own will." },
  { selector: ".story-copy > p:nth-of-type(1)", text: "Many people live while unconsciously adjusting to someone else’s expectations: family, society, roles, and outside evaluation." },
  { selector: ".story-copy > p:nth-of-type(2)", text: "Deep down, we want to choose our own lives and open the future with our own abilities. Yet we sometimes make ourselves smaller, thinking it may be too difficult." },
  { selector: ".story-copy > p:nth-of-type(3)", text: "EIRIA was born from questioning that atmosphere. People should be able to live more freely, recognize themselves, choose with intention, and create their own future." },
  { selector: ".i-grid article:nth-child(1) h3", text: "Self-Recognition" },
  { selector: ".i-grid article:nth-child(1) p", text: "Recognizing your own existence and possibilities: “I am here.”" },
  { selector: ".i-grid article:nth-child(2) h3", text: "Agency" },
  { selector: ".i-grid article:nth-child(2) p", text: "Choosing and acting to create your own life." },
  { selector: ".story-copy > p:nth-of-type(4)", text: "EIRIA symbolizes an era where more people create their own lives instead of living someone else’s." },
  { selector: ".story-copy > p:nth-of-type(5)", text: "We believe society changes quietly but surely when women recognize themselves and begin choosing the future with their own power." },
  { selector: ".story-copy blockquote", text: "EIRIA was created to build an era where people can say, “I am myself.”" },
  { selector: "#services-title", text: "Services" },
  { selector: ".services .section-heading > p:not(.eyebrow)", text: "EIRIA connects school operations and business support so learning leads to real work." },
  { selector: "#sai h3", text: "First AI School SAISEI" },
  { selector: "#sai > p", text: "An AI education service for beginners and seniors. We support learners from basics to practice and output creation." },
  { selector: "#sai li:nth-child(1)", text: "Basic AI operation and prompting" },
  { selector: "#sai li:nth-child(2)", text: "Writing, documents, images, and web practice" },
  { selector: "#sai li:nth-child(3)", text: "Output review and quality support" },
  { selector: "#sai .text-link", text: "Visit SAISEI Website" },
  { selector: ".service-card.featured h3", text: "AI Production and Operations Support" },
  { selector: ".service-card.featured > p", text: "We support websites, social posts, sales materials, and writing by designing workflows with AI from the start." },
  { selector: ".service-card.featured li:nth-child(1)", text: "Website production and updates" },
  { selector: ".service-card.featured li:nth-child(2)", text: "SNS planning and operations support" },
  { selector: ".service-card.featured li:nth-child(3)", text: "Documents, writing, and information structure" },
  { selector: ".service-card:nth-child(3) h3", text: "Community Collaboration and Briefing Design" },
  { selector: ".service-card:nth-child(3) > p", text: "We design briefings and programs with communities, companies, and organizations for AI adoption, side work, and participation." },
  { selector: ".service-card:nth-child(3) li:nth-child(1)", text: "Information sessions" },
  { selector: ".service-card:nth-child(3) li:nth-child(2)", text: "Needs research and consultation paths" },
  { selector: ".service-card:nth-child(3) li:nth-child(3)", text: "Collaboration and referral models" },
  { selector: "#support-title", text: "We organize business communication with AI as the starting point." },
  { selector: ".support-grid div:nth-child(1) span:last-child", text: "Website production, landing page improvement, and update management" },
  { selector: ".support-grid div:nth-child(2) span:last-child", text: "Post ideas, image concepts, operation support, and planning" },
  { selector: ".support-grid div:nth-child(3) span:last-child", text: "Sales materials, explanations, writing, and information organization" },
  { selector: ".support-grid div:nth-child(4) span:last-child", text: "Building AI usage patterns matched to actual work" },
  { selector: "#flow-title", text: "EIRIA Support Process" },
  { selector: ".flow-steps article:nth-child(1) h3", text: "Organize" },
  { selector: ".flow-steps article:nth-child(1) p", text: "We clarify goals, audiences, and current communication or operations." },
  { selector: ".flow-steps article:nth-child(2) h3", text: "Design" },
  { selector: ".flow-steps article:nth-child(2) p", text: "We structure courses, outputs, and operation flows around the purpose." },
  { selector: ".flow-steps article:nth-child(3) h3", text: "Create and Run" },
  { selector: ".flow-steps article:nth-child(3) p", text: "We provide AI education, web, SNS, and document production at the right level." },
  { selector: ".flow-steps article:nth-child(4) h3", text: "Improve" },
  { selector: ".flow-steps article:nth-child(4) p", text: "We review reactions and outputs, then refine the system for continuity." },
  { selector: "#message-title", text: "Message" },
  { selector: ".message-copy > p:nth-of-type(2)", text: "Thank you for visiting the website of EIRIA Inc. I am Ayumi Ketayama, Representative Director." },
  { selector: ".message-copy > p:nth-of-type(3)", text: "As AI and other technologies evolve, the ways we work, learn, and choose our lives are expanding. At the same time, many people still feel that these possibilities are too difficult or unrelated to them." },
  { selector: ".message-copy > p:nth-of-type(4)", text: "I have not built my career as a special elite. I have worked as an ordinary professional, and that is why I know how learning something new can expand life choices." },
  { selector: ".message-copy > p:nth-of-type(5)", text: "EIRIA was founded from that belief. The name carries the meaning of recognizing yourself and opening the future with your own power." },
  { selector: ".message-copy > p:nth-of-type(6)", text: "Through learning centered on AI education, we aim to create an environment where anyone can access new knowledge and skills and expand their possibilities." },
  { selector: ".message-copy > p:nth-of-type(7)", text: "EIRIA is open to everyone who wants to learn, regardless of age, gender, or past experience. I also hope to contribute naturally to an environment where women can use their abilities more freely." },
  { selector: ".message-copy > p:nth-of-type(8)", text: "In an era of evolving technology, what matters is not who is allowed to use it, but how we create the future with it." },
  { selector: ".message-copy > p:nth-of-type(9)", text: "EIRIA will continue working toward a society where each person’s possibilities expand through learning and challenge." },
  { selector: ".signature", html: "EIRIA Inc.<br>Representative Director Ayumi Ketayama" },
  { selector: "#company-title", text: "Company" },
  { selector: ".company-copy p:not(.eyebrow)", text: "EIRIA aims to create a society where each person’s possibilities expand through AI education, learning, and challenge." },
  { selector: ".company-list div:nth-child(1) dt", text: "Company" },
  { selector: ".company-list div:nth-child(1) dd", text: "EIRIA Inc." },
  { selector: ".company-list div:nth-child(2) dt", text: "Representative" },
  { selector: ".company-list div:nth-child(2) dd", text: "Representative Director Ayumi Ketayama" },
  { selector: ".company-list div:nth-child(3) dt", text: "Founded" },
  { selector: ".company-list div:nth-child(3) dd", text: "February 27, 2026" },
  { selector: ".company-list div:nth-child(4) dt", text: "Business" },
  { selector: ".company-list div:nth-child(4) dd", text: "AI education, AI adoption support, web production and operations, SNS support, document production" },
  { selector: ".company-list div:nth-child(5) dt", text: "Address" },
  { selector: ".company-list div:nth-child(6) dt", text: "Email" },
  { selector: "#privacy-title", text: "Privacy Policy" },
  { selector: ".policy-section .section-heading > p:not(.eyebrow)", text: "This policy explains how we handle personal information in our services." },
  { selector: ".policy-box summary", text: "View Privacy Policy" },
  { selector: ".policy-content > p:nth-of-type(1)", text: "EIRIA Inc. recognizes the importance of personal information obtained through its services, complies with the Act on the Protection of Personal Information and related laws and regulations, and handles such information appropriately." },
  { selector: ".policy-content h3:nth-of-type(1)", text: "1. Acquisition of Personal Information" },
  { selector: ".policy-content > p:nth-of-type(2)", text: "We may acquire the following personal information through lawful and fair means." },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(1)", text: "Name" },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(2)", text: "Address" },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(3)", text: "Phone number" },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(4)", text: "Email address" },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(5)", text: "Date of birth" },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(6)", text: "Service usage history" },
  { selector: ".policy-content ul:nth-of-type(1) li:nth-child(7)", text: "Other information necessary to provide our services" },
  { selector: ".policy-content h3:nth-of-type(2)", text: "2. Purpose of Use" },
  { selector: ".policy-content > p:nth-of-type(3)", text: "We use acquired personal information for the following purposes." },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(1)", text: "Providing and operating our services" },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(2)", text: "Responding to inquiries" },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(3)", text: "Sending information and notices about our services" },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(4)", text: "Providing information about seminars and events" },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(5)", text: "Analysis for service improvement and development" },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(6)", text: "Preventing unauthorized use and ensuring security" },
  { selector: ".policy-content ul:nth-of-type(2) li:nth-child(7)", text: "Responding as required by law" },
  { selector: ".policy-content h3:nth-of-type(3)", text: "3. Provision to Third Parties" },
  { selector: ".policy-content > p:nth-of-type(4)", text: "Except where required by law, necessary to protect life, body, or property, or requested by public authorities through proper procedures, we do not provide personal information to third parties without consent." },
  { selector: ".policy-content h3:nth-of-type(4)", text: "4. Management of Personal Information" },
  { selector: ".policy-content > p:nth-of-type(5)", text: "We take appropriate security measures to prevent leakage, loss, alteration, unauthorized access, and other risks related to personal information." },
  { selector: ".policy-content h3:nth-of-type(5)", text: "5. Disclosure, Correction, and Deletion" },
  { selector: ".policy-content > p:nth-of-type(6)", text: "When requested by the person concerned, we will verify identity and respond to requests for disclosure, correction, deletion, and related matters within a reasonable scope." },
  { selector: ".policy-content h3:nth-of-type(6)", text: "6. Cookies" },
  { selector: ".policy-content > p:nth-of-type(7)", text: "Our website may use cookies to improve services and analyze usage. Information obtained through cookies does not identify individuals." },
  { selector: ".policy-content h3:nth-of-type(7)", text: "7. Changes to This Policy" },
  { selector: ".policy-content > p:nth-of-type(8)", text: "This policy may be revised in response to changes in laws or service content. Revised content becomes effective when posted on our website." },
  { selector: ".policy-content h3:nth-of-type(8)", text: "8. Contact" },
  { selector: ".policy-content > p:nth-of-type(9)", html: 'For inquiries regarding personal information, please contact us below.<br>EIRIA Inc.<br>Email: <a href="mailto:eiria@eiria-ltd.com">eiria@eiria-ltd.com</a><br>Address: Oki Mansion 203, 1-9-14 Hyakunincho, Shinjuku-ku, Tokyo' },
  { selector: ".policy-content > p:nth-of-type(10)", html: "Established: February 27, 2026<br>EIRIA Inc.<br>Representative Director Ayumi Ketayama" },
  { selector: "#contact-title", text: "Contact Us" },
  { selector: ".contact-copy > p:not(.eyebrow)", text: "Please contact us about EIRIA, SAISEI, web/SNS/document production, AI adoption support, or collaboration." },
  { selector: ".contact-form > label:nth-of-type(1)", label: "Name" },
  { selector: ".contact-form > label:nth-of-type(2)", label: "Company / Organization" },
  { selector: ".contact-form > label:nth-of-type(3)", label: "Email" },
  { selector: ".contact-form > label:nth-of-type(4)", label: "Phone" },
  { selector: ".contact-form > label:nth-of-type(5)", label: "Inquiry Type" },
  { selector: ".contact-form > label:nth-of-type(6)", label: "Message" },
  { selector: 'input[name="name"]', placeholder: "Your name" },
  { selector: 'input[name="company"]', placeholder: "Company name" },
  { selector: 'textarea[name="message"]', placeholder: "Please briefly describe your inquiry." },
  { selector: 'select[name="topic"] option:nth-child(1)', text: "About EIRIA" },
  { selector: 'select[name="topic"] option:nth-child(2)', text: "About First AI School SAISEI" },
  { selector: 'select[name="topic"] option:nth-child(3)', text: "Website Production and Operations" },
  { selector: 'select[name="topic"] option:nth-child(4)', text: "SNS and Document Production" },
  { selector: 'select[name="topic"] option:nth-child(5)', text: "Briefings and Collaboration" },
  { selector: 'select[name="topic"] option:nth-child(6)', text: "Other" },
  { selector: ".form-button", text: "Send" },
  { selector: ".site-footer > div p", text: "Recognize yourself and open the future with your own power." },
  { selector: '.footer-nav a[href="#privacy"]', text: "Privacy Policy" },
  { selector: '.footer-nav a[href="#sai"]', text: "SAISEI" },
];

const originalValues = new Map();

const getFirstTextNode = (element) => {
  return Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
};

const rememberOriginal = (element, property, selector) => {
  const key = `${selector}:${property}`;
  if (originalValues.has(key)) return originalValues.get(key);

  let value = "";
  if (property === "html") value = element.innerHTML;
  if (property === "text") value = element.textContent;
  if (property === "placeholder") value = element.getAttribute("placeholder") || "";
  if (property === "label") value = getFirstTextNode(element)?.nodeValue || "";
  originalValues.set(key, value);
  return value;
};

const setLanguageItem = (item, lang) => {
  const element = document.querySelector(item.selector);
  if (!element) return;

  if (item.html) {
    const original = rememberOriginal(element, "html", item.selector);
    element.innerHTML = lang === "en" ? item.html : original;
    return;
  }

  if (item.placeholder) {
    const original = rememberOriginal(element, "placeholder", item.selector);
    element.setAttribute("placeholder", lang === "en" ? item.placeholder : original);
    return;
  }

  if (item.label) {
    const original = rememberOriginal(element, "label", item.selector);
    const textNode = getFirstTextNode(element);
    if (textNode) textNode.nodeValue = lang === "en" ? `\n            ${item.label}\n            ` : original;
    return;
  }

  const original = rememberOriginal(element, "text", item.selector);
  element.textContent = lang === "en" ? item.text : original;
};

const applyLanguage = (lang) => {
  currentLang = lang;
  document.documentElement.lang = lang === "en" ? "en" : "ja";
  document.body.dataset.lang = lang;
  document.title = lang === "en" ? pageCopy.title : "株式会社EIRIA | AI教育・AI活用支援・制作運用";
  document.querySelector('meta[name="description"]')?.setAttribute(
    "content",
    lang === "en"
      ? pageCopy.description
      : "株式会社EIRIAは、AI教育、AI活用支援、Web・SNS・資料制作を通じて、一人ひとりの学びと挑戦を実務につなげる会社です。"
  );

  translations.forEach((item) => setLanguageItem(item, lang));
  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  setStoredLanguage(lang);
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang || "ja");
  });
});

applyLanguage(currentLang === "en" ? "en" : "ja");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("is-menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-menu-open");
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const botField = String(formData.get("bot-field") || "").trim();
    if (botField) return;

    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const topic = String(formData.get("topic") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const isEnglish = currentLang === "en";
    const subject = isEnglish
      ? `[EIRIA Contact] ${topic || "Inquiry"}`
      : `【EIRIAお問い合わせ】${topic || "お問い合わせ"}`;
    const body = isEnglish
      ? [
          "Inquiry to EIRIA Inc.",
          "",
          `Name: ${name}`,
          `Company / Organization: ${company || "Not provided"}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          `Inquiry Type: ${topic}`,
          "",
          "Message:",
          message,
        ].join("\n")
      : [
          "株式会社EIRIAへのお問い合わせ",
          "",
          `お名前: ${name}`,
          `企業名・団体名: ${company || "未入力"}`,
          `メールアドレス: ${email}`,
          `電話番号: ${phone || "未入力"}`,
          `ご相談内容: ${topic}`,
          "",
          "メッセージ:",
          message,
        ].join("\n");

    const isLocal = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
    if (!isLocal) {
      try {
        const encodedData = new URLSearchParams(formData);
        const response = await window.fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodedData.toString(),
        });

        if (response.ok) {
          window.alert(
            isEnglish
              ? "Thank you. Your inquiry has been sent."
              : `${name || "ご担当者"}様、お問い合わせありがとうございます。送信が完了しました。`
          );
          contactForm.reset();
          return;
        }
      } catch {
        // If the hosting service has no form endpoint, fall back to mailto below.
      }
    }

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  });
}
