// CARTA OFICIAL PAPA PLÁTANO — BRASA AMAZÓNICA
import comboMenu1 from "@/assets/combo-menu-1.jpg";
import comboMenu2 from "@/assets/combo-menu-2.jpg";
import comboMenu3 from "@/assets/combo-menu-3.jpg";
import comboMenu4 from "@/assets/combo-menu-4.jpg";
import comboFamiliar from "@/assets/combo-familiar.jpg";
import heroPollo from "@/assets/hero-pollo.jpg";
import platoMedioPollo from "@/assets/plato-medio-pollo.jpg";
import platoParrilla from "@/assets/plato-parrilla.jpg";
import camuCamuImg from "@/assets/camu-camu.jpg";
import canastitasImg from "@/assets/canastitas-arrechas.jpg";
import tacachoImg from "@/assets/tacacho-simple.jpg";
import ensaladaImg from "@/assets/ensalada.jpg";
import juaneImg from "@/assets/juane.jpg";

export const PLACEHOLDERS = {
  combos:
    "https://res.cloudinary.com/twjrm1qo/image/upload/v1786942898/Dise%C3%B1o_sin_t%C3%ADtulo.jpg",
  brasa: heroPollo,
  mostros: comboMenu2,
  chaufitas: comboMenu1,
  mixturado: comboMenu3,
  yapita: canastitasImg,
  cecinas: platoParrilla,
  bebidas: camuCamuImg,
};

export type Variant = { label: string; price: number };

export type Extra = { name: string; price: number };

export type Product = {
  id: string;
  name: string;
  desc?: string;
  items?: string[];
  price?: number;
  variants?: Variant[];
  image?: string;
  label?: string;
  // Personalización
  hasGuarnicion?: boolean;
  hasBebida?: boolean;
  isChaufa?: boolean;
  isBebidaSize?: boolean;
  hasChaufaUpgrade?: boolean;
  recommendations?: Extra[];
};

export type Category = {
  id: string;
  label: string;
  shortLabel?: string;
  note?: string;
  image: string;
  products: Product[];
};

export const BEBIDA_EXTRA: Extra = { name: "Bebida Regional 1/2 L", price: 7.5 };
export const CHAUFA_UPGRADE: Extra = { name: "Chaufa grande (upgrade)", price: 5 };

// Combos: bebida primero + complementos amazónicos compatibles
const EXTRA_COMBOS: Extra[] = [
  BEBIDA_EXTRA,
  { name: "Cecina", price: 16 },
  { name: "Chorizo", price: 14 },
  { name: "Juane", price: 15 },
  { name: "Tacacho simple", price: 9 },
];

// Platos con pollo + guarnición
const EXTRA_POLLO: Extra[] = [
  BEBIDA_EXTRA,
  { name: "Papas", price: 12 },
  { name: "Ensalada", price: 8 },
  { name: "Cremas extra", price: 3 },
];

// Mostros (pollo + chaufa / juane)
const EXTRA_MOSTRO: Extra[] = [
  BEBIDA_EXTRA,
  { name: "Chaufa simple mediano", price: 15 },
  { name: "Tacacho simple", price: 9 },
  { name: "Cecina", price: 16 },
];

// Platos con tacacho
const EXTRA_TACACHO: Extra[] = [
  BEBIDA_EXTRA,
  { name: "Cecina", price: 16 },
  { name: "Chorizo", price: 14 },
  { name: "Maduritos", price: 10 },
];

const EXTRA_CECINAS: Extra[] = [
  BEBIDA_EXTRA,
  { name: "Tacacho simple", price: 9 },
  { name: "Patacones", price: 12 },
  { name: "Maduritos", price: 10 },
];

const EXTRA_CHAUFAS: Extra[] = [
  BEBIDA_EXTRA,
  { name: "Cecina", price: 16 },
  { name: "Chorizo", price: 14 },
  { name: "Plátano frito", price: 10 },
];

const EXTRA_YAPITA: Extra[] = [BEBIDA_EXTRA];

export const CATEGORIES: Category[] = [
  {
    id: "combos",
    label: "🔥 COMBOS MÁS PEDIDOS",
    shortLabel: "🔥 Combos",
    image: PLACEHOLDERS.combos,
    products: [
      {
        id: "combo-papa-platano",
        name: "Combo Papá Plátano",
        price: 82,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1786942898/Dise%C3%B1o_sin_t%C3%ADtulo.jpg",
        label: "⭐ MÁS PEDIDO",
        items: [
          "1 pollo a la brasa",
          "Chaufa charapa mediano",
          "1 guarnición a elección",
          "1 bebida de 1 litro",
          "Cremas de la casa",
        ],
        hasChaufaUpgrade: true,
        hasGuarnicion: true,
        hasBebida: true,
        recommendations: EXTRA_COMBOS,
      },
      {
        id: "combo-para-dos",
        name: "Combo Para Dos",
        price: 62,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1786980259/Dise%C3%B1o_sin_t%C3%ADtulo_1.jpg",
        label: "❤️ IDEAL PARA DOS",
        items: [
          "1/2 pollo a la brasa",
          "Chaufa charapa mediano",
          "1 guarnición a elección",
          "1 bebida de 1 litro",
          "Cremas de la casa",
        ],
        hasChaufaUpgrade: true,
        hasGuarnicion: true,
        hasBebida: true,
        recommendations: EXTRA_COMBOS,
      },
      {
        id: "combo-ronda-papa-platano",
        name: "Combo Ronda Papá Plátano",
        price: 92,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1786831655/Dise%C3%B1o_sin_t%C3%ADtulo_2.jpg",
        label: "🔥 PARA PROBAR DE TODO",
        items: [
          "1/2 pollo a la brasa",
          "1 guarnición a elección",
          "2 tacachos",
          "1 juane simple",
          "Charapita personal",
          "Cecina y chorizo",
          "1 bebida de 1 litro",
          "Cremas de la casa",
        ],
        hasGuarnicion: true,
        hasBebida: true,
        recommendations: EXTRA_COMBOS,
      },
      {
        id: "combo-san-juanino",
        name: "Combo San Juanito",
        price: 82,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1786831672/Dise%C3%B1o_sin_t%C3%ADtulo_3.jpg",
        label: "🌿 SABOR AMAZÓNICO",
        items: [
          "1 pollo a la brasa",
          "1 guarnición a elección",
          "2 juanes simples",
          "1 bebida de 1 litro",
          "Cremas de la casa",
        ],
        hasGuarnicion: true,
        hasBebida: true,
        recommendations: EXTRA_COMBOS,
      },
    ],
  },
  {
    id: "personales",
    label: "🍗 ¿COMES SOLO?",
    shortLabel: "🍗 PERS. MOSTROS",
    note: "Elige tu plato favorito.",
    image: PLACEHOLDERS.brasa,
    products: [
      {
        id: "cuarto-guarnicion",
        name: "1/4 Pollo + Guarnición",
        price: 23,
        items: ["1/4 pollo", "Ensalada", "Cremas"],
        image: heroPollo,
        hasGuarnicion: true,
        recommendations: [
          { name: "Bebida Regional 1/2 L", price: 7.5 },
          { name: "Juane", price: 15 },
          { name: "Cecina", price: 16 },
        ],
      },
      {
        id: "mostro-clasico",
        name: "Mostro Clásico",
        price: 29,
        items: ["1/4 pollo", "Chaufa de pollo", "Guarnición"],
        image: comboMenu2,
        hasGuarnicion: true,
      },
      {
        id: "mostro-charapa",
        name: "Mostro Charapa",
        price: 31,
        items: ["1/4 pollo", "Chaufa charapa", "Guarnición"],
        image: comboMenu1,
        hasGuarnicion: true,
      },
      {
        id: "sacha-mostro",
        name: "Sacha Mostro",
        price: 32,
        items: ["1/4 pollo", "Juane simple", "Guarnición"],
        image: juaneImg,
        hasGuarnicion: true,
      },
      {
        id: "tacacho-pp",
        name: "Tacacho Papá Plátano",
        price: 15,
        desc: "Tacacho con trozos de cecina y chorizo.",
        image: tacachoImg,
      },
      { id: "cuarto-tacacho", name: "1/4 Pollo con Tacacho", price: 23, image: tacachoImg },
      {
        id: "cuarto-tacacho-chaufa",
        name: "1/4 Pollo + Tacacho + Chaufa Charapa",
        price: 31,
        image: comboMenu3,
      },
      { id: "cuarto-tacacho-pp", name: "1/4 Pollo + Tacacho PP", price: 28, image: tacachoImg },
      {
        id: "la-pishcota",
        name: "La Pishcota",
        price: 34,
        items: ["1/4 pollo", "Tacacho PP", "Chaufa charapa"],
        image: comboMenu3,
      },
      {
        id: "moshaco",
        name: "Moshaco",
        price: 35,
        items: ["1/4 pollo", "Tacacho", "Juane"],
        image: comboMenu3,
      },
    ],
  },
  {
    id: "cecinas",
    label: "🥩 CECINAS Y CHORIZOS",
    shortLabel: "🥩 Cecinas",
    image: PLACEHOLDERS.cecinas,
    products: [
      { id: "cecina-patacones", name: "Cecina y Patacones", price: 24, image: platoParrilla },
      { id: "cecina-tacacho", name: "Cecina y Tacacho", price: 27, image: tacachoImg },
      {
        id: "cecina-chorizo-patacon",
        name: "Cecina, Chorizo y Patacón",
        price: 30,
        image: platoParrilla,
      },
      {
        id: "cecina-chorizo-tacacho",
        name: "Cecina, Chorizo y Tacacho",
        price: 32,
        image: platoParrilla,
      },
      {
        id: "cecina-chorizo-tacacho-juane",
        name: "Cecina, Chorizo, Tacacho y Juane",
        price: 39,
        image: comboMenu3,
      },
      { id: "cecina-maduro-chaufa", name: "Cecina, Maduro y Chaufa", price: 30, image: comboMenu2 },
      {
        id: "cecina-tacacho-chaufa",
        name: "Cecina, Tacacho y Chaufa",
        price: 33,
        image: comboMenu3,
      },
    ],
  },
  {
    id: "chaufas",
    label: "🍚 CHAUFAS",
    shortLabel: "🍚 Chaufas",
    image: PLACEHOLDERS.chaufitas,
    products: [
      {
        id: "chaufa-simple",
        name: "Chaufa Simple",
        image: comboMenu2,
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 15 },
          { label: "Grande", price: 20 },
        ],
      },
      {
        id: "chaufa-charapa",
        name: "Chaufa Charapa",
        image: comboMenu1,
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 21 },
          { label: "Grande", price: 27 },
        ],
      },
      {
        id: "chaufa-buchisapa",
        name: "Chaufa Buchisapa",
        image: comboMenu1,
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 22 },
          { label: "Grande", price: 28 },
        ],
      },
      {
        id: "chaufa-charapuerto",
        name: "Chaufa Charapuerto",
        image: comboMenu2,
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 24 },
          { label: "Grande", price: 29 },
        ],
      },
      {
        id: "chaufa-vegetariano",
        name: "Chaufa Vegetariano",
        image: comboMenu1,
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 20 },
          { label: "Grande", price: 25 },
        ],
      },
    ],
  },
  {
    id: "yapita",
    label: "🍌 LA YAPITA",
    shortLabel: "🍌 La Yapita",
    image: PLACEHOLDERS.yapita,
    products: [
      { id: "juane-presa", name: "Juane con presa", price: 23, image: juaneImg },
      { id: "juane-simple", name: "Juane", price: 15, image: juaneImg },
      { id: "charapita", name: "Charapita personal", price: 10, image: platoParrilla },
      { id: "platano-frito", name: "Plátano frito", price: 10, image: tacachoImg },
      { id: "maduritos", name: "Maduritos", price: 10, image: canastitasImg },
      { id: "patacones", name: "Patacones", price: 12, image: platoParrilla },
      { id: "tacacho-simple", name: "Tacacho simple", price: 9, image: tacachoImg },
      { id: "ensalada", name: "Ensalada", price: 8, image: ensaladaImg },
      { id: "cuarto-solo", name: "1/4 pollo solo", price: 16, image: platoMedioPollo },
      { id: "chorizo", name: "Chorizo", price: 14, image: platoParrilla },
      { id: "cecina", name: "Cecina", price: 16, image: platoParrilla },
      { id: "papas", name: "Papas", price: 12, image: comboFamiliar },
      { id: "maduro-queso", name: "Maduro relleno con queso", price: 12, image: canastitasImg },
      { id: "canastitas", name: "Canastitas arrechas", price: 20, image: canastitasImg },
    ],
  },
  {
    id: "bebidas",
    label: "🥤 BEBIDAS",
    shortLabel: "🥤 Bebidas",
    image: PLACEHOLDERS.bebidas,
    products: [
      {
        id: "camu-camu",
        name: "Camu Camu",
        image: camuCamuImg,
        isBebidaSize: true,
        variants: [
          { label: "1/2 L", price: 7.5 },
          { label: "1 L", price: 15 },
        ],
      },
      {
        id: "cocona",
        name: "Cocona",
        image: camuCamuImg,
        isBebidaSize: true,
        variants: [
          { label: "1/2 L", price: 7.5 },
          { label: "1 L", price: 15 },
        ],
      },
    ],
  },
];

// Sugerencias inteligentes: bebida regional primero + complementos compatibles
for (const cat of CATEGORIES) {
  for (const prod of cat.products) {
    if (prod.recommendations && prod.recommendations.length) continue;
    const text = `${prod.name} ${(prod.items ?? []).join(" ")}`.toLowerCase();
    if (cat.id === "cecinas") prod.recommendations = EXTRA_CECINAS;
    else if (cat.id === "chaufas") prod.recommendations = EXTRA_CHAUFAS;
    else if (cat.id === "personales") {
      if (text.includes("chaufa") || text.includes("juane")) prod.recommendations = EXTRA_MOSTRO;
      else if (text.includes("tacacho")) prod.recommendations = EXTRA_TACACHO;
      else prod.recommendations = EXTRA_POLLO;
    } else if (cat.id === "yapita") prod.recommendations = EXTRA_YAPITA;
  }
}

export const GUARNICIONES = ["Papas fritas", "Patacones", "Maduro", "Plátano frito"];
export const BEBIDA_INCLUIDA = "Bebida regional 1 litro";
