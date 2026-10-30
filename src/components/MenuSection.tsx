import * as React from "react";
import { ChevronLeft, ChevronRight, Plus, Star, Heart, Flame, Leaf } from "lucide-react";

import { CATEGORIES, type Category, type Product } from "@/data/menu";
import { formatPrice } from "@/components/OrderCart";
import { CustomizeModal } from "@/components/CustomizeModal";
import { useCart } from "@/components/OrderCart";

function ProductCard({ product, category }: { product: Product; category: Category }) {
  const { add } = useCart();
  const [variantIdx, setVariantIdx] = React.useState(0);
  const [showCustomize, setShowCustomize] = React.useState(false);

  const variant = product.variants?.[variantIdx];
  const price = variant?.price ?? product.price ?? 0;

  const handleAdd = () => {
    if (
      product.hasGuarnicion ||
      product.hasBebida ||
      product.hasChaufaUpgrade ||
      product.recommendations
    ) {
      setShowCustomize(true);
      return;
    }

    const title = variant ? `${product.name} (${variant.label})` : product.name;
    const id = variant ? `${product.id}-${variant.label.toLowerCase()}` : product.id;
    add({ id, title, price });
  };

  const getLabelIcon = (label: string) => {
    if (label.includes("MÁS PEDIDO")) return <Star className="size-3 text-gold fill-gold" />;
    if (label.includes("IDEAL PARA DOS"))
      return <Heart className="size-3 text-red-500 fill-red-500" />;
    if (label.includes("PROBAR DE TODO"))
      return <Flame className="size-3 text-orange-500 fill-orange-500" />;
    if (label.includes("AMAZÓNICO"))
      return <Leaf className="size-3 text-green-600 fill-green-600" />;
    return null;
  };

  return (
    <>
      <article
        onClick={handleAdd}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
      >
        {product.label && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-sm backdrop-blur">
            {getLabelIcon(product.label)}
            {product.label}
          </div>
        )}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={product.image ?? category.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          {/* Fila superior: Nombre del plato y Badge de precio */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-bold leading-tight text-neutral-900 transition-colors group-hover:text-brand md:text-lg">
              {product.name}
            </h3>
            <div className="shrink-0 rounded-xl border border-green/25 bg-green/10 px-2.5 py-1 text-center shadow-2xs">
              <span className="font-display text-sm font-bold tracking-tight text-green md:text-base">
                S/.{price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Descripción del plato */}
          {product.desc && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
              {product.desc}
            </p>
          )}

          {/* Items de acompañamiento */}
          {product.items && (
            <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
              {product.items.map((it) => (
                <li key={it} className="flex gap-1.5">
                  <span className="font-bold text-brand">•</span>
                  <span className="min-w-0">{it}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Variantes si aplica (tamaños / presentaciones) */}
          {(product.isChaufa || product.isBebidaSize) && product.variants && (
            <div className="mt-2.5 flex gap-2" onClick={(e) => e.stopPropagation()}>
              {product.variants.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setVariantIdx(i)}
                  className={`flex-1 rounded-full border px-2 py-1 text-[10px] font-bold uppercase transition-colors ${
                    i === variantIdx
                      ? "border-brand bg-brand text-brand-foreground shadow-xs"
                      : "border-border text-muted-foreground hover:border-brand"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          {/* Separador y barra inferior: Ver detalle / Opciones + Botón + Agregar */}
          <div className="mt-auto pt-3">
            <div className="flex items-center justify-between gap-2 border-t border-border/80 pt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCustomize(true);
                }}
                className="text-xs font-normal text-muted-foreground transition-colors hover:text-brand hover:underline"
              >
                Ver detalle / Opciones
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd();
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-brand-foreground shadow-sm transition-all hover:bg-brand/90 hover:scale-105 active:scale-95 md:text-sm"
                aria-label={`Agregar ${product.name} al pedido`}
              >
                <Plus className="size-3.5 stroke-[3]" />
                <span>Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {showCustomize && (
        <CustomizeModal
          product={product}
          variantLabel={variant?.label}
          variantPrice={variant?.price}
          onClose={() => setShowCustomize(false)}
        />
      )}
    </>
  );
}

export function MenuSection() {
  const [activeId, setActiveId] = React.useState(CATEGORIES[0]!.id);
  const navTrackRef = React.useRef<HTMLUListElement | null>(null);
  const isClickingRef = React.useRef(false);

  const scrollToCategory = (id: string) => {
    setActiveId(id);
    isClickingRef.current = true;
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      // Offset para header sticky (~104px) + barra de categorias (~65px)
      const yOffset = -175;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setTimeout(() => {
      isClickingRef.current = false;
    }, 700);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;
      const scrollY = window.scrollY;
      const offset = 210;

      for (let i = CATEGORIES.length - 1; i >= 0; i--) {
        const cat = CATEGORIES[i];
        const el = document.getElementById(`cat-${cat.id}`);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveId(cat.id);
            const btn = document.getElementById(`nav-btn-${cat.id}`);
            if (btn && navTrackRef.current) {
              btn.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="carta" className="scroll-mt-28 bg-background pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Cabecera Carta Delivery */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-charcoal">
            <Flame className="size-3.5 text-brand" />
            <span>Brasa Amazónica al Carbón</span>
          </div>
          <h1 className="mt-2 font-display text-4xl uppercase md:text-5xl lg:text-6xl text-charcoal">
            Carta Delivery
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
            Pide en línea tu pollo a la brasa, combos familiares y especialidades de la selva.
            Empieza agregando tus platos favoritos abajo.
          </p>
        </header>

        {/* Categorías con scroll horizontal y sticky top */}
        <nav className="sticky top-[104px] z-40 -mx-4 mt-6 border-y border-border/80 bg-background/95 px-4 py-3 shadow-xs backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border">
          <ul
            ref={navTrackRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-hide"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <li key={cat.id} className="shrink-0">
                  <button
                    id={`nav-btn-${cat.id}`}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "border-brand bg-brand text-brand-foreground shadow-md scale-105"
                        : "border-brand/20 bg-card text-brand hover:border-brand hover:bg-brand/5"
                    }`}
                  >
                    <span>{cat.shortLabel || cat.label}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                        isActive ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cat.products.length}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Todas las categorías en orden vertical hacia abajo hasta la última carta */}
        <div className="mt-10 space-y-16">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-48">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-brand/20 pb-3">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-charcoal">
                    {cat.label}
                  </h2>
                  {cat.note && <p className="mt-1 text-sm text-muted-foreground">{cat.note}</p>}
                </div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand/80">
                  {cat.products.length} {cat.products.length === 1 ? "opción" : "opciones"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.products.map((p) => (
                  <ProductCard key={p.id} product={p} category={cat} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
