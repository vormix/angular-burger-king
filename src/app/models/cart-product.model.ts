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
    rimovibile: boolean,
    quantityBase: number,
    priceToPay: number
}

export interface ProductDto {
  productCartId: number,
  productId: number,
  name: string,
  price: number,
  imageUrl: string,
  ingredients: IngredientDto[]        
}

export interface OrderDto {
  id: number,
  data: Date,
  stato: string,
  totale: number,
  userId: number,
  username: string,
  payToken: string,
  products: ProductOrderDto[]        
}

export interface ProductOrderDto {
  id: number,
  idProdotto: number,
  nomeProdotto: string,
  prezzo: number,
  imageUrl: string,
  details: DetailProductOrderDto[]           
}

export interface DetailProductOrderDto{

  idIngrediente: number,
  nomeIngrediente: string,
  prezzo: number,
  quantita: number,  

}