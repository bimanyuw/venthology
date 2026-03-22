import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Mengambil data koordinat dan ukuran dari photoData.ts
import { floatingPhotos, finalShowcasePhoto } from "../../data/photoData";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".memory-card");
      const finalCard = document.querySelector(".memory-final") as HTMLElement | null;
      const copy = document.querySelector(".memory-copy") as HTMLElement | null;

      // 1. Initial State: Foto diletakkan di posisi target (x, y) 
      // tetapi dimulai dari kondisi sangat kecil (scale: 0.1) dan transparan
      cards.forEach((card, index) => {
        const data = floatingPhotos[index];
        gsap.set(card, {
          opacity: 0,
          scale: 0.1, // Mulai dari "kejauhan"
          x: data.x,  // Berdasarkan koordinat di photoData.ts
          y: data.y,
          rotation: data.rotate || 0,
          zIndex: data.z || 1,
        });
      });

      // Menyiapkan kondisi awal untuk reveal final
      if (finalCard) {
        gsap.set(finalCard, {
          opacity: 0,
          clipPath: "inset(0 0 0 100%)",
          scale: 1.1, // Dimulai sedikit lebih besar untuk efek zoom-out nantinya
        });
      }

      if (copy) {
        gsap.set(copy, { opacity: 0, y: 30 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000", // Durasi scroll diperpanjang agar animasi terasa lebih megah
          scrub: 1.5,    // Scrub lebih tinggi agar gerakan terasa lebih smooth/berat
          pin: true,
        },
      });

      // 2. Animasi "Dilempar ke Kamera": Foto mendekat dan membesar satu per satu
      cards.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          scale: 1, // Membesar ke ukuran asli
          duration: 1,
          ease: "power2.out",
        }, index === 0 ? 0.2 : ">-0.7"); // Muncul bertumpuk (overlay timing)
      });

      // Memberikan jeda singkat setelah semua foto collage terbentuk
      tl.to({}, { duration: 0.5 });

      // 3. Reveal Final: Collage memudar menjauh, foto utama masuk
      tl.to(cards, {
        opacity: 0.1,
        scale: 0.7, // Mengecil kembali untuk memberi kesan fokus berpindah
        duration: 0.8,
        ease: "power2.inOut",
      });

      if (finalCard) {
        tl.to(finalCard, {
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
          scale: 1, // Zoom-out ke ukuran normal
          duration: 1.5,
          ease: "expo.inOut"
        }, "<"); // Berbarengan dengan memudarnya collage
      }

      if (copy) {
        tl.to(copy, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, "-=0.6");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="memory-section" ref={sectionRef}>
      {/* Overlay untuk kedalaman visual */}
      <div className="memory-overlay" />

      <div className="memory-stage">
        {/* Mapping data foto dari data/photoData.ts */}
        {floatingPhotos.map((photo) => (
          <div key={photo.id} className={`memory-card card-${photo.id}`}>
            <img 
              src={photo.src} 
              alt={photo.alt} 
              style={{ width: photo.width, height: photo.height }} // Menggunakan ukuran asli dari data
            />
          </div>
        ))}

        {/* Foto Reveal Final */}
        <div className="memory-final">
          <img src={finalShowcasePhoto.src} alt={finalShowcasePhoto.alt} />
        </div>

        {/* Teks Keterangan */}
        <div className="memory-copy">
          <p className="memory-kicker">Venthology</p>
          <h2>A few frames, one small story.</h2>
        </div>
      </div>
    </section>
  );
}