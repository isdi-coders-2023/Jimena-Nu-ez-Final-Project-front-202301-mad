import { Artist } from "./artist";

export type AddedProduct = {
  name: string;
  price: number;
  cone: number;
  size: number;
  type: string;
  author: Artist;
  img: string;
};

export type Product = AddedProduct & {
  id: string;
};