import { Component, OnInit,ViewChild, ElementRef, Input,Renderer2, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent implements OnInit {

 @Input() nome!:string;
 @Input()prezzo!:number;
 @Input()immaginePrincipale!:string;
 @Input()link!:any;
 @Input('isDeleting') isDeleting :boolean = false;
 @Input('ingredienti') ingredienti: any[] = [];

 @Output('delete') deleteEvent:EventEmitter<void>=new EventEmitter<void>();





  constructor() { }

  ngOnInit(): void {



  }


  onXButtonClick(){
    this.deleteEvent.emit();
  }
}

