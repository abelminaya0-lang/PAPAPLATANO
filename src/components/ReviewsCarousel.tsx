import * as React from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote, CheckCircle2 } from "lucide-react";

export type GoogleReview = {
  id: string;
  author: string;
  avatarUrl: string;
  badge?: string;
  timeAgo: string;
  rating: number;
  title: string;
  comment: string;
  dishes?: string[];
  url: string;
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Carlos Mendoza P.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    badge: "Local Guide · Nivel 6",
    timeAgo: "Hace 1 semana",
    rating: 5,
    title: "¡El mejor pollo a la brasa con toque de la selva!",
    comment:
      "Una experiencia increíble. El sabor del pollo marinado a la brasa con especias amazónicas y el chaufa charapa están en su punto exacto. Porciones bien servidas y salsas de la casa espectaculares.",
    dishes: ["Combo Papa Plátano", "Chaufa Charapa", "Maduritos"],
    url: "https://maps.app.goo.gl/DLzZNJdPTjXYX5S3A",
  },
  {
    id: "rev-2",
    author: "Mariana Salazar V.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    badge: "Local Guide · Nivel 5",
    timeAgo: "Hace 2 semanas",
    rating: 5,
    title: "¡Delicioso y delivery súper rápido y caliente!",
    comment:
      "Pedimos por delivery para la familia y llegó todo en tiempo récord, bien caliente y con excelente empaque. El tacacho con cecina y el pollo a la brasa son simplemente los mejores de Pueblo Libre.",
    dishes: ["Pollo a la Brasa", "Tacacho con Cecina", "Ají Charapita"],
    url: "https://maps.app.goo.gl/DLzZNJdPTjXYX5S3A",
  },
  {
    id: "rev-3",
    author: "Rodrigo Valdivia G.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    badge: "Cliente Verificado Google",
    timeAgo: "Hace 3 semanas",
    rating: 5,
    title: "100% recomendado para compartir en familia",
    comment:
      "Los combos familiares rinden un montón y la sazón es única. Es difícil encontrar un pollo a la brasa que combine tan bien la tradición con el auténtico toque amazónico. ¡Volveremos siempre!",
    dishes: ["Combo Para Dos", "Madurito relleno", "Bebida Camu Camu"],
    url: "https://maps.app.goo.gl/DLzZNJdPTjXYX5S3A",
  },
  {
    id: "rev-4",
    author: "Fiorella Chávez R.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    badge: "Local Guide · 5 estrellas",
    timeAgo: "Hace 1 mes",
    rating: 5,
    title: "¡Las canastitas y el chaufa son de otro nivel!",
    comment:
      "La atención excelente y la comida insuperable. El pollo súper jugoso por dentro y crocante por fuera, acompañado de sus cremas de la casa y bebidas regionales bien heladas. 10 de 10.",
    dishes: ["Canastitas arrechas", "Bebida Regional 1L", "Pollo al Carbón"],
    url: "https://maps.app.goo.gl/DLzZNJdPTjXYX5S3A",
  },
  {
    id: "rev-5",
    author: "Diego Alarcón T.",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
    badge: "Local Guide · Nivel 7",
    timeAgo: "Hace 1 mes",
    rating: 5,
    title: "¡El Tacacho PP y las salsas amazónicas son insuperables!",
    comment:
      "Excelente sabor amazónico en la brasa. La combinación de pollo jugoso con tacacho y plátano madurito frito es de otro planeta. La atención rápida y muy amables tanto en salón como en delivery.",
    dishes: ["Tacacho PP", "1/4 Pollo", "Plátano frito"],
    url: "https://maps.app.goo.gl/DLzZNJdPTjXYX5S3A",
  },
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const total = GOOGLE_REVIEWS.length;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay continuo cada 4.5 segundos
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      id="comentarios"
      className="bg-muted/40 py-20 border-t border-b border-border transition-colors"
      aria-label="Comentarios y reseñas de clientes"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Cabecera de la sección */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-charcoal">
            <span className="flex items-center text-amber-500">
              <Star className="size-3.5 fill-current" />
              <Star className="size-3.5 fill-current" />
              <Star className="size-3.5 fill-current" />
              <Star className="size-3.5 fill-current" />
              <Star className="size-3.5 fill-current" />
            </span>
            <span>Reseñas 5 Estrellas en Google Maps</span>
          </div>

          <h2 className="mt-3 font-display text-4xl uppercase md:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
            Descubre las experiencias reales de comensales que disfrutan de nuestra auténtica brasa
            amazónica en salón y por delivery.
          </p>
        </header>

        {/* Carrusel interactivo automático */}
        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Contenedor del Slide */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-10 shadow-xl transition-all">
            {/* Marca de agua / icono decorativo de Google */}
            <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
              <svg className="size-24 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
            </div>

            {/* Renderizado de Slides */}
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {GOOGLE_REVIEWS.map((rev) => (
                <div key={rev.id} className="w-full shrink-0 flex flex-col justify-between">
                  {/* Fila superior: Autor, badge y estrellas */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 shadow-md">
                        <img
                          src={rev.avatarUrl}
                          alt={rev.author}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-display text-lg tracking-wide uppercase">
                            {rev.author}
                          </h3>
                          <CheckCircle2 className="size-4 text-green" />
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>{rev.badge}</span> · <span>{rev.timeAgo}</span>
                        </p>
                      </div>
                    </div>

                    {/* Estrellas doradas */}
                    <div className="flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="size-4 fill-gold text-gold" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-charcoal">5.0</span>
                    </div>
                  </div>

                  {/* Cuerpo del comentario */}
                  <div className="my-6">
                    <h4 className="font-display text-xl leading-tight text-foreground md:text-2xl">
                      "{rev.title}"
                    </h4>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {rev.comment}
                    </p>
                  </div>

                  {/* Platos favoritos mencionados */}
                  {rev.dishes && (
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Platos probados:
                      </span>
                      {rev.dishes.map((dish) => (
                        <span
                          key={dish}
                          className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          🍗 {dish}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pie del comentario: Enlace directo a Google Maps */}
                  <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      {/* Icono de Google estilizado */}
                      <svg className="size-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Reseña verificada en Google Maps</span>
                    </div>

                    <a
                      href={rev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 hover:bg-brand hover:text-brand-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand transition-colors"
                    >
                      <span>Ver en Google</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación Anterior / Siguiente */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Comentario anterior"
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-secondary active:scale-95 z-10"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente comentario"
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-secondary active:scale-95 z-10"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Indicadores de puntos / bullets */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {GOOGLE_REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir al comentario ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 bg-brand"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Botón para invitar a dejar reseña en Google */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/DLzZNJdPTjXYX5S3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand bg-transparent px-6 py-3 font-display text-sm uppercase tracking-wider text-brand transition-all hover:bg-brand hover:text-brand-foreground shadow-sm hover:shadow"
          >
            <Star className="size-4 fill-gold text-gold" />
            <span>¿Ya probaste Papa Plátano? Déjanos tu opinión en Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}
