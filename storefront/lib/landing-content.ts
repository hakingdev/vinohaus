// Static texts of the VIN ROUGE landing, verbatim from the Figma mockup.
// Will be replaced with real (German) content later — edit in one place.

export const hero = {
  eyebrow: "WINEMAKING TRADITION",
  title: "Wines from all over the world",
  text: "Nunc morbi purus purus nisl, amet. Non eleifend aliquam nibh ultrices platea platea enim tellus, tincid.",
  cta: "SEE HOW IT MADE",
};

export const features = [
  { number: "01.", label: "VINEYARD", sub: "Visit and take a tour" },
  { number: "02.", label: "PRODUCT", sub: "Old family recipes" },
  { number: "03.", label: "HISTORY", sub: "Meet a tradition that lasts" },
];

export const ourHistory = {
  eyebrow: "AUGUE SED NEC",
  title: "Our History",
  paragraphs: [
    "Mattis aliquam malesuada euismod augue posuere venenatis. Maecenas faucibus dui vitae tellus et mi. Ut augue mattis augue dui et amet. Fringilla vestibulum dui, condimentum tristique duis.",
    "Phasellus ut sem montes, aliquam morbi accumsan nam aenean. Augue ut congue tincidunt eget commodo, tincidunt viverra.",
  ],
  cta: "SEE MORE",
  caption: "Ut augue mattis augue dui et amet",
  year: "1945",
};

export const categoryCards = [
  { eyebrow: "LOREMIS", title: "WINE GLASS", sub: "Lorem ipsum malesu.", image: "/landing/card-glass.png" },
  { eyebrow: "LOREMIS", title: "TASTING DAY", sub: "Lorem ipsum malesu.", image: "/landing/card-tasting.png" },
  { eyebrow: "LOREMIS", title: "BEST HARVEST", sub: "Lorem ipsum malesu.", image: "/landing/card-harvest.png" },
  { eyebrow: "LOREMIS", title: "OUR PACKAGE", sub: "Lorem ipsum malesu.", image: "/landing/card-package.png" },
];

export const barrelsBand = {
  title: "WINEMAKING",
  sub: "Lorem ipsum malesu.",
};

export const bestSpirits = {
  eyebrow: "AUGUE SED NEC",
  title: "Our Best Spirit",
  text: "Mattis aliquam malesuada euismod augue posuere venenatis. Maecenas faucibus dui vitae tellus et mi.",
  // fallback items shown until the Saleor instance is connected
  fallback: [
    { id: "f1", name: "Luctuson Chardonnay", subtitle: "Lorem ipsum malesu.", price: "99.00 €", image: "/landing/bottle-1.png", href: "/shop" },
    { id: "f2", name: "New Cabernet Sauvignon", subtitle: "Lorem ipsum malesu.", price: "99.00 €", image: "/landing/bottle-2.png", href: "/shop" },
    { id: "f3", name: "Belasco Llama Cognac", subtitle: "Lorem ipsum malesu.", price: "99.00 €", image: "/landing/bottle-3.png", href: "/shop" },
    { id: "f4", name: "Luctuson Chardonnay", subtitle: "Lorem ipsum malesu.", price: "99.00 €", image: "/landing/bottle-1.png", href: "/shop" },
  ],
};

export const naturalAuroma = {
  eyebrow: "AUGUE SED NEC",
  title: "Natural Auroma",
  photos: [
    "/landing/gallery-1.png",
    "/landing/gallery-2.png",
    "/landing/gallery-3.png",
    "/landing/gallery-4.png",
    "/landing/gallery-5.png",
    "/landing/gallery-6.png",
  ],
  features: [
    { icon: "/landing/feature-glass.svg", label: "WINE GLASS", sub: "Lorem ipsum malesu." },
    { icon: "/landing/feature-smell.svg", label: "FINE SMELL", sub: "Lorem ipsum malesu." },
    { icon: "/landing/feature-sort.svg", label: "UNIQUE SORT", sub: "Lorem ipsum malesu." },
    { icon: "/landing/feature-habit.svg", label: "OLD HABIT", sub: "Lorem ipsum malesu." },
  ],
  history: {
    title: "Our History",
    text: "Mattis aliquam malesuada euismod augue posuere venenatis. Maecenas faucibus dui vitae tellus et mi. Ut augue mattis augue dui et amet. Fringilla vestibulum dui",
    cta: "SEE MORE",
  },
};

export const testimonial = {
  quote:
    "Mattis aliquam malesuada euismod augue posuere venenatis. Maecenas faucibus dui vitae tellus et mi. Ut augue mattis augue dui et amet.",
  name: "VINCENT FROST",
  role: "Lorem ipsum malesu.",
};

export const vineyardBand = {
  title: "OUR VINEYARD",
  sub: "Lorem ipsum malesu.",
};

const teamText =
  "Ada euismod augue posuere venenatisim Maecenas faucibus dui vitae tellus et mi. Ut augue mattis";

export const team = {
  eyebrow: "AUGUE SED NEC",
  title: "We Make Wine",
  members: [
    { name: "ANTIA CAVACO", role: "Lorem ipsum malesu.", text: teamText, image: "/landing/team-1.png" },
    { name: "AMIRO SIVESTRE", role: "Lorem ipsum malesu.", text: teamText, image: "/landing/team-2.png" },
    { name: "BRANCA ALVA", role: "Lorem ipsum malesu.", text: teamText, image: "/landing/team-3.png" },
    { name: "VALETIN EATON", role: "Lorem ipsum malesu.", text: teamText, image: "/landing/team-4.png" },
  ],
};

const faqAnswer =
  "Id habitasse tortor molestie ut etiam ac faucibus. Arcu pellentesque pretium ultrices egestas nulla pharetra. Consectetur sed urna tincidunt tellus mauris mi.";

export const faq = {
  heading: "GET TO KNOW US",
  sub: "Lorem ipsum malesu.",
  items: [
    { question: "The Origin of our Drinks", answer: faqAnswer },
    { question: "Where you can Taste our Drinks?", answer: faqAnswer },
    { question: "Wine Quality Prediction", answer: faqAnswer },
    { question: "Learn More About Us", answer: faqAnswer },
  ],
};

export const events = {
  eyebrow: "AUGUE SED NEC",
  title: "Vineyard Events",
  items: [
    { title: "WINE TOUR", date: "June 25, 2023", time: "10:00", place: "Lisbon, Portugal", image: "/landing/gallery-6.png" },
    { title: "APERITIV", date: "June 25, 2023", time: "10:00", place: "Lisbon, Portugal", image: "/landing/gallery-3.png" },
    { title: "DRINK’S ORIGIN", date: "June 25, 2023", time: "10:00", place: "Lisbon, Portugal", image: "/landing/event-3.png" },
  ],
  caption: "Ut augue mattis augue dui et amet",
};

export const newsletter = {
  title: "Newsletter",
  sub: "Subscribe for lastest news",
  text: "Mattis aliquam malesuada euismod augue posuere venenatis. Maecenas faucibus dui vitae tellus et mi. Ut augue mattis augue dui et amet. Fringilla vestibulum dui",
  placeholder: "Type your email here...",
  cta: "SEND",
};

export const clients = {
  eyebrow: "AUGUE SED NEC",
  title: "Our Loving Client",
  logos: [
    "/landing/client-1.png",
    "/landing/client-2.png",
    "/landing/client-3.png",
    "/landing/client-4.png",
    "/landing/client-5.png",
    "/landing/client-6.png",
    "/landing/client-7.png",
    "/landing/client-8.png",
  ],
};

export const footerContact = {
  heading: "CONTACT US",
  items: [
    { icon: "/landing/icon-pin.svg", text: "35 W 46nd Street Portugal" },
    { icon: "/landing/icon-mail.svg", text: "vinrouge@dotcreativemarket.com" },
    { icon: "/landing/icon-phone.svg", text: "+(123) 456-7890-456-7890" },
  ],
};

export const footerAbout = {
  heading: "ABOUT US",
  items: [
    "Story about us",
    "Our latest blog posts",
    "Purchase our products",
    "Keep in touch",
  ],
};

export const footerNews = {
  heading: "LASTEST NEWS",
  items: [
    { date: "September 11, 2019", title: "LARGEST VINEYARD" },
    { date: "September 11, 2019", title: "OUR BEST APERITIFS" },
    { date: "September 11, 2019", title: "AMAZING RECIPES" },
  ],
};
