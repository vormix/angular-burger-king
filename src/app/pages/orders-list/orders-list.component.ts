import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
   
  orders = [];
  constructor(private orderService: OrderService) {
    
  }
  ngOnInit() {
    this.orderService.getAll().subscribe((x: any) => {
      this.orders = x;
      console.log(x);
    })
  }

}
