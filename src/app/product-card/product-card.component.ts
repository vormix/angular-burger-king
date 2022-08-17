import { Component, OnInit,ViewChild, ElementRef, Input,Renderer2, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {

 @Input() nome!:string;
 @Input()prezzo!:number;
 @Input()immaginePrincipale!:string;
 @Input()link!:any;

 @Output('delete') deleteEvent:EventEmitter<void>=new EventEmitter<void>();





  constructor() { }

  ngOnInit(): void {



  }


  onXButtonClick(){
    this.deleteEvent.emit();
  }
}

