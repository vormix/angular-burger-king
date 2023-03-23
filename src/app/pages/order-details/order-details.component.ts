import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDto } from 'src/app/models/cart-product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderDto;
    
  constructor(private orderService: OrderService, 
              private router:Router,
              private route:ActivatedRoute) {}
      
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      if (params.id){
        this.orderService.getOrder(params.id).subscribe(order => {
          if (!order) {
            this.router.navigateByUrl('/orders');
            return;            
          }
          this.order = order;
          console.log('getOrder', order);
        });
      }
    });
  }

  lavoraOrdine(id: number) {
    this.orderService.lavoraOrdine(id).subscribe(result => {
      if (result) {
        this.order.stato = 'EVASO';
      }
    });
  }
}  

