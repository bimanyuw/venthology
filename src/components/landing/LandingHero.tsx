import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="landing-hero">
      <motion.div
        className="landing-box"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Venthology
        </motion.p>

        <motion.h1
          className="title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Halo Ventho,
          <br />
          aku bikinin sesuatu buat kamu.
        </motion.h1>

        <motion.p
          className="subtitle"
          style={{ marginTop: 16 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          Di sini ada sedikit pesan, permainan kecil, beberapa kenangan, dan
          tentu saja sesuatu di akhir.
        </motion.p>

        <div className="landing-actions">
          <button className="btn btn-primary" onClick={() => navigate("/quiz")}>
            Mulai
          </button>
        </div>
      </motion.div>
    </section>
  );
}