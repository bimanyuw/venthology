import HeroVideoSection from "../components/main/HeroVideoSection";
import PhotoStorySection from "../components/main/PhotoStorySection";
import ClosingSection from "../components/main/ClosingSection";

export default function MainPage() {
  return (
    <main className="page">
      <HeroVideoSection />
      <PhotoStorySection />
      <ClosingSection />
    </main>
  );
}