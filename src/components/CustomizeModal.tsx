import * as React from "react";
import { X, Plus, Check } from "lucide-react";
import { type Product, GUARNICIONES, BEBIDA_INCLUIDA, CHAUFA_UPGRADE } from "@/data/menu";
import { formatPrice, useCart } from "@/components/OrderCart";

export function CustomizeModal({
  product,
  variantLabel,
  variantPrice,
  onClose,
}: {
  product: Product;
  variantLabel?: string | undefined;
  variantPrice?: number | undefined;
  onClose: () => void;
}) {
  const { add, setOpen } = useCart();
  const [guarnicion, setGuarnicion] = React.useState<string>("");
  const [chaufaGrande, setChaufaGrande] = React.useState(false);
  const [extras, setExtras] = React.useState<{ name: string; price: number }[]>([]);

  const basePrice = variantPrice ?? product.price ?? 0;
  const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
  const upgradeTotal = chaufaGrande ? CHAUFA_UPGRADE.price : 0;
  const totalPrice = basePrice + extrasTotal + upgradeTotal;

  const handleAddExtra = (extra: { name: string; price: number }) => {
    setExtras((prev) => [...prev, extra]);
  };

  const handleRemoveExtra = (idx: number) => {
    setExtras((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleConfirm = () => {
    const details = [];
    if (guarnicion) details.push(`Guarnición: ${guarnicion}`);
    if (product.hasBebida) details.push(`Bebida: ${BEBIDA_INCLUIDA} (incluida)`);
    if (chaufaGrande) details.push("Chaufa GRANDE (upgrade +S/5)");
    extras.forEach((e) => details.push(`Extra: ${e.name} (${formatPrice(e.price)})`));

    const baseName = variantLabel ? `${product.name} (${variantLabel})` : product.name;
    const fullTitle = `${baseName}${details.length ? ` (${details.join(", ")})` : ""}`;

    add({
      id: `${product.id}-${Date.now()}`, // ID único para variantes personalizadas
      title: fullTitle,
      price: totalPrice,
    });
    onClose();
    // Opcional: abrir el carrito si el usuario quiere ver su pedido
    // setOpen(true);
  };

  const canConfirm = !product.hasGuarnicion || !!guarnicion;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 rounded-2xl bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary"
        >
          <X className="size-5" />
        </button>

        <h2 className="font-display text-2xl uppercase">Personaliza tu pedido</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {variantLabel ? `${product.name} (${variantLabel})` : product.name}
        </p>

        <div className="mt-6 max-h-[60vh] space-y-8 overflow-y-auto pr-2 pb-4">
          {product.hasGuarnicion && (
            <section>
              <h3 className="flex items-center gap-2 font-display text-sm uppercase tracking-wide">
                <span>🍟 Escoge 1 Guarnición</span>
                <span className="text-[10px] text-brand font-bold">(OBLIGATORIO)</span>
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {GUARNICIONES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGuarnicion(g)}
                    className={`rounded-xl border-2 p-3 text-center text-xs font-bold transition-all ${
                      guarnicion === g
                        ? "border-green bg-green/10 text-green"
                        : "border-border hover:border-green/50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </section>
          )}

          {product.hasBebida && (
            <section>
              <h3 className="font-display text-sm uppercase tracking-wide">🥤 Bebida</h3>
              <div className="mt-3 flex items-center justify-between rounded-xl border-2 border-green bg-green/10 p-4">
                <span className="text-sm font-bold">{BEBIDA_INCLUIDA}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-green">
                  <Check className="size-4" /> Incluida en tu combo
                </span>
              </div>
            </section>
          )}

          {product.hasChaufaUpgrade && (
            <section>
              <h3 className="font-display text-sm uppercase tracking-wide">
                ¿Quieres agrandar tu chaufa? 👇
              </h3>
              <button
                onClick={() => setChaufaGrande((v) => !v)}
                className={`mt-3 flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                  chaufaGrande ? "border-green bg-green/10" : "border-border hover:border-green/50"
                }`}
              >
                <span className="text-sm font-bold">
                  Chaufa grande ·{" "}
                  <span className="text-green">+ {formatPrice(CHAUFA_UPGRADE.price)}</span>
                </span>
                <span
                  className={`flex size-7 items-center justify-center rounded-full ${
                    chaufaGrande
                      ? "bg-green text-brand-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {chaufaGrande ? <Check className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </section>
          )}

          {product.recommendations && product.recommendations.length > 0 && (
            <section>
              <h3 className="font-display text-sm uppercase tracking-wide">
                ¿Quieres agregar algo más? 👇
              </h3>
              <div className="mt-3 space-y-2">
                {product.recommendations.map((extra) => {
                  const count = extras.filter((e) => e.name === extra.name).length;
                  return (
                    <div
                      key={extra.name}
                      className="flex items-center justify-between rounded-xl border border-border p-3"
                    >
                      <div className="text-sm font-semibold">
                        {extra.name} ·{" "}
                        <span className="text-green">{formatPrice(extra.price)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {count > 0 && (
                          <button
                            onClick={() => {
                              const firstIdx = extras.findIndex((e) => e.name === extra.name);
                              handleRemoveExtra(firstIdx);
                            }}
                            className="flex size-7 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                          >
                            -
                          </button>
                        )}
                        {count > 0 && <span className="text-sm font-bold">{count}</span>}
                        <button
                          onClick={() => handleAddExtra(extra)}
                          className="flex size-7 items-center justify-center rounded-full bg-brand text-brand-foreground"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <button
            disabled={!canConfirm}
            onClick={handleConfirm}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-lg uppercase tracking-wide transition-all ${
              canConfirm
                ? "bg-green text-brand-foreground shadow-lg hover:scale-[1.02]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Agregar al carrito — {formatPrice(totalPrice)}
          </button>
        </div>
      </div>
    </div>
  );
}
