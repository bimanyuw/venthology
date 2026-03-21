import { motion } from "framer-motion";

export default function HeroVideoSection() {
  return (
    <section className="hero-video-section">
      <video
        className="hero-video"
        src="/videos/ventho-main.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="hero-overlay">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="subtitle">Venthology</p>
          <h2 className="title">A small page full of little moments.</h2>
          <p>
            Satu video, beberapa potongan kenangan, dan sedikit hal kecil yang
            sengaja dikumpulkan di satu tempat.
          </p>
        </motion.div>
      </div>
    </section>
  );
}