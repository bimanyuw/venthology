import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { id: 1, src: "/photos/photo1.jpg", alt: "Memory 1" },
  { id: 2, src: "/photos/photo2.jpg", alt: "Memory 2" },
  { id: 3, src: "/photos/photo3.jpg", alt: "Memory 3" },
  { id: 4, src: "/photos/photo4.jpg", alt: "Memory 4" },
];

export default function PhotoStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".memory-card");
      const finalCard = document.querySelector(".memory-final") as HTMLElement | null;
      const copy = document.querySelector(".memory-copy") as HTMLElement | null;

      gsap.set(cards, {
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      if (finalCard) {
        gsap.set(finalCard, {
          opacity: 0,
          clipPath: "inset(0 0 0 100%)",
          scale: 1.04,
        });
      }

      if (copy) {
        gsap.set(copy, {
          opacity: 0,
          y: 24,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          index === 0 ? 0.2 : ">-0.1"
        );
      });

      tl.to(
        cards,
        {
          opacity: 0.18,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.05,
        },
        ">+0.25"
      );

      if (finalCard) {
        tl.to(
          finalCard,
          {
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
            scale: 1,
            duration: 0.9,
            ease: "power3.inOut",
          },
          "<"
        );
      }

      if (copy) {
        tl.to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.45"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="memory-section" ref={sectionRef}>
      <video
        className="memory-bg-video"
        src="/videos/ventho-main.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="memory-overlay" />

      <div className="memory-stage">
        <div className="memory-card card-1">
          <img src={photos[0].src} alt={photos[0].alt} />
        </div>

        <div className="memory-card card-2">
          <img src={photos[1].src} alt={photos[1].alt} />
        </div>

        <div className="memory-card card-3">
          <img src={photos[2].src} alt={photos[2].alt} />
        </div>

        <div className="memory-card card-4">
          <img src={photos[3].src} alt={photos[3].alt} />
        </div>

        <div className="memory-final">
          <img src="/photos/photo5.jpg" alt="Final memory" />
        </div>

        <div className="memory-copy">
          <p className="memory-kicker">Venthology</p>
          <h2>A few frames, one small story.</h2>
        </div>
      </div>
    </section>
  );
}