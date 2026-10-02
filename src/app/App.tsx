import { useState } from "react";
import { motion } from "motion/react";
import { ParticleCanvas, NavBar } from "../ChronicleKit";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import HomePage from "./HomePage";
import ProjectsPage from "./ProjectsPage";
import ProfilePage from "./ProfilePage";
import PawGuardiansPage from "./PawGuardiansPage";
import MagicFitO20Page from "./MagicFitO20Page";
import QinQiangPage from "./QinQiangPage";
import EchoesOfHealingPage from "./EchoesOfHealingPage";
import ArborGuardianPage from "./ArborGuardianPage";
import SAGEPage from "./SAGEPage";

type Page = "home" | "projects" | "profile" | "pawGuardians" | "magicFitO20" | "qinQiang" | "echoesOfHealing" | "arborGuardian" | "sage";

function LangToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      className="font-mono tracking-widest transition-colors duration-200 hover:text-primary text-muted-foreground/60"
      style={{ fontSize: "0.65rem", letterSpacing: "0.12em", padding: "4px 10px", border: "1px solid rgba(90,176,232,0.22)", borderRadius: "2px", background: "rgba(90,176,232,0.04)" }}
    >
      {lang === "zh" ? "EN" : "简中"}
    </button>
  );
}

function AppInner() {
  const [page, setPage] = useState<Page>("home");
  const { lang } = useLanguage();

  const navigate = (to: Page) => {
    setPage(to);
    window.scrollTo(0, 0);
  };

  const navLabels = {
    home:     lang === "zh" ? "首页"    : "Home",
    projects: lang === "zh" ? "项目展示" : "Projects",
    profile:  lang === "zh" ? "个人资料" : "Profile",
  };

  const navLinks = [
    { label: navLabels.home,     onClick: () => navigate("home") },
    { label: navLabels.projects, onClick: () => navigate("projects") },
    { label: navLabels.profile,  onClick: () => navigate("profile") },
  ];

  const activeLabel =
    page === "home"
      ? navLabels.home
      : page === "profile"
      ? navLabels.profile
      : navLabels.projects;

  return (
    <div
      className="min-h-screen text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Space Grotesk', 'Noto Serif SC', system-ui, sans-serif" }}
    >
      {/* ── Fixed full-page particle canvas — persists through all pages ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* ── Global fixed NavBar ── */}
      <NavBar
        links={navLinks}
        logoCode="CR-∞"
        activeLabel={activeLabel}
        rightSlot={<LangToggle />}
      />

      {/* ── Page content — fades in on switch ── */}
      <motion.div
        key={page}
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {page === "home" ? (
          <HomePage
            onNavigateToProjects={() => navigate("projects")}
            onNavigateToProfile={() => navigate("profile")}
            onNavigateToProject={(id) => navigate(id as Page)}
          />
        ) : page === "projects" ? (
          <ProjectsPage onNavigate={(p) => navigate(p as Page)} />
        ) : page === "pawGuardians" ? (
          <PawGuardiansPage onBack={() => navigate("projects")} />
        ) : page === "magicFitO20" ? (
          <MagicFitO20Page onBack={() => navigate("projects")} />
        ) : page === "qinQiang" ? (
          <QinQiangPage onBack={() => navigate("projects")} />
        ) : page === "echoesOfHealing" ? (
          <EchoesOfHealingPage onBack={() => navigate("projects")} />
        ) : page === "arborGuardian" ? (
          <ArborGuardianPage onBack={() => navigate("projects")} />
        ) : page === "sage" ? (
          <SAGEPage onBack={() => navigate("projects")} />
        ) : (
          <ProfilePage />
        )}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
