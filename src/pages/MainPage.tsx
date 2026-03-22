export default function MainPage() {
  return (
    <main className="page">
      {/* Pindahkan video ke sini agar konsisten di seluruh scroll */}
      <div className="global-video-bg">
        <video
          src="/videos/ventho-main.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="global-overlay" />
      </div>
    </main>
  );
}