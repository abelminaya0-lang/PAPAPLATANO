import * as React from "react";
import { Minus, Plus, ShoppingCart, Trash2, Check, X, Store, Bike, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const WHATSAPP_NUMBER = "51946437644";

export type OrderItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: OrderItem[];
  total: number;
  count: number;
  add: (item: { id: string; title: string; price: number }) => void;
  remove: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  toast: string | null;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export function formatPrice(value: number) {
  return `S/ ${value.toFixed(2)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<OrderItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const add = React.useCallback((item: { id: string; title: string; price: number }) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    setToast(`${item.title} agregado`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const decrease = React.useCallback((id: string) => {
    setItems((prev) =>
      prev.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])),
    );
  }, []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const value = { items, total, count, add, remove, decrease, clear, open, setOpen, toast };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="pointer-events-none fixed inset-x-4 top-4 z-[100] mx-auto flex max-w-sm items-center gap-2 rounded-full bg-green px-4 py-3 text-sm font-bold text-brand-foreground shadow-2xl">
          <Check className="size-4 shrink-0" />
          <span className="min-w-0 truncate uppercase">{toast}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const PAGOS = [
  { id: "Yape", label: "YAPE", color: "bg-[#742284]", icon: "🟣" },
  { id: "Plin", label: "PLIN", color: "bg-[#00d1c1]", icon: "🟢" },
  { id: "Transferencia", label: "TRANSFERENCIA", color: "bg-[#002d72]", icon: "🔵" },
] as const;

export type TipoEntrega = "recojo" | "delivery";

export type CheckoutData = {
  nombre: string;
  pago: string;
  tipoEntrega: TipoEntrega;
  direccion: string;
  referencia: string;
  nota: string;
};

export function buildWhatsAppUrl(items: OrderItem[], total: number, data: CheckoutData) {
  const isDelivery = data.tipoEntrega === "delivery";
  const lines = [
    "🍌 *PEDIDO PAPÁ PLÁTANO*",
    "",
    `*Cliente:* ${data.nombre.trim()}`,
    `*Tipo de entrega:* ${isDelivery ? "🛵 DELIVERY" : "🏪 RECOJO EN LOCAL"}`,
    "",
    "*PEDIDO:*",
    ...items.map((i) => `*${i.qty} x* ${i.title} — ${formatPrice(i.price * i.qty)}`),
    "",
    `*TOTAL: ${formatPrice(total)}*`,
    "",
    `*💳 Método de pago:* ${data.pago}`,
    isDelivery
      ? `*📍 Dirección:* ${data.direccion.trim()}`
      : "*📍 Lugar de recojo:* Jr. Manuel Ugarteche 399, Pueblo Libre",
    isDelivery && data.referencia.trim() ? `*📌 Referencia:* ${data.referencia.trim()}` : "",
    data.nota.trim() ? `*📝 Nota:* ${data.nota.trim()}` : "",
    "",
    "Gracias.",
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
}

export function CartButton() {
  const { total, count, setOpen } = useCart();
  if (count === 0) return null;

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 left-1/2 z-[50] flex -translate-x-1/2 items-center gap-3 rounded-full bg-green px-8 py-4 font-display text-lg uppercase tracking-wider text-brand-foreground shadow-2xl transition-transform hover:scale-105 active:scale-95"
    >
      <ShoppingCart className="size-6" />
      <span>Ver pedido — {formatPrice(total)}</span>
    </button>
  );
}

export function CartSheet() {
  const { items, total, count, add, decrease, remove, open, setOpen } = useCart();
  const [touched, setTouched] = React.useState(false);
  const [data, setData] = React.useState<CheckoutData>({
    nombre: "",
    pago: "",
    tipoEntrega: "delivery",
    direccion: "",
    referencia: "",
    nota: "",
  });

  const errors = {
    nombre: !data.nombre.trim() ? "Por favor, ingresa tu nombre." : "",
    pago: !data.pago ? "Selecciona tu método de pago." : "",
    direccion:
      data.tipoEntrega === "delivery" && !data.direccion.trim()
        ? "Ingresa tu dirección de entrega."
        : "",
  };

  const isValid = !errors.nombre && !errors.pago && !errors.direccion;

  const handleConfirm = () => {
    if (count === 0) {
      alert("Agrega al menos un producto para continuar.");
      return;
    }
    setTouched(true);
    if (!isValid) return;
    window.open(buildWhatsAppUrl(items, total, data), "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-2xl uppercase">Tu pedido</SheetTitle>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-secondary">
              <X className="size-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 text-center">
              <ShoppingCart className="size-16 text-muted-foreground/30" />
              <p className="mt-4 font-display text-lg uppercase text-muted-foreground">
                Tu pedido está vacío
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-brand px-6 py-2 text-xs font-bold uppercase tracking-widest text-brand-foreground"
              >
                Ver carta
              </button>
            </div>
          ) : (
            <>
              {/* Resumen del Pedido */}
              <section>
                <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                  Resumen
                </h3>
                <ul className="mt-4 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex flex-col gap-1 border-b border-border pb-4">
                      <div className="flex justify-between">
                        <span className="font-bold uppercase text-sm leading-tight">
                          {item.title}
                        </span>
                        <span className="font-display text-green">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                          <button onClick={() => decrease(item.id)} className="p-1">
                            <Minus className="size-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => add(item)} className="p-1">
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-destructive text-xs font-bold uppercase"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-between items-center">
                  <span className="font-display text-xl uppercase">Total a pagar</span>
                  <span className="font-display text-3xl text-brand">{formatPrice(total)}</span>
                </div>
              </section>

              {/* Formulario */}
              <section className="space-y-6 pt-6 border-t border-border">
                <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                  📋 Completa tu pedido
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Nombre *
                    </label>
                    <input
                      className="mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-3 outline-none focus:border-brand"
                      placeholder="¿Cuál es tu nombre?"
                      value={data.nombre}
                      onChange={(e) => setData({ ...data, nombre: e.target.value })}
                    />
                    {touched && errors.nombre && (
                      <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      💳 ¿Cómo pagarás? *
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {PAGOS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setData({ ...data, pago: p.id })}
                          className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 transition-all ${
                            data.pago === p.id
                              ? `border-brand bg-brand/5 shadow-md`
                              : "border-border hover:border-brand/30"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex size-8 items-center justify-center rounded-lg ${p.color} text-white text-lg`}
                            >
                              {p.icon}
                            </span>
                            <span className="font-bold text-xs tracking-wider">{p.label}</span>
                          </span>
                          {data.pago === p.id && <Check className="size-5 text-brand" />}
                        </button>
                      ))}
                    </div>
                    {touched && errors.pago && (
                      <p className="mt-1 text-xs text-destructive">{errors.pago}</p>
                    )}
                  </div>

                  {/* Tipo de Entrega: Delivery vs Recojo en local */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      🛵 ¿Cómo recibirás tu pedido? *
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setData({ ...data, tipoEntrega: "delivery" })}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3.5 text-center transition-all ${
                          data.tipoEntrega === "delivery"
                            ? "border-brand bg-brand/10 font-bold text-foreground shadow-sm ring-1 ring-brand"
                            : "border-border text-muted-foreground hover:border-brand/40"
                        }`}
                      >
                        <Bike className="size-5 text-brand" />
                        <span className="font-display text-xs uppercase tracking-wider">
                          Delivery
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setData({ ...data, tipoEntrega: "recojo" })}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3.5 text-center transition-all ${
                          data.tipoEntrega === "recojo"
                            ? "border-brand bg-brand/10 font-bold text-foreground shadow-sm ring-1 ring-brand"
                            : "border-border text-muted-foreground hover:border-brand/40"
                        }`}
                      >
                        <Store className="size-5 text-brand" />
                        <span className="font-display text-xs uppercase tracking-wider">
                          Recojo en local
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Detalle según tipo de entrega */}
                  {data.tipoEntrega === "recojo" ? (
                    <div className="rounded-xl border border-brand/20 bg-brand/5 p-3.5 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5 font-bold text-foreground">
                        <MapPin className="size-4 text-brand shrink-0" />
                        <span>Punto de recojo en local:</span>
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        Jr. Manuel Ugarteche 399, Pueblo Libre
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        ¡Tu pedido se preparará para que lo recojas directamente en el local!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-1">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          📍 Dirección de entrega *
                        </label>
                        <input
                          className="mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-3 outline-none focus:border-brand"
                          placeholder="Ingresa tu dirección"
                          value={data.direccion}
                          onChange={(e) => setData({ ...data, direccion: e.target.value })}
                        />
                        {touched && errors.direccion && (
                          <p className="mt-1 text-xs text-destructive">{errors.direccion}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          📌 Referencia
                        </label>
                        <input
                          className="mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-3 outline-none focus:border-brand"
                          placeholder="Ej. Casa de 2 pisos, puerta negra..."
                          value={data.referencia}
                          onChange={(e) => setData({ ...data, referencia: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      📝 Nota para el pedido
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-3 outline-none focus:border-brand h-24 resize-none"
                      placeholder="¿Quieres agregar alguna indicación? Ej. Sin cebolla, llamar al llegar..."
                      value={data.nota}
                      onChange={(e) => setData({ ...data, nota: e.target.value })}
                    />
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        <div className="p-6 border-t border-border bg-secondary/30">
          <button
            onClick={handleConfirm}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-green py-4 font-display text-lg uppercase tracking-wider text-brand-foreground shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale"
            disabled={count === 0}
          >
            <Check className="size-6" />
            <span>Confirmar pedido por WhatsApp</span>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full text-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-brand"
          >
            Seguir comprando
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
