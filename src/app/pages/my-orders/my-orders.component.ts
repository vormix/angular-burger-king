import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders = [];
  endPointBanca;
  constructor(private orderService: OrderService) {
    
  }
  ngOnInit() {
    this.endPointBanca = environment.endPointBanca;
    
    this.orderService.getAll().subscribe((x: any) => {
      this.orders = x;
      console.log(x);
    })
  }
}
