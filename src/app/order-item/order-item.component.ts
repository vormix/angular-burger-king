import { Component, Input } from '@angular/core';
import { ProductOrderDto } from '../models/cart-product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

   @Input('product') product!: ProductOrderDto;
}
