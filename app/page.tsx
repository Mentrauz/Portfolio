import { Suspense } from "react"
import RedesignedHero from "@/components/redesigned-hero"
import AboutSection from "@/components/about-section"
import SkillsSectionWrapper from "@/components/skills-section-wrapper"
import RedesignedExperience from "@/components/redesigned-experience"
import RedesignedProjects from "@/components/redesigned-projects"
import Education from "@/components/education"
import Testimonials from "@/components/testimonials"
import EnhancedFooter from "@/components/enhanced-footer"
import FloatingNav from "@/components/floating-nav"
import ScrollProgress from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionFallback } from "@/components/section-fallback"
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton"
import { AboutSkeleton } from "@/components/skeletons/about-skeleton"
import { ExperienceSkeleton } from "@/components/skeletons/experience-skeleton"
import { ProjectsSkeleton } from "@/components/skeletons/projects-skeleton"
import { SkillsSkeleton } from "@/components/skeletons/skills-skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <ScrollProgress />
      <FloatingNav />

      <ErrorBoundary fallback={<SectionFallback title="Hero" />}>
        <Suspense fallback={<HeroSkeleton />}>
          <RedesignedHero />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="About" />}>
        <Suspense fallback={<AboutSkeleton />}>
          <AboutSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Skills" />}>
        <SkillsSectionWrapper />
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Experience" />}>
        <Suspense fallback={<ExperienceSkeleton />}>
          <RedesignedExperience />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Projects" />}>
        <Suspense fallback={<ProjectsSkeleton />}>
          <RedesignedProjects />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Education" />}>
        <Suspense fallback={<SkillsSkeleton />}>
          <Education />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Testimonials" />}>
        <Suspense fallback={<SkillsSkeleton />}>
          <Testimonials />
        </Suspense>
      </ErrorBoundary>

      <EnhancedFooter />
    </main>
  )
}
