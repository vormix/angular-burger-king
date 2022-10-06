import { Ingredient } from "./ingredient.model";


export class ProductIngredient{
    
    public idProdotto!: number;
    public idIngrediente!: number;
    public rimovibile!: boolean;
    public quantita!: number;
    public idIngredienteNavigation!: Ingredient;

    constructor() {
      this.rimovibile=true;
      this.quantita=1;
    }
}