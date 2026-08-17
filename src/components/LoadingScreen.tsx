import { useEffect, useState } from "react";

const LOGO_URL =
  "https://res.cloudinary.com/twjrm1qo/image/upload/v1786830811/ChatGPT_Image_4_ago_2026_20_46_32.png";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] grid place-items-center bg-charcoal transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={LOGO_URL}
          alt="Papa Plátano"
          width={180}
          height={180}
          referrerPolicy="no-referrer"
          className="size-36 rounded-full object-cover shadow-2xl ring-4 ring-gold/40 animate-pulse md:size-44"
        />
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-2xl uppercase tracking-wider text-brand-foreground">
            Papá <span className="text-gold">Plátano</span>
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-bold">
            Brasa Amazónica
          </span>
        </div>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-brand-foreground/20">
          <div className="h-full w-1/2 animate-[loading_1.1s_ease-in-out_infinite] rounded-full bg-gold" />
        </div>
      </div>
    </div>
  );
}
