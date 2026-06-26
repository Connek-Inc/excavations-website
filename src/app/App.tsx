import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from "react-router";
import logoImg from "../imports/logo.png";
import imgDrain from "../assets/drainfrancais.jpg";
import imgDrain2 from "../assets/frenchdrain2.jpg";
import imgFissure from "../assets/fissure.jpg";
import imgFissure2 from "../assets/fissure2.jpg";
import imgInspection from "../assets/inspection2.jpg";
import imgWaterproof from "../assets/basement-sump-pumps-installation-1.png";
import imgExcavation from "../assets/excavation2.jpg";
import imgDemolition from "../assets/demolition2.jpg";
import {
  Phone, Mail, MapPin, Menu, X, ChevronRight, Shield, Award,
  CheckCircle, Camera, Wrench, Layers, Hammer, Droplets, Waves,
  ArrowRight, ExternalLink, ArrowUpRight, Users, Star, Quote,
  ChevronDown, ThumbsUp, Search, TrendingUp, FileText
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT_DISPLAY = "'Barlow Condensed', sans-serif";
const FONT_BODY = "'Barlow', sans-serif";
const FONT_MONO = "'DM Mono', monospace";

const COMPANY = {
  name: "Mini Excavations Érable Inc.",
  short: "Mini Excavations Érable",
  neq: "1179620118",
  rbq: "5823-7736-01",
  apchq: "917698-04",
  phone: "514-830-9973",
  email: "miniexcavationerable@gmail.com",
};

const ZONES = [
  "Montréal", "Laval", "Longueuil", "Brossard", "Saint-Lambert",
  "Boucherville", "Varennes", "Repentigny", "Terrebonne", "Blainville",
  "Saint-Jérôme", "Boisbriand", "Sainte-Thérèse", "Mirabel",
];

const PORTFOLIO = [
  {
    id: 1,
    title: "Drain français — Rosemont",
    category: "Drain français",
    location: "Montréal, Rosemont",
    year: "2024",
    img: imgDrain,
    description: "Remplacement complet du drain français périmétrique d'une maison unifamiliale. Excavation de 40 m linéaires, pose de membrane géotextile, nouveau tuyau perforé et raccordement au puisard.",
    tags: ["Drain français", "Excavation", "Drainage"],
  },
  {
    id: 2,
    title: "Imperméabilisation — Laval",
    category: "Imperméabilisation",
    location: "Laval, Vimont",
    year: "2024",
    img: imgWaterproof,
    description: "Imperméabilisation extérieure de fondation, maison bi-génération. Application de membrane élastomère sur 28 m linéaires avec installation d'une planche de drainage.",
    tags: ["Imperméabilisation", "Fondation"],
  },
  {
    id: 3,
    title: "Réparation fissures — Longueuil",
    category: "Réparation de fissures",
    location: "Longueuil, Saint-Hubert",
    year: "2023",
    img: imgFissure2,
    description: "Injection polyuréthane sur 3 fissures actives en mur de fondation avec infiltration d'eau au sous-sol. Résultat : arrêt complet des infiltrations en une journée.",
    tags: ["Fissures", "Injection", "Fondation"],
  },
  {
    id: 4,
    title: "Excavation cour arrière — Brossard",
    category: "Excavation",
    location: "Brossard",
    year: "2024",
    img: imgExcavation,
    description: "Excavation en espace restreint (passage de 2,1 m) pour accès à la fondation. Mini-excavateur utilisé pour minimiser l'impact sur le terrain environnant.",
    tags: ["Excavation", "Espace restreint"],
  },
  {
    id: 5,
    title: "Inspection caméra + égout — Repentigny",
    category: "Inspection caméra",
    location: "Repentigny",
    year: "2023",
    img: imgInspection,
    description: "Inspection télévisée de la conduite d'égout sanitaire ayant permis de localiser un joint déplacé à 8,5 m de la fondation. Réparation ciblée sans excavation excessive.",
    tags: ["Inspection caméra", "Égout sanitaire"],
  },
  {
    id: 6,
    title: "Démolition garage — Terrebonne",
    category: "Démolition",
    location: "Terrebonne",
    year: "2023",
    img: imgDemolition,
    description: "Démolition d'un garage double en blocs de béton, incluant la dalle. Gestion complète des débris, transport et préparation du terrain pour nouvelle construction.",
    tags: ["Démolition", "Gestion des débris"],
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Martin Bouchard",
    location: "Montréal, Rosemont",
    rating: 5,
    service: "Drain français",
    date: "Novembre 2024",
    text: "Excellente équipe, très professionnelle. Le drain français a été remplacé en deux jours seulement. Le chantier était propre et bien organisé. Je recommande fortement Mini Excavations Érable pour tous travaux de drainage.",
  },
  {
    id: 2,
    name: "Sophie Tremblay",
    location: "Laval",
    rating: 5,
    service: "Réparation de fissures",
    date: "Octobre 2024",
    text: "J'avais des infiltrations d'eau depuis 3 ans. Après l'inspection et l'injection de résine, le problème est réglé. Travail soigné, devis honnête, et garantie écrite remise. Très satisfaite du résultat.",
  },
  {
    id: 3,
    name: "Jean-François Lévesque",
    location: "Longueuil",
    rating: 5,
    service: "Imperméabilisation",
    date: "Septembre 2024",
    text: "Nous avons fait imperméabiliser toute la fondation côté nord. Le travail a été fait rapidement et proprement. L'équipe a pris le temps d'expliquer chaque étape. Aucune infiltration depuis les travaux.",
  },
  {
    id: 4,
    name: "Caroline Ouellet",
    location: "Brossard",
    rating: 5,
    service: "Inspection caméra",
    date: "Août 2024",
    text: "L'inspection caméra nous a évité des travaux inutiles. Ils ont localisé le problème précisément et la réparation a été simple et rapide. Rapport complet remis avec photos. Service vraiment professionnel.",
  },
  {
    id: 5,
    name: "Pierre Gagné",
    location: "Repentigny",
    rating: 5,
    service: "Excavation",
    date: "Juillet 2024",
    text: "Passage très étroit de 2 m entre la maison et la clôture — j'avais peur que personne ne puisse intervenir. Mini Excavations Érable a réussi avec leur mini-excavateur sans aucun dommage au terrain. Chapeau !",
  },
  {
    id: 6,
    name: "Nathalie Bergeron",
    location: "Saint-Jérôme",
    rating: 5,
    service: "Drain français",
    date: "Juin 2024",
    text: "Très bonne expérience du début à la fin. Soumission gratuite reçue rapidement, travaux réalisés dans les délais convenus, et suivi après les travaux. Sous-sol enfin sec après 10 ans de problèmes d'humidité.",
  },
];

const SEO_FAQ = [
  {
    q: "Combien coûte l'installation d'un drain français à Montréal ?",
    a: "Le coût d'un drain français varie selon la longueur à excaver, l'accessibilité du terrain et la complexité du raccordement. Nous offrons des soumissions gratuites et sans engagement. Appelez-nous au 514-830-9973 ou remplissez notre formulaire en ligne pour obtenir une évaluation précise pour votre projet.",
  },
  {
    q: "Quelle est la différence entre un drain français et une imperméabilisation ?",
    a: "Le drain français collecte et évacue l'eau souterraine autour de la fondation (drainage périmétrique), tandis que l'imperméabilisation crée une barrière physique sur le mur de fondation pour empêcher l'eau de traverser. Dans certains cas, les deux interventions sont combinées pour une protection optimale.",
  },
  {
    q: "Combien de temps durent les travaux d'excavation en espace restreint ?",
    a: "Grâce à nos mini-excavateurs, nous pouvons intervenir dans des passages de moins de 1 m. La durée dépend du volume à excaver. Un remplacement de drain français sur une résidence standard prend généralement 2 à 4 jours. Nous planifions chaque chantier pour minimiser les perturbations.",
  },
  {
    q: "Est-ce que Mini Excavations Érable est certifié RBQ ?",
    a: `Oui. Mini Excavations Érable Inc. détient une licence d'entrepreneur général valide délivrée par la Régie du bâtiment du Québec (RBQ : 5823-7736-01) et est membre de l'APCHQ (no. membre : 917698-04). Vous pouvez vérifier notre licence directement sur le site de la RBQ.`,
  },
  {
    q: "Offrez-vous une garantie sur les travaux de fondation ?",
    a: "Oui. Nous offrons des garanties écrites selon le type de travaux réalisés. Pour certains travaux de fondation, de drainage ou d'imperméabilisation, une garantie pouvant aller jusqu'à 15 ans peut être offerte selon la nature du projet, les conditions du chantier et les travaux exécutés.",
  },
  {
    q: "Quelles villes desservez-vous dans la région de Montréal ?",
    a: "Nous intervenons à Montréal, Laval, Longueuil, Brossard, Saint-Lambert, Boucherville, Varennes, Repentigny, Terrebonne, Blainville, Saint-Jérôme, Boisbriand, Sainte-Thérèse, Mirabel et dans plusieurs municipalités environnantes. Contactez-nous pour confirmer votre secteur.",
  },
];

type Page =
  | "home" | "drain-francais" | "reparation-fissures" | "inspection-camera"
  | "impermeabilisation" | "excavation" | "demolition" | "egout-sanitaire"
  | "contact" | "licences" | "zones" | "apropos" | "politique" | "conditions"
  | "portfolio";

interface Service {
  id: Page;
  title: string;
  num: string;
  icon: React.ReactNode;
  heroImg: string;
  tagline: string;
  description: string;
  details: string[];
  benefits: string[];
}

const SERVICES: Service[] = [
  {
    id: "drain-francais", num: "01",
    title: "Drain Français",
    icon: <Droplets size={20} />,
    heroImg: imgDrain,
    tagline: "Installation et remplacement de drain de fondation",
    description: "Le drain français protège votre sous-sol contre les infiltrations d'eau. Un drain défectueux peut causer des dommages structurels importants. Nous effectuons l'installation, le remplacement et la réhabilitation complète de votre système de drainage périmétrique.",
    details: ["Excavation périmétrique autour de la fondation", "Pose de membrane géotextile et gravier drainant", "Installation du tuyau perforé de drainage", "Raccordement au puisard ou au réseau municipal", "Remblaiement et restauration du terrain", "Inspection caméra optionnelle en fin de travaux"],
    benefits: ["Protection durable contre les infiltrations", "Réduction de l'humidité au sous-sol", "Prévention des dommages structurels", "Garantie écrite selon les travaux réalisés"],
  },
  {
    id: "reparation-fissures", num: "02",
    title: "Réparation de Fissures",
    icon: <Wrench size={20} />,
    heroImg: imgFissure,
    tagline: "Réparation de fissures de fondation par injection",
    description: "Les fissures dans les murs de fondation peuvent laisser entrer l'eau et compromettre la stabilité de votre bâtiment. Nous réparons par injection de résine époxy ou polyuréthane, ou par excavation extérieure avec membrane d'imperméabilisation.",
    details: ["Diagnostic complet de la fissure", "Réparation par injection époxy ou polyuréthane", "Excavation extérieure si nécessaire", "Application de membrane bitumineuse ou élastomère", "Pose de drain si requis", "Remblaiement et restauration paysagère"],
    benefits: ["Arrêt immédiat des infiltrations d'eau", "Stabilisation structurelle de la fondation", "Solution durable adaptée à chaque type de fissure", "Garantie écrite selon les travaux réalisés"],
  },
  {
    id: "inspection-camera", num: "03",
    title: "Inspection par Caméra",
    icon: <Camera size={20} />,
    heroImg: imgInspection,
    tagline: "Inspection télévisée des drains et conduites souterraines",
    description: "L'inspection par caméra permet de diagnostiquer avec précision l'état de vos drains, égouts et conduites souterraines. Cet outil identifie obstructions, fissures, joints déplacés et infiltrations de racines avant toute intervention.",
    details: ["Inspection télévisée des drains de fondation", "Inspection des conduites d'égout sanitaire", "Localisation des obstructions et dommages", "Détection de joints déplacés ou brisés", "Identification des infiltrations de racines", "Rapport de diagnostic avec recommandations"],
    benefits: ["Diagnostic précis avant intervention", "Évite des excavations inutiles", "Rapport complet remis au client", "Recommandations claires pour la suite"],
  },
  {
    id: "impermeabilisation", num: "04",
    title: "Imperméabilisation",
    icon: <Layers size={20} />,
    heroImg: imgWaterproof,
    tagline: "Imperméabilisation extérieure de fondation",
    description: "L'imperméabilisation de fondation est la solution définitive contre les infiltrations d'eau. Nous appliquons des membranes bitumineuses ou élastomères directement sur le mur de fondation après excavation.",
    details: ["Excavation extérieure de la fondation", "Nettoyage et préparation du mur", "Application du primer d'adhérence", "Pose de membrane bitumineuse ou élastomère", "Installation d'une planche de drainage", "Remblaiement et restauration complète"],
    benefits: ["Protection totale contre l'infiltration d'eau", "Solution à long terme", "Compatible avec tout type de fondation", "Garantie écrite pouvant aller jusqu'à 15 ans selon les travaux"],
  },
  {
    id: "excavation", num: "05",
    title: "Excavation",
    icon: <Layers size={20} />,
    heroImg: imgExcavation,
    tagline: "Travaux d'excavation résidentielle et commerciale",
    description: "Nos mini-excavateurs permettent d'intervenir dans des espaces restreints inaccessibles aux équipements conventionnels. Cours arrière étroites, passages latéraux, sous-sols — nous intervenons avec précision.",
    details: ["Excavation pour fondation, drainage ou sous-sol", "Accès aux espaces étroits avec mini-excavateur", "Excavation autour des conduites souterraines", "Terrassement et nivellement", "Chargement et transport des matériaux", "Remblaiement et compaction"],
    benefits: ["Accès aux endroits difficiles d'accès", "Dommages minimaux au terrain environnant", "Équipement adapté à chaque chantier", "Intervention rapide selon les disponibilités"],
  },
  {
    id: "demolition", num: "06",
    title: "Démolition",
    icon: <Hammer size={20} />,
    heroImg: imgDemolition,
    tagline: "Démolition contrôlée et gestion des débris",
    description: "Nous effectuons des travaux de démolition contrôlée pour structures résidentielles et petits bâtiments commerciaux. Notre approche sécuritaire minimise les risques pour les structures adjacentes.",
    details: ["Démolition de structures résidentielles", "Démolition de garages, hangars et annexes", "Démolition de fondations et dalles de béton", "Gestion et chargement des débris", "Transport vers les centres de tri autorisés", "Restauration du site après démolition"],
    benefits: ["Intervention sécuritaire et contrôlée", "Gestion responsable des déchets", "Site propre et prêt pour la prochaine étape", "Entrepreneur général licencié RBQ"],
  },
  {
    id: "egout-sanitaire", num: "07",
    title: "Égout Sanitaire",
    icon: <Waves size={20} />,
    heroImg: imgDrain2,
    tagline: "Réparation et remplacement de conduite d'égout",
    description: "Une conduite d'égout sanitaire défectueuse peut causer des refoulements, des odeurs et des contaminations. Nous diagnostiquons, réparons et remplaçons les sections endommagées de vos conduites.",
    details: ["Inspection caméra préalable", "Excavation ciblée à l'emplacement du bris", "Remplacement de la section endommagée", "Raccordement conforme aux normes", "Test d'étanchéité après les travaux", "Remblaiement et restauration si requis"],
    benefits: ["Fin des refoulements et odeurs", "Travaux conformes aux normes municipales", "Diagnostic précis avant intervention", "Garantie écrite sur les travaux réalisés"],
  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs tracking-[0.18em] text-muted-foreground uppercase ${className}`}
      style={{ fontFamily: FONT_MONO }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs text-primary" style={{ fontFamily: FONT_MONO }}>( {num} )</span>
      <div className="flex-1 h-px bg-border" />
      <Tag>{text}</Tag>
    </div>
  );
}

function CallBtn({ className = "", dark = false, compact = false }: { className?: string; dark?: boolean; compact?: boolean }) {
  return (
    <a
      href={`tel:${COMPANY.phone}`}
      className={`inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-200
        ${compact ? "px-4 py-2.5" : "px-6 py-3.5"}
        ${dark
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
        } ${className}`}
      style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.1em" }}
    >
      <Phone size={14} />
      {COMPANY.phone}
    </a>
  );
}

function OutlineBtn({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-[0.1em] uppercase border border-foreground/20 text-foreground hover:border-foreground/60 transition-colors ${className}`}
      style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.1em" }}
    >
      {children}
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ current, navigate }: { current: Page; navigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servOpen, setServOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navPages: { p: Page; label: string }[] = [
    { p: "home", label: "Accueil" },
    { p: "portfolio", label: "Portfolio" },
    { p: "apropos", label: "À propos" },
    { p: "licences", label: "Licences" },
    { p: "zones", label: "Zones" },
    { p: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Corporate credential strip — always visible */}
      <div className={`transition-all duration-300 overflow-hidden ${scrolled ? "h-0 opacity-0" : "h-auto opacity-100"}`}>
        <div className="bg-primary/10 border-b border-primary/20 px-6 py-1.5">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-xs text-primary/80" style={{ fontFamily: FONT_MONO }}>RBQ : {COMPANY.rbq}</span>
              <span className="text-xs text-muted-foreground hidden sm:block" style={{ fontFamily: FONT_MONO }}>NEQ : {COMPANY.neq}</span>
              <span className="text-xs text-muted-foreground hidden md:block" style={{ fontFamily: FONT_MONO }}>APCHQ : {COMPANY.apchq}</span>
            </div>
            <div className="flex items-center gap-5">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: FONT_MONO }}>
                <Phone size={11} /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: FONT_MONO }}>
                <Mail size={11} /> {COMPANY.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`transition-all duration-300 ${scrolled ? "bg-background/97 backdrop-blur-md border-b border-border shadow-lg" : "bg-background/80 backdrop-blur-sm border-b border-border/40"}`}>
        <div className="max-w-screen-xl mx-auto px-6 h-[60px] flex items-center justify-between">
          <button onClick={() => navigate("home")} className="group flex items-center gap-3">
            <div className="bg-white px-1.5 py-0.5 shrink-0">
              <img src={logoImg} alt="Mini Excavations Érable" className="h-10 w-auto" />
            </div>
            <div className="leading-none hidden sm:block">
              <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.06em" }}>
                MINI EXCAVATIONS ÉRABLE
              </div>
              <div className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>Entrepreneur général</div>
            </div>
          </button>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navPages.map(({ p, label }) => (
              <button key={p} onClick={() => navigate(p)}
                className={`px-3.5 py-2 text-xs font-medium tracking-wider uppercase transition-colors hover:text-foreground
                  ${current === p ? "text-foreground border-b border-primary" : "text-muted-foreground"}`}
                style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.12em" }}
              >
                {label}
              </button>
            ))}
            <div className="relative ml-1">
              <button
                onClick={() => setServOpen(!servOpen)}
                onBlur={() => setTimeout(() => setServOpen(false), 160)}
                className="flex items-center gap-1 px-3.5 py-2 text-xs font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.12em" }}
              >
                Services <ChevronRight size={12} className={`transition-transform ${servOpen ? "rotate-90" : ""}`} />
              </button>
              {servOpen && (
                <div className="absolute top-full right-0 w-64 bg-card border border-border shadow-2xl py-1 mt-1">
                  {SERVICES.map((s) => (
                    <button key={s.id} onClick={() => { navigate(s.id); setServOpen(false); }}
                      className="w-full text-left px-5 py-3 flex items-center justify-between hover:bg-muted transition-colors group"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{s.title}</span>
                      <span className="text-xs text-muted-foreground/40" style={{ fontFamily: FONT_MONO }}>{s.num}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <CallBtn />
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border px-6 pb-8 shadow-xl">
          <div className="py-4 border-b border-border mb-4">
            <CallBtn className="w-full justify-center" />
          </div>
          {navPages.map(({ p, label }) => (
            <button key={p} onClick={() => { navigate(p); setOpen(false); }}
              className="w-full text-left py-3 border-b border-border/30 text-sm text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: FONT_BODY }}
            >
              {label}
            </button>
          ))}
          <p className="text-xs text-muted-foreground/50 mt-5 mb-2 tracking-[0.2em] uppercase" style={{ fontFamily: FONT_MONO }}>Services</p>
          {SERVICES.map((s) => (
            <button key={s.id} onClick={() => { navigate(s.id); setOpen(false); }}
              className="w-full text-left py-2.5 flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: FONT_BODY }}
            >
              <span className="text-xs text-primary/50" style={{ fontFamily: FONT_MONO }}>{s.num}</span>
              {s.title}
            </button>
          ))}
          <div className="mt-5 pt-5 border-t border-border space-y-1 text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
            <p>RBQ : {COMPANY.rbq}</p>
            <p>NEQ : {COMPANY.neq}</p>
            <p>APCHQ : {COMPANY.apchq} — Entrepreneur général</p>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-background border-t border-border mt-0">
      {/* CTA bar */}
      <div className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4" style={{ fontFamily: FONT_MONO }}>
              Soumission gratuite — sans engagement
            </p>
            <h2 className="text-5xl md:text-6xl text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
              PARLONS DE<br />VOTRE PROJET
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <CallBtn dark className="justify-center" />
            <OutlineBtn onClick={() => navigate("contact")} className="justify-center">
              Formulaire <ArrowUpRight size={14} />
            </OutlineBtn>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-5">
            <div className="bg-white inline-block px-2 py-1 mb-2">
              <img src={logoImg} alt="Mini Excavations Érable" className="h-12 w-auto" />
            </div>
            <div className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>Mini Excavations Érable Inc.</div>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
            <p>NEQ : {COMPANY.neq}</p>
            <p>RBQ : {COMPANY.rbq}</p>
            <p>APCHQ : {COMPANY.apchq}</p>
            <p>Entrepreneur général</p>
          </div>
          <div className="mt-5 space-y-2">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone size={13} /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={13} /> {COMPANY.email}
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>Services</p>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <button onClick={() => navigate(s.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  style={{ fontFamily: FONT_BODY }}
                >
                  <span className="text-xs text-muted-foreground/40" style={{ fontFamily: FONT_MONO }}>{s.num}</span>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>Zones desservies</p>
          <ul className="space-y-1.5">
            {ZONES.slice(0, 8).map((z) => (
              <li key={z} className="text-sm text-muted-foreground" style={{ fontFamily: FONT_BODY }}>{z}</li>
            ))}
          </ul>
          <button onClick={() => navigate("zones")} className="mt-3 text-xs text-primary hover:underline flex items-center gap-1" style={{ fontFamily: FONT_MONO }}>
            Voir tout <ArrowRight size={11} />
          </button>
        </div>

        <div>
          <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>Informations</p>
          <ul className="space-y-2">
            {[
              { label: "À propos", page: "apropos" as Page },
              { label: "Portfolio", page: "portfolio" as Page },
              { label: "Licences et garanties", page: "licences" as Page },
              { label: "Zones desservies", page: "zones" as Page },
              { label: "Contact", page: "contact" as Page },
              { label: "Politique de confidentialité", page: "politique" as Page },
              { label: "Conditions d'utilisation", page: "conditions" as Page },
            ].map(({ label, page }) => (
              <li key={page}>
                <button onClick={() => navigate(page)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5 max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
          © {new Date().getFullYear()} {COMPANY.name}
        </p>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
          RBQ {COMPANY.rbq} — NEQ {COMPANY.neq}
        </p>
      </div>
    </footer>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm({ servicePreset = "", compact = false }: { servicePreset?: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: servicePreset, message: "", zone: "" });
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(false);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) throw new Error(data?.error || "submit_failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="border border-border p-8 text-center">
        <CheckCircle size={36} className="text-primary mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">
          Demande reçue. Nous vous rappellerons rapidement.
          <br />Pour une urgence : <a href={`tel:${COMPANY.phone}`} className="text-foreground hover:text-primary">{COMPANY.phone}</a>
        </p>
      </div>
    );
  }

  const inputCls = "w-full bg-muted border border-transparent focus:border-primary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors";

  return (
    <form onSubmit={submit} className="space-y-3">
      {!compact && (
        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-5" style={{ fontFamily: FONT_MONO }}>
          Soumission gratuite
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <input name="name" required value={form.name} onChange={handle} className={inputCls} placeholder="Nom complet" />
        <input name="phone" required value={form.phone} onChange={handle} className={inputCls} placeholder="Téléphone" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="email" type="email" value={form.email} onChange={handle} className={inputCls} placeholder="Courriel" />
        <input name="zone" value={form.zone} onChange={handle} className={inputCls} placeholder="Ville / Zone" />
      </div>
      <select name="service" value={form.service} onChange={handle} className={inputCls}>
        <option value="">— Service requis —</option>
        {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
        <option value="Autre">Autre</option>
      </select>
      <textarea name="message" value={form.message} onChange={handle} rows={compact ? 3 : 4} className={`${inputCls} resize-none`} placeholder="Description du projet" />
      <button type="submit" disabled={sending}
        className="w-full bg-foreground text-background py-3.5 text-sm font-bold tracking-[0.12em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-60"
        style={{ fontFamily: FONT_DISPLAY }}
      >
        {sending ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
      {error && (
        <p className="text-center text-xs text-red-500" style={{ fontFamily: FONT_MONO }}>
          Une erreur est survenue. Appelez-nous au {COMPANY.phone}.
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
        RBQ : {COMPANY.rbq}
      </p>
    </form>
  );
}

// ─── Portfolio Grid ───────────────────────────────────────────────────────────

function PortfolioGrid() {
  const [active, setActive] = useState<(typeof PORTFOLIO)[0] | null>(null);
  const [filter, setFilter] = useState("Tous");
  const cats = ["Tous", ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))];
  const filtered = filter === "Tous" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors border
              ${filter === c
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.1em" }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className="group relative overflow-hidden bg-card border border-border hover:border-primary/40 transition-all text-left"
          >
            <div className="relative h-52 overflow-hidden bg-muted">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="text-xs px-2 py-1 bg-primary text-primary-foreground" style={{ fontFamily: FONT_MONO }}>
                  {p.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-8 h-8 bg-primary flex items-center justify-center">
                  <ArrowUpRight size={14} className="text-primary-foreground" />
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-tight" style={{ fontFamily: FONT_DISPLAY }}>
                  {p.title.toUpperCase()}
                </h3>
                <span className="text-xs text-muted-foreground ml-3 shrink-0" style={{ fontFamily: FONT_MONO }}>{p.year}</span>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={11} className="text-primary shrink-0" />
                <span className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{p.location}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2" style={{ fontFamily: FONT_BODY }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 border border-border text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-muted">
              <img src={active.img} alt={active.title} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-background/80 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-5">
                <span className="text-xs px-2 py-1 bg-primary text-primary-foreground" style={{ fontFamily: FONT_MONO }}>
                  {active.category}
                </span>
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-2xl font-black text-foreground" style={{ fontFamily: FONT_DISPLAY }}>
                  {active.title.toUpperCase()}
                </h3>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{active.year}</span>
              </div>
              <div className="flex items-center gap-1.5 mb-5">
                <MapPin size={12} className="text-primary" />
                <span className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{active.location}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5" style={{ fontFamily: FONT_BODY }}>
                {active.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {active.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 border border-border text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{t}</span>
                ))}
              </div>
              <div className="border-t border-border pt-5 flex items-center justify-between">
                <p className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
                  {COMPANY.name} — RBQ {COMPANY.rbq}
                </p>
                <a href={`tel:${COMPANY.phone}`}
                  className="text-xs text-primary flex items-center gap-1.5 hover:underline"
                  style={{ fontFamily: FONT_MONO }}
                >
                  <Phone size={11} /> {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {visible.map((t) => (
          <div key={t.id} className="bg-background border border-border p-6 flex flex-col">
            <Quote size={20} className="text-primary mb-4 opacity-60" />
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5" style={{ fontFamily: FONT_BODY }}>
              "{t.text}"
            </p>
            <div className="border-t border-border pt-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="text-sm font-semibold text-foreground" style={{ fontFamily: FONT_BODY }}>{t.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1" style={{ fontFamily: FONT_MONO }}>
                    <MapPin size={10} className="text-primary" /> {t.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 justify-end mb-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={11} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{t.date}</div>
                </div>
              </div>
              <span className="inline-block text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 mt-2" style={{ fontFamily: FONT_MONO }}>
                {t.service}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`w-8 h-1 transition-colors ${i === page ? "bg-primary" : "bg-border hover:bg-muted-foreground/40"}`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-2" style={{ fontFamily: FONT_MONO }}>
          {page + 1} / {pages}
        </span>
      </div>

      {/* Leave a review CTA */}
      <div className="mt-8 border border-dashed border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground mb-0.5" style={{ fontFamily: FONT_BODY }}>
            Vous avez fait appel à nos services ?
          </p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
            Partagez votre expérience — votre avis aide d'autres propriétaires à faire le bon choix.
          </p>
        </div>
        <a
          href="https://www.google.com/maps/search/Mini+Excavations+Erable"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 border border-border px-4 py-2.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          style={{ fontFamily: FONT_DISPLAY, letterSpacing: "0.1em" }}
        >
          <ThumbsUp size={13} /> LAISSER UN AVIS GOOGLE
        </a>
      </div>
    </div>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {SEO_FAQ.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-6 py-5 text-left group"
          >
            <span
              className="text-base font-semibold text-foreground group-hover:text-primary transition-colors"
              style={{ fontFamily: FONT_BODY }}
            >
              {item.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-muted-foreground shrink-0 mt-0.5 transition-transform ${open === i ? "rotate-180 text-primary" : ""}`}
            />
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-4" style={{ fontFamily: FONT_BODY }}>
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-end bg-background overflow-hidden">
        {/* Full-bleed photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&h=1100&fit=crop&auto=format"
            alt="Chantier d'excavation Mini Excavations Érable"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/5" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 pt-36 pb-20 w-full">
          {/* Top label row */}
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-white px-2 py-1 shrink-0">
              <img src={logoImg} alt="Mini Excavations Érable" className="h-14 w-auto" />
            </div>
            <div>
              <p className="text-xs text-primary tracking-[0.25em] uppercase mb-0.5" style={{ fontFamily: FONT_MONO }}>
                {COMPANY.name}
              </p>
              <p className="text-xs text-muted-foreground tracking-[0.18em]" style={{ fontFamily: FONT_MONO }}>
                Entrepreneur général — RBQ {COMPANY.rbq} — NEQ {COMPANY.neq}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <h1
                className="font-black text-foreground leading-[0.88] mb-10"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.8rem, 11vw, 9.5rem)" }}
              >
                EXCAVATION<br />
                FONDATION<br />
                <span className="text-primary">DRAINAGE</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-lg leading-relaxed mb-10 font-light" style={{ fontFamily: FONT_BODY }}>
                Spécialistes en excavation, drainage, imperméabilisation et réparation de fondation
                dans la région de Montréal. Licencié RBQ, membre APCHQ.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <CallBtn />
                <OutlineBtn onClick={() => navigate("contact")}>
                  Soumission gratuite <ArrowUpRight size={14} />
                </OutlineBtn>
                <button onClick={() => navigate("licences")}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Voir nos licences <ArrowRight size={11} />
                </button>
              </div>
            </div>

            {/* Side credential card */}
            <div className="lg:col-span-3">
              <div className="border border-border/50 bg-background/60 backdrop-blur-sm p-5">
                <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>
                  Crédentiels
                </p>
                <div className="space-y-3">
                  {[
                    { k: "RBQ", v: COMPANY.rbq },
                    { k: "NEQ", v: COMPANY.neq },
                    { k: "APCHQ", v: COMPANY.apchq },
                    { k: "Type", v: "Entr. général" },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex justify-between items-baseline border-b border-border/30 pb-2 last:border-0 last:pb-0">
                      <span className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{k}</span>
                      <span className="text-xs text-foreground font-medium" style={{ fontFamily: FONT_MONO }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border/60" />
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-border bg-card">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { v: "100+", l: "Projets réalisés" },
              { v: "15+", l: "Années d'expérience" },
              { v: "14+", l: "Villes desservies" },
              { v: "0$", l: "Soumission — sans frais" },
            ].map((s) => (
              <div key={s.l} className="px-8 py-10 text-center">
                <div className="text-4xl font-black text-foreground mb-1" style={{ fontFamily: FONT_DISPLAY }}>{s.v}</div>
                <div className="text-xs text-muted-foreground tracking-wider" style={{ fontFamily: FONT_MONO }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="max-w-screen-xl mx-auto px-6 py-24">
        <SectionLabel num="01" text="Ce que nous faisons" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <h2 className="text-5xl md:text-7xl text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
            NOS SERVICES
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed" style={{ fontFamily: FONT_BODY }}>
            Sept domaines d'expertise, un seul entrepreneur licencié RBQ.
          </p>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-border border-t border-border">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              className="group w-full flex items-center justify-between py-5 px-2 hover:bg-card transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground/40 w-8" style={{ fontFamily: FONT_MONO }}>{s.num}</span>
                <span className="text-primary group-hover:scale-110 transition-transform">{s.icon}</span>
                <span
                  className="text-2xl md:text-3xl font-black text-muted-foreground group-hover:text-foreground transition-colors"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  {s.title.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground hidden md:block" style={{ fontFamily: FONT_BODY }}>
                  {s.tagline}
                </span>
                <ArrowUpRight size={18} className="text-muted-foreground/30 group-hover:text-primary group-hover:scale-110 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Feature image break ── */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=1800&h=700&fit=crop&auto=format"
          alt="Équipement d'excavation Mini Excavations Érable"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-muted-foreground tracking-[0.3em] mb-4" style={{ fontFamily: FONT_MONO }}>
              Région de Montréal
            </p>
            <p
              className="text-4xl md:text-6xl font-black text-foreground"
              style={{ fontFamily: FONT_DISPLAY }}
            >
              MINI-EXCAVATEURS<br />ESPACES RESTREINTS
            </p>
          </div>
        </div>
      </div>

      {/* ── Licences section ── */}
      <section className="max-w-screen-xl mx-auto px-6 py-24">
        <SectionLabel num="02" text="Crédibilité vérifiable" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl text-foreground leading-none mb-8" style={{ fontFamily: FONT_DISPLAY }}>
              LICENCES,<br />ASSURANCES<br />ET GARANTIES
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: FONT_BODY }}>
              {COMPANY.name} est un entrepreneur général détenant une licence RBQ valide.
              Tous nos travaux sont réalisés conformément aux normes de la Régie du bâtiment du Québec.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 border-l-2 border-primary pl-4" style={{ fontFamily: FONT_BODY }}>
              Garantie écrite disponible selon le type de travaux réalisés. Pour certains travaux de
              fondation, de drainage ou d'imperméabilisation, une garantie pouvant aller jusqu'à 15 ans
              peut être offerte, selon la nature du projet, les conditions du chantier et les travaux exécutés.
            </p>
            <OutlineBtn onClick={() => navigate("licences")}>
              Voir nos licences <ArrowRight size={14} />
            </OutlineBtn>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Licence RBQ", value: COMPANY.rbq, icon: <Shield size={18} /> },
              { label: "NEQ Québec", value: COMPANY.neq, icon: <Award size={18} /> },
              { label: "APCHQ", value: COMPANY.apchq, icon: <CheckCircle size={18} /> },
              { label: "Type d'entrepreneur", value: "Entrepreneur général", icon: <Users size={18} /> },
            ].map((c) => (
              <div key={c.label} className="border border-border p-6 hover:border-border/80 transition-colors">
                <span className="text-primary block mb-3">{c.icon}</span>
                <div className="text-xs text-muted-foreground mb-2" style={{ fontFamily: FONT_MONO }}>{c.label}</div>
                <div className="text-sm font-semibold text-foreground leading-snug" style={{ fontFamily: FONT_MONO }}>
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="border-y border-border bg-card py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="03" text="Pourquoi choisir Érable" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { icon: <Shield size={24} />, title: "Licencié RBQ", body: "Entrepreneur général avec licence RBQ valide. Travaux réalisés dans les règles de l'art et conformes aux normes du bâtiment du Québec." },
              { icon: <CheckCircle size={24} />, title: "Garantie écrite", body: "Chaque projet est couvert par une garantie écrite adaptée à la nature des travaux. Votre investissement est documenté et protégé." },
              { icon: <Phone size={24} />, title: "Intervention rapide", body: "Intervention rapide selon les disponibilités et la zone desservie. Appelez-nous pour connaître les délais disponibles." },
            ].map((item) => (
              <div key={item.title} className="bg-card p-8 md:p-10">
                <span className="text-primary block mb-5">{item.icon}</span>
                <h3 className="text-xl font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section className="max-w-screen-xl mx-auto px-6 py-24">
        <SectionLabel num="04" text="Nos réalisations" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <h2 className="text-5xl md:text-7xl text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
            PORTFOLIO
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed" style={{ fontFamily: FONT_BODY }}>
            Quelques projets récents réalisés dans la région de Montréal par notre équipe licenciée RBQ.
          </p>
        </div>

        <PortfolioGrid />
      </section>

      {/* ── Testimonials ── */}
      <section className="border-y border-border bg-card py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="05" text="Ce que disent nos clients" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <h2 className="text-5xl md:text-6xl text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
              AVIS CLIENTS
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-primary fill-primary" />)}
              </div>
              <span className="text-sm text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
                5.0 — Clients vérifiés
              </span>
            </div>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* ── Zones ── */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <SectionLabel num="06" text="Où nous intervenons — drainage Montréal" />
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-5xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>
              ZONES<br />DESSERVIES
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: FONT_BODY }}>
              Grande région de Montréal et environs. Contactez-nous pour confirmer votre secteur.
            </p>
            <OutlineBtn onClick={() => navigate("zones")}>
              Voir la liste complète <ArrowRight size={14} />
            </OutlineBtn>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-2">
            {ZONES.map((z) => (
              <span key={z} className="px-3 py-2 border border-border text-sm text-muted-foreground flex items-center gap-2 hover:border-border/60 transition-colors" style={{ fontFamily: FONT_BODY }}>
                <MapPin size={11} className="text-primary" /> {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO / FAQ ── */}
      <section className="border-y border-border bg-card py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="07" text="Questions fréquentes — drainage & fondation Montréal" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <h2 className="text-5xl md:text-6xl text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
              QUESTIONS<br />FRÉQUENTES
            </h2>
            <div className="flex flex-col gap-2 text-right">
              <div className="flex items-center gap-2 justify-end text-xs text-primary" style={{ fontFamily: FONT_MONO }}>
                <Search size={13} /> drain français montréal
              </div>
              <div className="flex items-center gap-2 justify-end text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
                <TrendingUp size={13} /> imperméabilisation fondation laval
              </div>
              <div className="flex items-center gap-2 justify-end text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
                <FileText size={13} /> entrepreneur général RBQ montréal
              </div>
            </div>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* ── Contact section ── */}
      <section className="border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 py-20">
          <SectionLabel num="08" text="Parlons de votre projet" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-foreground leading-none mb-8" style={{ fontFamily: FONT_DISPLAY }}>
                OBTENEZ VOTRE<br />
                <span className="text-primary">SOUMISSION</span><br />
                GRATUITE
              </h2>
              <div className="space-y-4 mb-8">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>Téléphone direct</div>
                    <div className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{COMPANY.phone}</div>
                  </div>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>Courriel</div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{COMPANY.email}</div>
                  </div>
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Service Page ─────────────────────────────────────────────────────────────

function ServicePage({ service, navigate }: { service: Service; navigate: (p: Page) => void }) {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden bg-[#070707]">
        <img
          src={service.heroImg}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 pb-14 w-full">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4" style={{ fontFamily: FONT_MONO }}>
            <button onClick={() => navigate("home")} className="hover:text-foreground transition-colors">Accueil</button>
            <span>/</span>
            <button onClick={() => navigate("home")} className="hover:text-foreground transition-colors">Services</button>
            <span>/</span>
            <span className="text-foreground">{service.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-primary">{service.icon}</span>
            <Tag>{COMPANY.name} — RBQ {COMPANY.rbq}</Tag>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
            {service.title.toUpperCase()}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg" style={{ fontFamily: FONT_BODY }}>{service.tagline}</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        {/* Credential strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border border-border px-5 py-3 mb-14">
          <span className="text-sm font-bold text-foreground" style={{ fontFamily: FONT_DISPLAY }}>
            {COMPANY.name}
          </span>
          <div className="flex flex-wrap gap-5">
            {[`RBQ : ${COMPANY.rbq}`, `APCHQ : ${COMPANY.apchq}`, "Entrepreneur général"].map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </div>
          <CallBtn compact className="text-xs py-2 px-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>
                À PROPOS DE CE SERVICE
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>{service.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground mb-5" style={{ fontFamily: FONT_DISPLAY }}>
                CE QUE COMPREND LE SERVICE
              </h2>
              <div className="divide-y divide-border border-t border-border">
                {service.details.map((d, i) => (
                  <div key={d} className="flex items-start gap-4 py-3.5">
                    <span className="text-xs text-muted-foreground/40 w-5 shrink-0 mt-0.5" style={{ fontFamily: FONT_MONO }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-muted-foreground" style={{ fontFamily: FONT_BODY }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>AVANTAGES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 border border-border p-4">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground" style={{ fontFamily: FONT_BODY }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border p-6 bg-card">
              <div className="flex items-start gap-4">
                <Shield size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-foreground mb-2" style={{ fontFamily: FONT_DISPLAY }}>GARANTIE ÉCRITE</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
                    Garantie écrite disponible selon le type de travaux réalisés. Pour certains travaux de fondation,
                    de drainage ou d'imperméabilisation, une garantie pouvant aller jusqu'à 15 ans peut être offerte,
                    selon la nature du projet, les conditions du chantier et les travaux exécutés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-border p-6 bg-card">
              <ContactForm servicePreset={service.title} compact />
            </div>

            <div className="border border-border p-6 bg-card">
              <CallBtn className="w-full justify-center mb-3" />
              <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
                Intervention rapide selon les disponibilités
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-3" style={{ fontFamily: FONT_MONO }}>
                Autres services
              </p>
              <div className="divide-y divide-border border-t border-border">
                {SERVICES.filter((s) => s.id !== service.id).map((s) => (
                  <button key={s.id} onClick={() => navigate(s.id)}
                    className="w-full text-left flex items-center justify-between py-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-primary/60 group-hover:text-primary transition-colors">{s.icon}</span>
                      {s.title}
                    </span>
                    <ArrowUpRight size={13} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

function ContactPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-28 pb-20">
      <SectionLabel num="—" text={COMPANY.name} />
      <h1 className="text-6xl md:text-8xl font-black text-foreground leading-none mb-16" style={{ fontFamily: FONT_DISPLAY }}>
        CONTACTEZ-<br />NOUS
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="divide-y divide-border border-t border-b border-border">
            {[
              { l: "Téléphone", v: COMPANY.phone, href: `tel:${COMPANY.phone}`, icon: <Phone size={16} /> },
              { l: "Courriel", v: COMPANY.email, href: `mailto:${COMPANY.email}`, icon: <Mail size={16} /> },
            ].map((c) => (
              <a key={c.l} href={c.href} className="flex items-center gap-5 py-5 group">
                <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5" style={{ fontFamily: FONT_MONO }}>{c.l}</div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{c.v}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="border border-border p-6 bg-card">
            <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>Informations légales</p>
            <div className="space-y-2 text-xs" style={{ fontFamily: FONT_MONO }}>
              {[
                ["Entreprise", COMPANY.name],
                ["NEQ", COMPANY.neq],
                ["RBQ", COMPANY.rbq],
                ["APCHQ", COMPANY.apchq],
                ["Type", "Entrepreneur général"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground text-right max-w-[55%]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-3" style={{ fontFamily: FONT_MONO }}>Zones desservies</p>
            <div className="flex flex-wrap gap-1.5">
              {ZONES.map((z) => (
                <span key={z} className="text-xs px-2.5 py-1.5 border border-border text-muted-foreground" style={{ fontFamily: FONT_BODY }}>{z}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-border p-6 md:p-8 bg-card">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

// ─── Licences Page ────────────────────────────────────────────────────────────

function LicencesPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 pt-28 pb-20">
      <SectionLabel num="—" text="Transparence et crédibilité" />
      <h1 className="text-6xl md:text-7xl font-black text-foreground leading-none mb-14" style={{ fontFamily: FONT_DISPLAY }}>
        LICENCES,<br />ASSURANCES<br />& GARANTIES
      </h1>

      <div className="space-y-6">
        <div className="border border-border p-8 bg-card">
          <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: FONT_BODY }}>
            <strong className="text-foreground">{COMPANY.name}</strong> est un entrepreneur général
            détenant une licence RBQ valide. Tous nos travaux sont réalisés par des professionnels
            qualifiés, conformément aux exigences de la Régie du bâtiment du Québec.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Licence RBQ", value: COMPANY.rbq, icon: <Shield size={20} /> },
              { label: "NEQ Québec", value: COMPANY.neq, icon: <Award size={20} /> },
              { label: "Membre APCHQ", value: COMPANY.apchq, icon: <CheckCircle size={20} /> },
              { label: "Entrepreneur", value: "Général", icon: <Users size={20} /> },
            ].map((c) => (
              <div key={c.label} className="border border-border p-5 bg-background">
                <span className="text-primary block mb-3">{c.icon}</span>
                <div className="text-xs text-muted-foreground mb-1" style={{ fontFamily: FONT_MONO }}>{c.label}</div>
                <div className="text-sm font-bold text-foreground" style={{ fontFamily: FONT_MONO }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-8 bg-card">
          <h2 className="text-2xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>GARANTIES</h2>
          <div className="border-l-2 border-primary pl-5 mb-5">
            <p className="text-sm text-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
              Garantie écrite disponible selon le type de travaux réalisés. Pour certains travaux de
              fondation, de drainage ou d'imperméabilisation, une garantie pouvant aller jusqu'à{" "}
              <strong>15 ans</strong> peut être offerte, selon la nature du projet, les conditions
              du chantier et les travaux exécutés.
            </p>
          </div>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: FONT_BODY }}>
            Les détails de la garantie sont précisés dans la soumission et le contrat de travaux.
          </p>
        </div>

        <div className="border border-border p-8 bg-card">
          <h2 className="text-2xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>VÉRIFICATION EN LIGNE</h2>
          <div className="divide-y divide-border">
            {[
              { label: "Régie du bâtiment du Québec (RBQ)", url: "https://www.rbq.gouv.qc.ca/", value: `Licence ${COMPANY.rbq}` },
              { label: "Registraire des entreprises du Québec", url: "https://www.registreentreprises.gouv.qc.ca/", value: `NEQ ${COMPANY.neq}` },
            ].map((l) => (
              <div key={l.label} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <div className="text-sm text-foreground" style={{ fontFamily: FONT_BODY }}>{l.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: FONT_MONO }}>{l.value}</div>
                </div>
                <a href={l.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1.5 hover:underline"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Vérifier <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zones Page ───────────────────────────────────────────────────────────────

function ZonesPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="max-w-screen-lg mx-auto px-6 pt-28 pb-20">
      <SectionLabel num="—" text="Région de Montréal et environs" />
      <h1 className="text-6xl md:text-7xl font-black text-foreground leading-none mb-12" style={{ fontFamily: FONT_DISPLAY }}>
        ZONES<br />DESSERVIES
      </h1>
      <div className="border border-border p-8 bg-card mb-6">
        <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: FONT_BODY }}>
          {COMPANY.name} intervient dans la grande région de Montréal et ses environs.
          Contactez-nous pour confirmer la disponibilité dans votre secteur.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {ZONES.map((z) => (
            <div key={z} className="flex items-center gap-2 border border-border px-4 py-3 bg-background">
              <MapPin size={12} className="text-primary shrink-0" />
              <span className="text-sm text-foreground" style={{ fontFamily: FONT_BODY }}>{z}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" style={{ fontFamily: FONT_BODY }}>
          Votre ville n'est pas dans la liste ? Contactez-nous.
        </p>
        <div className="flex gap-3">
          <CallBtn dark />
          <OutlineBtn onClick={() => navigate("contact")}>Formulaire</OutlineBtn>
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AproposPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 pt-28 pb-20">
      <SectionLabel num="—" text="Qui sommes-nous" />
      <h1 className="text-6xl md:text-7xl font-black text-foreground leading-none mb-10" style={{ fontFamily: FONT_DISPLAY }}>
        À PROPOS
      </h1>

      <div className="relative h-64 mb-12 overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=1200&h=400&fit=crop&auto=format"
          alt="Chantier Mini Excavations Érable"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border p-8 bg-card md:col-span-2">
          <h2 className="text-2xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>
            {COMPANY.name.toUpperCase()}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: FONT_BODY }}>
            {COMPANY.name} est une entreprise spécialisée dans les travaux d'excavation,
            de drainage, d'imperméabilisation et de réparation de fondation dans la région
            de Montréal et ses environs. Notre équipe intervient sur des chantiers résidentiels
            et commerciaux avec précision et efficacité.
          </p>
          <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
            Grâce à nos mini-excavateurs, nous pouvons accéder à des espaces restreints
            inaccessibles aux équipements conventionnels — cours arrière étroites, passages
            latéraux, zones densément construites — sans compromettre la qualité des travaux.
          </p>
        </div>

        <div className="border border-border p-8 bg-card">
          <h3 className="text-xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>NOTRE MISSION</h3>
          <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
            Offrir des travaux d'excavation et de drainage de qualité supérieure, réalisés par des
            professionnels licenciés, dans le respect des normes RBQ et des délais convenus.
          </p>
        </div>
        <div className="border border-border p-8 bg-card">
          <h3 className="text-xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>NOS VALEURS</h3>
          <ul className="space-y-2" style={{ fontFamily: FONT_BODY }}>
            {["Transparence et honnêteté", "Qualité des travaux réalisés", "Respect des délais", "Sécurité sur chaque chantier"].map((v) => (
              <li key={v} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="w-1 h-1 bg-primary shrink-0" /> {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-border p-6 bg-card md:col-span-2">
          <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>Informations légales</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs" style={{ fontFamily: FONT_MONO }}>
            {[["NEQ", COMPANY.neq], ["RBQ", COMPANY.rbq], ["APCHQ", COMPANY.apchq], ["Type", "Entrepreneur général"]].map(([k, v]) => (
              <div key={k} className="border border-border p-3 bg-background">
                <div className="text-muted-foreground mb-1">{k}</div>
                <div className="text-foreground font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Legal ────────────────────────────────────────────────────────────────────

// ─── Portfolio Page ───────────────────────────────────────────────────────────

function PortfolioPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-28 pb-20">
      <SectionLabel num="—" text="Nos réalisations — RBQ 5823-7736-01" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
        <h1 className="text-6xl md:text-8xl font-black text-foreground leading-none" style={{ fontFamily: FONT_DISPLAY }}>
          PORTFOLIO
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed" style={{ fontFamily: FONT_BODY }}>
          Projets de drainage, imperméabilisation, excavation et réparation de fondation réalisés
          dans la grande région de Montréal par notre équipe licenciée RBQ.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-border border border-border bg-card mb-12">
        {[
          { v: "100+", l: "Projets réalisés" },
          { v: "7", l: "Types de services" },
          { v: "14+", l: "Villes desservies" },
        ].map((s) => (
          <div key={s.l} className="px-6 py-6 text-center">
            <div className="text-3xl font-black text-primary mb-1" style={{ fontFamily: FONT_DISPLAY }}>{s.v}</div>
            <div className="text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{s.l}</div>
          </div>
        ))}
      </div>

      <PortfolioGrid />

      {/* Note */}
      <div className="mt-12 border border-dashed border-border p-6">
        <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_MONO }}>
          Les photos présentées sont représentatives des types de travaux réalisés par {COMPANY.name}.
          Tous les travaux sont effectués par un entrepreneur général détenteur d'une licence RBQ valide (RBQ : {COMPANY.rbq}).
          Pour un projet similaire, appelez-nous au {COMPANY.phone} ou remplissez notre formulaire de soumission en ligne.
        </p>
      </div>
    </div>
  );
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      <h1 className="text-5xl font-black text-foreground mb-10" style={{ fontFamily: FONT_DISPLAY }}>{title}</h1>
      <div className="border border-border p-8 bg-card space-y-6 text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
        {children}
        <div className="pt-5 border-t border-border text-xs" style={{ fontFamily: FONT_MONO }}>
          {COMPANY.name} — NEQ : {COMPANY.neq} — RBQ : {COMPANY.rbq}
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

// ─── Routing : URLs réelles + SEO par page ──────────────────────────────────

const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  "drain-francais": "/services/drain-francais",
  "reparation-fissures": "/services/reparation-fissures",
  "inspection-camera": "/services/inspection-camera",
  impermeabilisation: "/services/impermeabilisation",
  excavation: "/services/excavation",
  demolition: "/services/demolition",
  "egout-sanitaire": "/services/egout-sanitaire",
  contact: "/contact",
  licences: "/licences",
  zones: "/zones",
  apropos: "/a-propos",
  politique: "/politique-confidentialite",
  conditions: "/conditions",
  portfolio: "/portfolio",
};
const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([p, u]) => [u, p as Page])
) as Record<string, Page>;

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const cityFromSlug = (slug: string) =>
  ZONES.find((z) => slugify(z) === slug) || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

function useRouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const base = "https://excavationserable.com";
    let title = "Mini Excavations Érable — Excavation, drainage et fondation à Montréal";
    let desc = "Entrepreneur général licencié RBQ à Montréal et Rive-Sud : drain français, imperméabilisation, réparation de fissures, excavation et inspection par caméra. Soumission gratuite — (514) 830-9973.";
    if (pathname.startsWith("/services/")) {
      const s = SERVICES.find((x) => x.id === pathname.split("/")[2]);
      if (s) { title = `${s.title} à Montréal et Rive-Sud | Mini Excavations Érable`; desc = s.description.slice(0, 158); }
    } else if (pathname.startsWith("/excavation/")) {
      const city = cityFromSlug(pathname.split("/")[2] || "");
      title = `Excavation et drain français à ${city} | Mini Excavations Érable`;
      desc = `Excavation, drain français, imperméabilisation et réparation de fissures à ${city}. Entrepreneur licencié RBQ, membre APCHQ. Soumission gratuite — (514) 830-9973.`;
    } else if (pathname === "/contact") {
      title = "Contact — Soumission gratuite | Mini Excavations Érable";
      desc = "Demandez votre soumission gratuite pour vos travaux d'excavation, de drain français ou de fondation. Appelez le (514) 830-9973.";
    } else if (pathname === "/portfolio") {
      title = "Réalisations — Projets d'excavation et de drainage | Mini Excavations Érable";
      desc = "Découvrez nos réalisations : drains français, imperméabilisation, réparation de fissures, excavation et démolition dans le Grand Montréal.";
    } else if (pathname === "/licences") {
      title = "Licences et garanties — RBQ 5823-7736-01 | Mini Excavations Érable";
      desc = "Entrepreneur général licencié RBQ (5823-7736-01), membre APCHQ. Garanties écrites sur les travaux de fondation et de drainage.";
    } else if (pathname === "/zones") {
      title = "Zones desservies — Montréal, Laval, Rive-Sud | Mini Excavations Érable";
      desc = "Nous desservons Montréal, Laval, Longueuil, Brossard et tout le Grand Montréal pour vos travaux d'excavation et de drainage.";
    } else if (pathname === "/a-propos") {
      title = "À propos — Entrepreneur en excavation | Mini Excavations Érable";
      desc = "Mini Excavations Érable Inc. : entrepreneur général spécialisé en excavation, drainage et fondation dans la région de Montréal.";
    }
    document.title = title;
    setMeta("description", desc);
    setCanonical(base + pathname);
  }, [pathname]);
}

function useNav() {
  const nav = useNavigate();
  return (p: Page) => {
    nav(PAGE_PATHS[p] ?? "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
}

function ServiceRoute({ navigate }: { navigate: (p: Page) => void }) {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return <NotFoundPage navigate={navigate} />;
  return <ServicePage service={service} navigate={navigate} />;
}

function CityPage({ navigate }: { navigate: (p: Page) => void }) {
  const { ville } = useParams();
  const city = cityFromSlug(ville || "");
  return (
    <div className="pt-28">
      <section className="max-w-screen-xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs text-primary tracking-[0.25em] uppercase mb-3" style={{ fontFamily: FONT_MONO }}>
          Zone desservie · {city}
        </p>
        <h1 className="font-black text-foreground leading-[0.9] mb-6" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.6rem, 7vw, 5rem)" }}>
          EXCAVATION &amp; DRAIN FRANÇAIS<br />À {city.toUpperCase()}
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-8" style={{ fontFamily: FONT_BODY }}>
          Mini Excavations Érable intervient à {city} et dans les environs : installation de drain français,
          imperméabilisation de fondation, réparation de fissures, excavation en espace restreint et démolition.
          Entrepreneur général licencié RBQ. Soumission gratuite.
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <CallBtn />
          <OutlineBtn onClick={() => navigate("contact")}>Soumission gratuite <ArrowUpRight size={14} /></OutlineBtn>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 py-12">
        <SectionLabel num="01" text={`Nos services à ${city}`} />
        <div className="divide-y divide-border border-t border-border">
          {SERVICES.map((s) => (
            <button key={s.id} onClick={() => navigate(s.id)}
              className="group w-full flex items-center justify-between py-4 px-2 hover:bg-card transition-all text-left">
              <div className="flex items-center gap-5">
                <span className="text-primary">{s.icon}</span>
                <span className="text-xl md:text-2xl font-black text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontFamily: FONT_DISPLAY }}>
                  {s.title.toUpperCase()}
                </span>
              </div>
              <ArrowUpRight size={18} className="text-muted-foreground/30 group-hover:text-primary transition-all" />
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4" style={{ fontFamily: FONT_DISPLAY }}>
            UNE QUESTION À {city.toUpperCase()} ?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: FONT_BODY }}>
            Demandez votre soumission gratuite — nous vous rappelons rapidement. Licencié RBQ {COMPANY.rbq}, membre APCHQ.
          </p>
          <CallBtn dark />
        </div>
        <ContactForm servicePreset="" />
      </section>
    </div>
  );
}

function NotFoundPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="pt-40 pb-32 text-center max-w-screen-md mx-auto px-6">
      <p className="text-xs text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: FONT_MONO }}>Erreur 404</p>
      <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6" style={{ fontFamily: FONT_DISPLAY }}>PAGE INTROUVABLE</h1>
      <p className="text-sm text-muted-foreground mb-8" style={{ fontFamily: FONT_BODY }}>
        La page demandée n'existe pas ou a été déplacée.
      </p>
      <OutlineBtn onClick={() => navigate("home")}>Retour à l'accueil <ArrowUpRight size={14} /></OutlineBtn>
    </div>
  );
}

function PolitiquePage() {
  return (
    <LegalPage title="POLITIQUE DE CONFIDENTIALITÉ">
      <div>
        <h2 className="text-lg font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>1. COLLECTE D'INFORMATIONS</h2>
        <p>{COMPANY.name} collecte uniquement les informations nécessaires au traitement de vos demandes de soumission : nom, coordonnées, description du projet et zone géographique.</p>
      </div>
      <div>
        <h2 className="text-lg font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>2. UTILISATION DES DONNÉES</h2>
        <p>Vos informations sont utilisées exclusivement pour vous contacter concernant votre projet et préparer une soumission. Elles ne sont jamais vendues ni partagées avec des tiers à des fins commerciales.</p>
      </div>
      <div>
        <h2 className="text-lg font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>3. CONTACT</h2>
        <p>Pour toute question : <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
      </div>
    </LegalPage>
  );
}

function ConditionsPage() {
  return (
    <LegalPage title="CONDITIONS D'UTILISATION">
      <div>
        <h2 className="text-lg font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>1. UTILISATION DU SITE</h2>
        <p>Ce site est fourni à titre informatif par {COMPANY.name}. En consultant ce site, vous acceptez les présentes conditions.</p>
      </div>
      <div>
        <h2 className="text-lg font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>2. INFORMATIONS FOURNIES</h2>
        <p>Les informations présentées sont fournies de bonne foi. {COMPANY.name} se réserve le droit de les modifier sans préavis. Toute soumission doit être confirmée par écrit.</p>
      </div>
      <div>
        <h2 className="text-lg font-black text-foreground mb-3" style={{ fontFamily: FONT_DISPLAY }}>3. RESPONSABILITÉ</h2>
        <p>{COMPANY.name} ne saurait être tenu responsable de toute erreur ou omission dans le contenu de ce site. La réalisation des travaux est soumise aux termes du contrat signé avec le client.</p>
      </div>
    </LegalPage>
  );
}

function Layout() {
  const navigate = useNav();
  const { pathname } = useLocation();
  const current = (PATH_TO_PAGE[pathname] ?? "home") as Page;
  useRouteSeo();
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: FONT_BODY }}>
      <Navbar current={current} navigate={navigate} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route path="/services/:slug" element={<ServiceRoute navigate={navigate} />} />
          <Route path="/excavation/:ville" element={<CityPage navigate={navigate} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/licences" element={<LicencesPage />} />
          <Route path="/zones" element={<ZonesPage navigate={navigate} />} />
          <Route path="/a-propos" element={<AproposPage />} />
          <Route path="/politique-confidentialite" element={<PolitiquePage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="*" element={<NotFoundPage navigate={navigate} />} />
        </Routes>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
