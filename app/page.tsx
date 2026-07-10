import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import GithubSection from "@/components/github/GithubSection";
import GithubSectionSkeleton from "@/components/github/GithubSectionSkeleton";
import TechStack from "@/components/TechStack";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Suspense fallback={<GithubSectionSkeleton />}>
        <GithubSection />
      </Suspense>
      <TechStack />
    </main>
  );
}
