import { useEffect, useMemo, useState } from "react";
import { memoryPhotos, type MemoryPhotoItem } from "../../data/memoryPhotos";

type MemoryCard = {
  id: number;
  item: MemoryPhotoItem;
};

type MemoryGameProps = {
  onComplete: () => void;
};

function shuffle<T>(array: T[]) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

export default function MemoryGame({ onComplete }: MemoryGameProps) {
  const cards = useMemo<MemoryCard[]>(
    () =>
      shuffle(
        memoryPhotos.flatMap((item, index) => [
          { id: index * 2 + 1, item },
          { id: index * 2 + 2, item },
        ])
      ),
    []
  );

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [imageErrorIds, setImageErrorIds] = useState<number[]>([]);

  const isCompleted = matched.length === memoryPhotos.length;

  const handleFlip = (card: MemoryCard) => {
    if (isCompleted) return;
    if (flipped.includes(card.id)) return;
    if (matched.includes(card.item.id)) return;
    if (flipped.length === 2) return;

    setFlipped((prev) => [...prev, card.id]);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;

    const first = cards.find((card) => card.id === flipped[0]);
    const second = cards.find((card) => card.id === flipped[1]);

    if (!first || !second) return;

    if (first.item.id === second.item.id) {
      setMatched((prev) => {
        if (prev.includes(first.item.id)) return prev;
        return [...prev, first.item.id];
      });
      setFlipped([]);
      return;
    }

    const timer = window.setTimeout(() => {
      setFlipped([]);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [flipped, cards]);

  const markImageError = (itemId: number) => {
    setImageErrorIds((prev) =>
      prev.includes(itemId) ? prev : [...prev, itemId]
    );
  };

  return (
    <div className="card">
      <div className="page-heading">
        <p className="eyebrow">Game 2</p>
        <h1 className="title">Memory Match</h1>
        <p className="subtitle">
          Cocokkan semua pasangan dulu baru bisa lanjut.
        </p>
        <p className="subtitle">
          Progress: {matched.length}/{memoryPhotos.length} pasangan
        </p>
      </div>

      <div className="memory-grid">
        {cards.map((card) => {
          const isOpen =
            flipped.includes(card.id) || matched.includes(card.item.id);

          const showEmoji = imageErrorIds.includes(card.item.id);

          return (
            <button
              key={card.id}
              type="button"
              className={`memory-tile ${isOpen ? "open" : ""}`}
              onClick={() => handleFlip(card)}
            >
              {isOpen ? (
                showEmoji ? (
                  <div className="memory-fallback">{card.item.emoji}</div>
                ) : (
                  <img
                    src={card.item.image}
                    alt={`memory-${card.item.id}`}
                    onError={() => markImageError(card.item.id)}
                  />
                )
              ) : (
                <div className="memory-back">?</div>
              )}
            </button>
          );
        })}
      </div>

      <div className="actions-row" style={{ marginTop: 20 }}>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!isCompleted}
          onClick={() => {
            if (isCompleted) {
              onComplete();
            }
          }}
        >
          {isCompleted ? "Lanjut ke Game 3" : "Selesaikan semua pasangan dulu"}
        </button>
      </div>
    </div>
  );
}