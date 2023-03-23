import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDto } from 'src/app/models/cart-product.model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  endPointBanca;
  order: OrderDto;
  // jsonOrdine: string;

  constructor(private orderService: OrderService, 
              private router:Router,
              private route:ActivatedRoute) {

  }
  ngOnInit() {
    this.endPointBanca = environment.endPointBanca;

    this.route.params.subscribe((params:Params)=>{
      if (params.id){
        // this.ingredient=
        this.orderService.getMyOrder(params.id).subscribe(order => {
          if (!order) {
            this.router.navigateByUrl('/my-orders');
            return;            
          }
          this.order = order;
          console.log('getMyOrder', order);
          // this.jsonOrdine = JSON.stringify(this.order);
        });
      }
    })
  }
}
