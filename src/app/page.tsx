import { SmoothScrollProvider } from "@/components/landing/SmoothScrollProvider";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import Navbar from "@/components/landing/Navbar";
import ScrollytellingPage from "@/components/landing/ScrollytellingPage";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <ScrollytellingPage />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
