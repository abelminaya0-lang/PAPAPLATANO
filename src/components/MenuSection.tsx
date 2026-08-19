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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:border-brand/30">
        {product.label && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-sm backdrop-blur">
            {getLabelIcon(product.label)}
            {product.label}
          </div>
        )}
        <img
          src={product.image ?? category.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          width={600}
          height={600}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-display text-lg uppercase leading-tight">{product.name}</h3>
          {product.desc && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.desc}</p>
          )}
          {product.items && (
            <ul className="space-y-0.5 text-xs text-muted-foreground">
              {product.items.map((it) => (
                <li key={it} className="flex gap-1.5">
                  <span className="text-green">•</span>
                  <span className="min-w-0">{it}</span>
                </li>
              ))}
            </ul>
          )}

          {(product.isChaufa || product.isBebidaSize) && product.variants && (
            <div className="mt-1 flex gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVariantIdx(i);
                  }}
                  className={`flex-1 rounded-full border px-2 py-2 text-[10px] font-bold uppercase transition-colors ${
                    i === variantIdx
                      ? "border-green bg-green text-brand-foreground"
                      : "border-border text-muted-foreground hover:border-green"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-3">
            <p className="font-display text-2xl text-green">{formatPrice(price)}</p>
            <button
              type="button"
              onClick={handleAdd}
              className="flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-md transition-transform hover:scale-110 active:scale-95"
              aria-label={`Agregar ${product.name} al pedido`}
            >
              <Plus className="size-6" />
            </button>
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
  const active: Category = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0]!;
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  const selectCategory = (id: string) => {
    setActiveId(id);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="carta" className="scroll-mt-24 bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="text-center">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-brand">
            Papa Plátano · Brasa Amazónica
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Carta Delivery</h2>
        </header>

        {/* Categorías con scroll horizontal */}
        <nav className="sticky top-[112px] z-40 -mx-4 mt-8 bg-background/95 px-4 py-4 backdrop-blur">
          <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  aria-pressed={cat.id === activeId}
                  className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    cat.id === activeId
                      ? "border-brand bg-brand text-brand-foreground shadow-md"
                      : "border-brand/20 bg-white text-brand hover:border-brand"
                  }`}
                >
                  {cat.shortLabel || cat.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-3xl uppercase text-charcoal">{active.label}</h3>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="flex size-10 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="flex size-10 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
          {active.note && <p className="mt-2 text-sm text-muted-foreground">{active.note}</p>}

          <div
            ref={trackRef}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8"
          >
            {active.products.map((p) => (
              <div
                key={p.id}
                className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[31%] xl:w-[24%]"
              >
                <ProductCard product={p} category={active} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
