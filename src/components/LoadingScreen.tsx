import { useEffect, useState } from "react";

const LOGO_URL =
  "https://res.cloudinary.com/twjrm1qo/image/upload/v1786830811/ChatGPT_Image_4_ago_2026_20_46_32.png";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 900);
    const t2 = setTimeout(() => setMounted(false), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] grid place-items-center bg-charcoal transition-opacity duration-500 pointer-events-none ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={LOGO_URL}
          alt="Papa Plátano"
          width={180}
          height={180}
          referrerPolicy="no-referrer"
          className="size-36 object-contain animate-pulse md:size-44"
        />
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-2xl uppercase tracking-wider text-brand-foreground">
            Papa <span className="text-gold">Plátano</span>
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
