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
  combos: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787149067/como_papa_platano_1.jpg",
  brasa: heroPollo,
  mostros: comboMenu2,
  chaufitas: comboMenu1,
  mixturado: comboMenu3,
  yapita: canastitasImg,
  cecinas: platoParrilla,
  bebidas:
    "https://res.cloudinary.com/twjrm1qo/image/upload/v1787148728/ChatGPT_Image_19_ago_2026_09_11_38.png",
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
        name: "Combo Papa Plátano",
        price: 82,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787149067/como_papa_platano_1.jpg",
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
        name: "Combo Ronda Papa Plátano",
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
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787109811/Dise%C3%B1o_sin_t%C3%ADtulo_9.jpg",
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
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787109266/Dise%C3%B1o_sin_t%C3%ADtulo_7.jpg",
        hasGuarnicion: true,
      },
      {
        id: "mostro-charapa",
        name: "Mostro Charapa",
        price: 31,
        items: ["1/4 pollo", "Chaufa charapa", "Guarnición"],
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787110058/Dise%C3%B1o_sin_t%C3%ADtulo_10.jpg",
        hasGuarnicion: true,
      },
      {
        id: "sacha-mostro",
        name: "Sacha Mostro",
        price: 32,
        items: ["1/4 pollo", "Juane simple", "Guarnición"],
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787110394/Dise%C3%B1o_sin_t%C3%ADtulo_11.jpg",
        hasGuarnicion: true,
      },
      {
        id: "tacacho-pp",
        name: "Tacacho Papa Plátano",
        price: 15,
        desc: "Tacacho con trozos de cecina y chorizo.",
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787110739/Dise%C3%B1o_sin_t%C3%ADtulo_12.jpg",
      },
      {
        id: "cuarto-tacacho",
        name: "1/4 Pollo con Tacacho",
        price: 23,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787110973/Dise%C3%B1o_sin_t%C3%ADtulo_13.jpg",
      },
      {
        id: "cuarto-tacacho-chaufa",
        name: "1/4 Pollo + Tacacho + Chaufa Charapa",
        price: 31,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787111249/Dise%C3%B1o_sin_t%C3%ADtulo_14.jpg",
      },
      {
        id: "cuarto-tacacho-pp",
        name: "1/4 Pollo + Tacacho PP",
        price: 28,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787111468/Dise%C3%B1o_sin_t%C3%ADtulo_15.jpg",
      },
      {
        id: "la-pishcota",
        name: "La Pishcota",
        price: 34,
        items: ["1/4 pollo", "Tacacho PP", "Chaufa charapa"],
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787111694/WhatsApp_Image_2026-08-18_at_10.54.21_PM.jpg",
      },
      {
        id: "moshaco",
        name: "Moshaco",
        price: 35,
        items: ["1/4 pollo", "Tacacho", "Juane"],
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787111862/xx.jpg",
      },
    ],
  },
  {
    id: "cecinas",
    label: "🥩 CECINAS Y CHORIZOS",
    shortLabel: "🥩 Cecinas",
    image: PLACEHOLDERS.cecinas,
    products: [
      {
        id: "cecina-patacones",
        name: "Cecina y Patacones",
        price: 24,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787112330/Dise%C3%B1o_sin_t%C3%ADtulo_16.jpg",
      },
      {
        id: "cecina-tacacho",
        name: "Cecina y Tacacho",
        price: 27,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787112878/Dise%C3%B1o_sin_t%C3%ADtulo_17.jpg",
      },
      {
        id: "cecina-chorizo-patacon",
        name: "Cecina, Chorizo y Patacón",
        price: 30,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787113345/Dise%C3%B1o_sin_t%C3%ADtulo_18.jpg",
      },
      {
        id: "cecina-chorizo-tacacho",
        name: "Cecina, Chorizo y Tacacho",
        price: 32,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787113695/ChatGPT_Image_18_ago_2026_23_27_48.png",
      },
      {
        id: "cecina-chorizo-tacacho-juane",
        name: "Cecina, Chorizo, Tacacho y Juane",
        price: 39,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787113986/WhatsApp_Image_2026-08-07_at_7.39.00_PM_1.jpg",
      },
      {
        id: "cecina-maduro-chaufa",
        name: "Cecina, Maduro y Chaufa",
        price: 30,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787114283/Dise%C3%B1o_sin_t%C3%ADtulo_19.jpg",
      },
      {
        id: "cecina-tacacho-chaufa",
        name: "Cecina, Tacacho y Chaufa",
        price: 33,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787143660/ChatGPT_Image_19_ago_2026_07_47_25.png",
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
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787144259/Dise%C3%B1o_sin_t%C3%ADtulo_22.jpg",
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 15 },
          { label: "Grande", price: 20 },
        ],
      },
      {
        id: "chaufa-charapa",
        name: "Chaufa Charapa",
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787144382/WhatsApp_Image_2026-08-19_at_7.59.12_AM.jpg",
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 21 },
          { label: "Grande", price: 27 },
        ],
      },
      {
        id: "chaufa-buchisapa",
        name: "Chaufa Buchisapa",
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787144629/Dise%C3%B1o_sin_t%C3%ADtulo_23.jpg",
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 22 },
          { label: "Grande", price: 28 },
        ],
      },
      {
        id: "chaufa-charapuerto",
        name: "Chaufa Charapuerto",
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787144574/Dise%C3%B1o_sin_t%C3%ADtulo_20.jpg",
        isChaufa: true,
        variants: [
          { label: "Mediano", price: 24 },
          { label: "Grande", price: 29 },
        ],
      },
      {
        id: "chaufa-vegetariano",
        name: "Chaufa Vegetariano",
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787145037/Dise%C3%B1o_sin_t%C3%ADtulo_24.jpg",
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
      {
        id: "juane-presa",
        name: "Juane con presa",
        price: 23,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1786832483/22.jpg",
      },
      {
        id: "juane-simple",
        name: "Juane",
        price: 15,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787145321/Captura_de_pantalla_2026-08-19_081506.png",
      },
      {
        id: "charapita",
        name: "Charapita personal",
        price: 10,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1786834006/vrtjbrwrjkiwnfqbk37a.jpg",
      },
      {
        id: "platano-frito",
        name: "Plátano frito",
        price: 10,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787146299/11.jpg",
      },
      {
        id: "maduritos",
        name: "Maduritos",
        price: 10,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787146521/maduro.jpg",
      },
      {
        id: "patacones",
        name: "Patacones",
        price: 12,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787146610/12.jpg",
      },
      {
        id: "tacacho-simple",
        name: "Tacacho simple",
        price: 9,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787147156/Dise%C3%B1o_sin_t%C3%ADtulo_6.png",
      },
      {
        id: "ensalada",
        name: "Ensalada",
        price: 8,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1786832424/ENSALADA.jpg",
      },
      {
        id: "cuarto-solo",
        name: "1/4 pollo solo",
        price: 16,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787147381/pollo.png",
      },
      {
        id: "chorizo",
        name: "Chorizo",
        price: 14,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787147569/chorizo.png",
      },
      {
        id: "cecina",
        name: "Cecina",
        price: 16,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787147883/ChatGPT_Image_19_ago_2026_08_57_53.png",
      },
      {
        id: "papas",
        name: "Papas",
        price: 12,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787147929/PAPAS.jpg",
      },
      {
        id: "maduro-queso",
        name: "Maduro relleno con queso",
        price: 12,
        image: "https://res.cloudinary.com/twjrm1qo/image/upload/v1787148096/hol.png",
      },
      {
        id: "canastitas",
        name: "Canastitas arrechas",
        price: 20,
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787148154/Dise%C3%B1o_sin_t%C3%ADtulo_5.jpg",
      },
    ],
  },
  {
    id: "bebidas",
    label: "🥤 BEBIDAS",
    shortLabel: "🥤 Bebidas",
    image: PLACEHOLDERS.bebidas,
    products: [
      {
        id: "bebida-pedido",
        name: "Bebida para tu pedido",
        desc: "Camu camu, cocona o chicha morada",
        image:
          "https://res.cloudinary.com/twjrm1qo/image/upload/v1787148728/ChatGPT_Image_19_ago_2026_09_11_38.png",
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
