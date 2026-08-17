import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string };

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = React.useState(0);
  const total = slides.length;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  React.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={750}
            height={1000}
            loading={i === 0 ? "eager" : "lazy"}
            referrerPolicy="no-referrer"
            className="w-full shrink-0 object-cover"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Imagen anterior"
        className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/60 text-brand-foreground backdrop-blur transition-colors hover:bg-charcoal"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Imagen siguiente"
        className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/60 text-brand-foreground backdrop-blur transition-colors hover:bg-charcoal"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ir a la imagen ${i + 1}`}
            className={`size-2.5 rounded-full transition-colors ${
              i === index ? "bg-gold" : "bg-brand-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
