import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  order : string;
  descr : string;
  orderId: number;

  constructor(public orderService:OrderService, 
              private authService: AuthenticationService, 
              private router:Router, 
              private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.orderService.getOrderOnce(params.payToken).subscribe(x => {
          console.log("getOrderOnce", x);
          if (x.ordine) {
            this.descr = "Grazie per aver pagato!";
            this.order = JSON.stringify(x);
            this.orderId = x.ordine.id;
          }
          else this.descr = "Pagamento non esistente oppure già elaborato";
        })
      }
    );
  }
}
