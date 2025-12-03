export type ProductType = {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  garantia: number;
  stock: number;
  featured: boolean;
  image1: string;
  image2: string | null;
  image3: string | null;
  categoria: {
    id: number;
    slug: string;
    nombre: string;
  };
  images: string[];
};