import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Bike, Flame, Star, Instagram, Facebook } from "lucide-react";

import { CartButton, CartProvider, CartSheet, WHATSAPP_NUMBER } from "@/components/OrderCart";
import { MenuSection } from "@/components/MenuSection";

import { HeroCarousel } from "@/components/HeroCarousel";

const LOGO_URL =
  "https://res.cloudinary.com/twjrm1qo/image/upload/v1786830811/ChatGPT_Image_4_ago_2026_20_46_32.png";
const HERO_DESKTOP_BANNER =
  "https://res.cloudinary.com/twjrm1qo/image/upload/v1786934662/Dise%C3%B1o_sin_t%C3%ADtulo.png";
const HERO_MOBILE_1 = "https://res.cloudinary.com/twjrm1qo/image/upload/v1786831019/para_2_3.png";
const HERO_MOBILE_2 = "https://res.cloudinary.com/twjrm1qo/image/upload/v1786831059/para_2.png";
const HERO_MOBILE_3 = "https://res.cloudinary.com/twjrm1qo/image/upload/v1786831425/para_2_1.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papá Plátano | Pollo a la brasa y parrillas en Lima" },
      {
        name: "description",
        content:
          "Papá Plátano: pollo a la brasa al carbón, parrillas y combos familiares. Pide delivery o visita nuestros locales en Lima.",
      },
      { property: "og:title", content: "Papá Plátano | Pollo a la brasa y parrillas" },
      {
        property: "og:description",
        content:
          "El sabor del auténtico pollo a la brasa peruano. Carta, promociones, delivery y locales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestra carta", href: "#carta" },
  { label: "Locales", href: "#locales" },
  { label: "Contacto", href: "#contacto" },
];

const WA_DELIVERY = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "¡Hola Papá Plátano! 🍗 Quiero hacer un pedido de delivery.",
)}`;

const LOCAL = {
  name: "Pueblo Libre",
  address: "Jr. Manuel Ugarteche 399, Pueblo Libre",
  phone: "946 437 844",
  hours: "Mar. a Dom · 11:00 a.m. – 10:00 p.m.",
};

const FACEBOOK_URL = "https://www.facebook.com/polleriapapaplatano";
const INSTAGRAM_URL = "https://www.instagram.com/papa.platano";

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans text-foreground">
        {/* Barra superior + header anclados al hacer scroll */}
        <div className="sticky top-0 z-50">
          {/* Barra superior — marquesina estilo pantalla LED */}
          <div className="overflow-hidden bg-charcoal text-brand-foreground">
            <div className="flex w-max animate-[marquee_18s_linear_infinite] items-center gap-10 py-2 text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center gap-10">
                  <span className="flex items-center gap-2">
                    <Flame className="size-3.5 text-gold" /> BRASA AMAZONICA
                  </span>
                  <span className="text-gold">★</span>
                  <span className="flex items-center gap-2">
                    <Bike className="size-3.5 text-green" /> PIDE TU COMBO PAPA PLÁTANO
                  </span>
                  <span className="text-gold">★</span>
                  <span className="flex items-center gap-2">
                    <Phone className="size-3.5 text-gold" /> Delivery: 946 437 644
                  </span>
                  <span className="text-gold">★</span>
                  <span className="flex items-center gap-2">
                    <Clock className="size-3.5 text-green" /> MARTES A DOMINGO · 12:30 A.M. – 09:30
                    P.M.
                  </span>
                  <span className="text-gold">★</span>
                </div>
              ))}
            </div>
          </div>

          {/* Header */}
          <header className="border-b-4 border-gold bg-brand text-brand-foreground shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
              <a href="#inicio" className="flex items-center gap-3 group">
                <img
                  src={LOGO_URL}
                  alt="Logo Papá Plátano"
                  width={56}
                  height={56}
                  referrerPolicy="no-referrer"
                  className="size-12 md:size-14 rounded-full object-cover shadow-md ring-2 ring-gold/80 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="font-display text-2xl md:text-3xl uppercase leading-none tracking-wide">
                    Papá <span className="text-gold">Plátano</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/90">
                    Brasa Amazónica
                  </span>
                </div>
              </a>
              <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide lg:flex">
                {NAV.map((item) => (
                  <a key={item.href} href={item.href} className="transition-colors hover:text-gold">
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex shrink-0 items-center gap-2">
                <CartButton />

                <a
                  href={WA_DELIVERY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden rounded-full border-2 border-gold px-4 py-2 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-charcoal sm:inline-flex"
                >
                  Pedir delivery
                </a>
              </div>
            </div>
          </header>
        </div>

        {/* Hero — solo imagen (móvil vertical / desktop banner) */}
        <section id="inicio" className="bg-charcoal">
          <div className="block md:hidden">
            <HeroCarousel
              slides={[
                {
                  src: HERO_MOBILE_1,
                  alt: "Papá Plátano - Combo para 2 portada 1",
                },
                {
                  src: HERO_MOBILE_2,
                  alt: "Papá Plátano - Combo para 2 portada 2",
                },
                {
                  src: HERO_MOBILE_3,
                  alt: "Papá Plátano - Combo para 2 portada 3",
                },
              ]}
            />
          </div>
          <img
            src={HERO_DESKTOP_BANNER}
            alt="Portada Papá Plátano: sabor del pollo a la brasa con toque amazónico"
            width={2000}
            height={667}
            referrerPolicy="no-referrer"
            className="hidden w-full object-cover md:block max-h-[640px]"
          />
        </section>

        {/* Franja de ventajas */}
        <section className="border-y-4 border-green bg-gold text-charcoal">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
            {[
              { icon: Flame, title: "Braza amazónica", text: "Sabor tradicional de la selva" },
              { icon: Bike, title: "Delivery a todo Lima", text: "Llevamos tu pedido caliente" },
              { icon: Star, title: "Receta de nuestra selva", text: "Más de 10 años de tradición" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <item.icon className="size-8 shrink-0" />
                <div>
                  <p className="font-display text-lg uppercase leading-none">{item.title}</p>
                  <p className="text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MenuSection />

        {/* Nosotros */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <img
            src="https://res.cloudinary.com/twjrm1qo/image/upload/v1786834122/ChatGPT_Image_12_ago_2026_12_15_10.png"
            alt="Fachada del local de Papá Plátano en Pueblo Libre"
            loading="lazy"
            referrerPolicy="no-referrer"
            width={900}
            height={700}
            className="rounded-xl object-cover shadow-lg w-full aspect-[4/3]"
          />
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-brand">Nosotros</p>
            <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">
              Brasa amazónica en Pueblo Libre
            </h2>
            <p className="mt-5 text-muted-foreground">
              Papá Plátano nació con la receta de nuestra selva: pollos frescos marinados con
              especias amazónicas y cocidos a la brasa, acompañados de tacacho, cecina y chorizo.
            </p>
            <p className="mt-4 text-muted-foreground">
              Atendemos en salón, para llevar y con delivery a todo Lima.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { n: "10+", l: "Años de sabor" },
                { n: "1", l: "Local en Pueblo Libre" },
                { n: "100%", l: "Brasa amazónica" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-border p-4">
                  <p className="font-display text-3xl text-brand">{s.n}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local */}
        <section id="locales" className="bg-secondary py-20">
          <div className="mx-auto max-w-4xl px-4">
            <header className="text-center">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-brand">Local</p>
              <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Visítanos</h2>
            </header>
            <article className="mx-auto mt-10 overflow-hidden rounded-2xl bg-card shadow-md md:grid md:grid-cols-2">
              <img
                src="https://res.cloudinary.com/twjrm1qo/image/upload/v1786834122/ChatGPT_Image_12_ago_2026_12_15_10.png"
                alt="Fachada del restaurante Papá Plátano"
                loading="lazy"
                referrerPolicy="no-referrer"
                width={600}
                height={500}
                className="h-full w-full object-cover max-h-80 md:max-h-none"
              />
              <div className="flex flex-col justify-center p-8 text-center md:text-left">
                <h3 className="font-display text-2xl uppercase leading-tight">{LOCAL.name}</h3>
                <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
                  <li className="flex items-center justify-center md:justify-start gap-2.5">
                    <MapPin className="size-4 shrink-0 text-brand" /> {LOCAL.address}
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-2.5">
                    <Phone className="size-4 shrink-0 text-brand" />
                    <a
                      href={`tel:+51${LOCAL.phone.replace(/\s/g, "")}`}
                      className="hover:text-brand font-semibold text-foreground"
                    >
                      {LOCAL.phone}
                    </a>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-2.5">
                    <Clock className="size-4 shrink-0 text-brand" /> Atención: {LOCAL.hours}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Contacto / delivery */}
        <section id="contacto" className="bg-brand py-16 text-brand-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
            <h2 className="font-display text-4xl uppercase md:text-5xl">
              Pide tu pollo a la brasa ahora
            </h2>
            <p className="max-w-xl text-brand-foreground/85">
              Llámanos o escríbenos por WhatsApp y recibe tu pedido caliente en la puerta de tu
              casa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+51946437644"
                className="rounded-full bg-gold px-7 py-3 font-display text-lg uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
              >
                Llamar 946 437 644
              </a>
              <a
                href="#carta"
                className="rounded-full border-2 border-brand-foreground px-7 py-3 font-display text-lg uppercase tracking-wide transition-colors hover:bg-brand-foreground hover:text-brand"
              >
                Ver la carta
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-charcoal py-10 text-brand-foreground/80">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm">
            <img
              src={LOGO_URL}
              alt="Logo Papá Plátano"
              width={96}
              height={96}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="size-24 md:size-28 rounded-full object-cover shadow-lg ring-2 ring-gold/40"
            />
            <p className="font-display text-xl uppercase tracking-wider text-brand-foreground">
              Papá <span className="text-gold">Plátano</span>
            </p>
            <nav className="flex flex-wrap justify-center gap-5 uppercase tracking-wide">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-gold">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Papá Plátano"
                className="hover:text-gold"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Papá Plátano"
                className="hover:text-gold"
              >
                <Instagram className="size-5" />
              </a>
            </div>

            <p>© {new Date().getFullYear()} Papá Plátano. Todos los derechos reservados.</p>
          </div>
        </footer>

        <CartSheet />
      </div>
    </CartProvider>
  );
}
