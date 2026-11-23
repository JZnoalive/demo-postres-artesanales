export interface ProductoPostre {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tag?: string;
  imagen: string;
}

export interface EspecialidadVitrina {
  id: string;
  titulo: string;
  subtitulo: string;
  imagen: string;
}

export const POSTRES_DATA = {
  nombre: "MIGA & MIEL",
  subnombre: "REPOSTERÍA ARTESANAL • DOMICILIOS",
  ciudad: "Domicilios rápidos en la ciudad",
  whatsapp: "573001234567",
  horario: "Mar – Dom · 11:00 AM – 9:30 PM",
  rating: "4.9",
  totalResenas: 214,
  domicilio: 4500,
  heroImagen:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=85",
  vitrinaEspeciales: [
    {
      id: "cacao-70",
      titulo: "Cacao 70% & Ganache",
      subtitulo: "Bizcocho húmedo recién horneado",
      imagen:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
    },
    {
      id: "waffles-berries",
      titulo: "Waffles & Frutos Rojos",
      subtitulo: "Crocantes por fuera, suaves por dentro",
      imagen:
        "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=85",
    },
    {
      id: "cold-brew-caramel",
      titulo: "Café Frío & Caramelo",
      subtitulo: "El maridaje ideal para la tarde",
      imagen:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85",
    },
  ] satisfies EspecialidadVitrina[],
  productos: [
    {
      id: "torta-chocolate",
      nombre: "Porción Torta Chocolate 70%",
      descripcion: "Bizcocho intenso de cacao con cobertura cremosa de chocolate amargo.",
      precio: 13000,
      tag: "Favorito",
      imagen:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "waffle-nutella",
      nombre: "Waffle Belga con Fresas",
      descripcion: "Waffle dorado recién hecho con fresas frescas y crema.",
      precio: 15500,
      imagen:
        "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "frappe-caramel",
      nombre: "Frappé Caramel Latte",
      descripcion: "Espresso frío batido con leche cremosa y caramelo suave.",
      precio: 11500,
      imagen:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    },
  ] satisfies ProductoPostre[],
};
