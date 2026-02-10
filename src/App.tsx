import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SyllabusCards } from "@/components/SyllabusCards";
import { CollectionsTable } from "@/components/CollectionsTable";
import { CoreProblemsSection } from "@/components/CoreProblemsSection";
import { AdvancedProblemsSection } from "@/components/AdvancedProblemsSection";
import { ArchetypesSection } from "@/components/ArchetypesSection";
import { ModernJavaSection } from "@/components/ModernJavaSection";
import { ReferencesSection } from "@/components/ReferencesSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TableOfContents } from "@/components/TableOfContents";

export function App() {
    return (
        <div className="min-h-screen bg-background text-foreground font-body antialiased selection:bg-primary/20 selection:text-primary">
            <Navbar />

            <main className="flex flex-col">
                <HeroSection />
                <SyllabusCards />
                <CollectionsTable />
                <CoreProblemsSection />
                <AdvancedProblemsSection />
                <ArchetypesSection />
                <ModernJavaSection />
                <ReferencesSection />
            </main>

            <TableOfContents />
            <ScrollToTop />
            <Footer />
        </div>
    );
}
