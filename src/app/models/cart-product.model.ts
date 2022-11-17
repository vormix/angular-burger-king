import { ProductCartDetail } from "./product-cart-detail";
import { Product } from "./product.model";


export class CartProduct{
    public idCarrello!: number;
    public idProdotto!:number;
    public id!: number;
    public prodotto! : Product;
    public dettagliProdottiCarrello! : ProductCartDetail[];
}

