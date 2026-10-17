/**
 * LÚMINA BEAUTY - Catálogo de Productos
 * Definición estructurada de productos y utilidades de formato
 */

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Labial Rosa Nude Acabado Velvet",
    categoria: "Labios y Ojos",
    precio: 35000,
    precioOriginal: 42000,
    imagen: "assets/images/labial-rosa-nude.jpg",
    descripcion: "Labial de fórmula aterciopelada y textura ultraligera. Enriquecido con aceites botánicos para hidratar los labios durante todo el día con una fijación suave y un tono rosa nude universal.",
    modoUso: "Aplica directamente desde la barra comenzando en el centro del labio superior y desliza hacia las comisuras. Repite en el labio inferior para un acabado más intenso.",
    ingredientes: ["Aceite de Jojoba", "Vitamina E", "Manteca de Karité", "Pigmentos Minerales Puros"],
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    disponible: true,
    destacado: true
  },
  {
    id: 2,
    nombre: "Sérum Facial Iluminador con Vitamina C",
    categoria: "Cuidado Facial",
    precio: 58000,
    precioOriginal: 68000,
    imagen: "assets/images/serum-iluminador.jpg",
    descripcion: "Concentrado antioxidante de alta potencia con 15% de Vitamina C estabilizada y micro-partículas de oro de 24k. Revela una tez luminosa, unifica el tono y protege frente a radicales libres.",
    modoUso: "Aplica 3 a 4 gotas en la mañana sobre la piel limpia y seca de rostro y cuello. Masajea suavemente con movimientos ascendentes antes de tu crema hidratante.",
    ingredientes: ["Vitamina C Estabilizada 15%", "Ácido Hialurónico Triple Peso", "Micro-partículas de Oro 24K", "Extracto de Té Verde"],
    rating: 5.0,
    reviewsCount: 218,
    badge: "Favorito",
    disponible: true,
    destacado: true
  },
  {
    id: 3,
    nombre: "Crema Hidratante Botánica de Rosas",
    categoria: "Cuidado Facial",
    precio: 52000,
    precioOriginal: null,
    imagen: "assets/images/crema-botanica.jpg",
    descripcion: "Emulsión hidratante ultra sedosa formulada con agua de rosas de Damasco y complejo de ceramidas. Calma la piel sensible, restaura la barrera cutánea y proporciona hidratación continua por 48 horas.",
    modoUso: "Toma una pequeña cantidad con la espátula dorada y distribuye con las yemas de los dedos sobre rostro y cuello limpios día y noche.",
    ingredientes: ["Agua Floral de Rosa Damascena", "Complejo de 3 Ceramidas Esenciales", "Escualano Vegetal", "Extracto de Avena Coloidal"],
    rating: 4.8,
    reviewsCount: 95,
    badge: "Orgánico",
    disponible: true,
    destacado: true
  },
  {
    id: 4,
    nombre: "Paleta de Sombras Sunset Glow",
    categoria: "Labios y Ojos",
    precio: 75000,
    precioOriginal: 89000,
    imagen: "assets/images/paleta-sombras.jpg",
    descripcion: "Paleta de 9 sombras cálidas inspiradas en los atardeceres dorados. Contiene acabados mate aterciopelados, satinados y metálicos multidimensionales con pigmentación intensa de una sola pasada.",
    modoUso: "Utiliza un pincel plano para depositar los tonos metalizados y una brocha difuminadora para integrar los tonos mate en la cuenca del ojo.",
    ingredientes: ["Mica de Origen Ético", "Polvo de Sílice Sedoso", "Aceite de Argán", "Vitamina E"],
    rating: 4.9,
    reviewsCount: 167,
    badge: "Nuevo",
    disponible: true,
    destacado: true
  },
  {
    id: 5,
    nombre: "Base de Maquillaje Fluida Luminous Finish",
    categoria: "Rostro",
    precio: 68000,
    precioOriginal: null,
    imagen: "assets/images/base-maquillaje.jpg",
    descripcion: "Base fluida de cobertura media modulable con acabado satinado natural. Difumina imperfecciones sin obstruir los poros, dejando una sensación fresca de segunda piel durante 16 horas.",
    modoUso: "Agita bien antes de usar. Aplica una o dos pulsaciones en el dorso de la mano y extiende con brocha o esponja húmeda desde el centro del rostro hacia afuera.",
    ingredientes: ["Ácido Hialurónico", "Niacinamida 2%", "Filtros Minerales SPF 20", "Extracto de Peonía"],
    rating: 4.8,
    reviewsCount: 130,
    badge: "Bestseller",
    disponible: true,
    destacado: true
  },
  {
    id: 6,
    nombre: "Rubor en Barra Multi-Glow Peach Rose",
    categoria: "Rostro",
    precio: 42000,
    precioOriginal: 48000,
    imagen: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    descripcion: "Stick multifuncional para mejillas y labios. Su textura cremosa se funde con el calor de la piel ofreciendo un toque de color saludable y luminoso con acabado no graso.",
    modoUso: "Desliza la barra directamente sobre los pómulos o labios y difumina suavemente con la punta de los dedos para un efecto natural.",
    ingredientes: ["Manteca de Mango", "Cera de Carnauba Orgánica", "Aceite de Rosa Mosqueta", "Extracto de Frambuesa"],
    rating: 4.7,
    reviewsCount: 88,
    badge: "Tendencia",
    disponible: true,
    destacado: false
  },
  {
    id: 7,
    nombre: "Máscara de Pestañas Lash Luxe Volumen",
    categoria: "Labios y Ojos",
    precio: 38000,
    precioOriginal: null,
    imagen: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=800&q=80",
    descripcion: "Máscara voluminizadora de fórmula negra azabache con cepillo curvo de cerdas densas. Eleva, separa y multiplica las pestañas visiblemente sin crear grumos ni descamarse.",
    modoUso: "Coloca el cepillo en la raíz de las pestañas y muévelo en zig-zag hacia las puntas. Aplica una segunda capa para un volumen dramático.",
    ingredientes: ["Cera de Abejas de Apicultura Sostenible", "Pantenol Pro-Vitamina B5", "Aceite de Ricino", "Pigmento Carbón Negro Vegetal"],
    rating: 4.8,
    reviewsCount: 114,
    badge: null,
    disponible: true,
    destacado: false
  },
  {
    id: 8,
    nombre: "Aceite Corporal Radiante Golden Shimmer",
    categoria: "Cuidado Corporal",
    precio: 64000,
    precioOriginal: 74000,
    imagen: "https://images.unsplash.com/photo-1608248597359-54315220c58e?auto=format&fit=crop&w=800&q=80",
    descripcion: "Aceite seco nutritivo impregnado de micro-perlas doradas y cobrizas. Nutre intensamente la piel, resalta el bronceado natural y deja un aroma celestial a vainilla de Madagascar y jazmín.",
    modoUso: "Agita vigorosamente antes de aplicar. Masajea sobre clavículas, hombros, piernas y escote para un brillo deslumbrante de efecto seda.",
    ingredientes: ["Aceite de Almendras Dulces", "Aceite de Macadamia", "Mica Mineral Dorada", "Vitamina E Pura"],
    rating: 4.9,
    reviewsCount: 153,
    badge: "Bestseller",
    disponible: true,
    destacado: false
  },
  {
    id: 9,
    nombre: "Exfoliante Corporal Café & Vainilla",
    categoria: "Cuidado Corporal",
    precio: 46000,
    precioOriginal: null,
    imagen: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    descripcion: "Exfoliante artesanal a base de granos de café arábica colombiano tostado y cristales de azúcar morena en aceite de coco virgen. Remueve células muertas y activa la microcirculación.",
    modoUso: "Aplica en la ducha sobre la piel húmeda con masajes circulares firmes en zonas rebeldes. Enjuaga con agua tibia.",
    ingredientes: ["Café Arábica Colombiano Molido", "Azúcar de Caña Orgánica", "Aceite de Coco Virgen", "Extracto Natural de Vainilla"],
    rating: 4.9,
    reviewsCount: 76,
    badge: "Natural",
    disponible: true,
    destacado: false
  },
  {
    id: 10,
    nombre: "Kit de Brochas Profesionales Rose Gold (8 pcs)",
    categoria: "Accesorios y Kits",
    precio: 89000,
    precioOriginal: 110000,
    imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    descripcion: "Set de 8 brochas de cerdas sintéticas ultrafinas ultrasuaves libres de crueldad animal. Mangos de madera lacada en nude mate y virolas en oro rosa de alta resistencia con estuche de viaje.",
    modoUso: "Contiene brochas para base, polvos, rubor, contorno, difuminado de ojos, delineado y cejas.",
    ingredientes: ["Fibras Taklon Veganas Hipoalergénicas", "Virolas de Aluminio Reciclable", "Madera Sostenible Certificada FSC"],
    rating: 5.0,
    reviewsCount: 189,
    badge: "Kit Especial",
    disponible: true,
    destacado: true
  },
  {
    id: 11,
    nombre: "Tónico Facial Hidratante Rose Mist",
    categoria: "Cuidado Facial",
    precio: 39000,
    precioOriginal: null,
    imagen: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    descripcion: "Bruma facial botánica equilibrante. Tonifica los poros, restaura el pH óptimo tras la limpieza y refresca el maquillaje en cualquier momento del día con un delicado aroma floral.",
    modoUso: "Rocía a 20 cm de distancia sobre el rostro con los ojos cerrados. Deja absorber o da toques suaves con las palmas de las manos.",
    ingredientes: ["Destilado Puro de Rosas", "Agua Termal Volcánica", "Extracto de Manzanilla", "Ácido Hialurónico"],
    rating: 4.7,
    reviewsCount: 64,
    badge: null,
    disponible: true,
    destacado: false
  },
  {
    id: 12,
    nombre: "Bálsamo Labial Reparador Karité & Vainilla",
    categoria: "Labios y Ojos",
    precio: 25000,
    precioOriginal: null,
    imagen: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    descripcion: "Tratamiento intensivo para labios secos o agrietados. Crea una película protectora invisible que retiene la hidratación y aporta un sutil brillo saludable sin sensación pegajosa.",
    modoUso: "Aplica generosamente sobre los labios tantas veces como sea necesario, especialmente antes de dormir como mascarilla nocturna.",
    ingredientes: ["Manteca de Karité Pura", "Aceite de Aguacate", "Cera de Candelilla", "Péptidos de Colágeno Vegetal"],
    rating: 4.9,
    reviewsCount: 82,
    badge: "Vegano",
    disponible: true,
    destacado: false
  }
];

/**
 * Categorías oficiales disponibles en la tienda
 */
const CATEGORIAS = [
  { id: "todas", nombre: "Todas", icono: "sparkles" },
  { id: "Rostro", nombre: "Rostro", icono: "smile" },
  { id: "Labios y Ojos", nombre: "Labios y Ojos", icono: "eye" },
  { id: "Cuidado Facial", nombre: "Cuidado Facial", icono: "droplet" },
  { id: "Cuidado Corporal", nombre: "Cuidado Corporal", icono: "sun" },
  { id: "Accesorios y Kits", nombre: "Accesorios y Kits", icono: "gift" }
];

/**
 * Formatea un número al estándar monetario de Pesos Colombianos (COP)
 * Ejemplo: 35000 -> "$ 35.000"
 */
function formatearPrecio(monto) {
  if (typeof monto !== "number" || isNaN(monto)) {
    return "$ 0";
  }
  return "$" + monto.toLocaleString("es-CO");
}

/**
 * Obtiene un producto por su identificador numérico
 */
function obtenerProductoPorId(id) {
  const numId = Number(id);
  return PRODUCTOS.find(p => p.id === numId) || null;
}

// Exportación global para navegadores y compatibilidad con módulos
window.LuminaProducts = {
  PRODUCTOS,
  CATEGORIAS,
  formatearPrecio,
  obtenerProductoPorId
};
