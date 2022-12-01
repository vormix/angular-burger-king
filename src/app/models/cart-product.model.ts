import { ProductCartDetail } from "./product-cart-detail";
import { Product } from "./product.model";


export interface CartProduct{
    idCarrello: number;
    idProdotto:number;
    id: number;
    prodotto: Product;
    dettagliProdottiCarrello: ProductCartDetail[];
}

export interface CartDto {
  cartId: number,
  userId: number,
  data: Date,
  total: number,
  products: ProductDto[]
}

export interface IngredientDto{
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number,
    rimovibile: boolean
}

export interface ProductDto {
  productCartId: number,
  productId: number,
  name: string,
  price: number,
  imageUrl: string,
  ingredients: IngredientDto[]        
}