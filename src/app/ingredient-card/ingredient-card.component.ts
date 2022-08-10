import { Component, OnInit,ViewChild, ElementRef, Input,Renderer2, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss']
})

export class IngredientCardComponent implements OnInit {

 @Input() nome!:string;
 @Input()prezzo!:number;
 @Input()immagine!:string;
 @Input()link!:any;

 @Output('delete') deleteEvent:EventEmitter<void>=new EventEmitter<void>();





  constructor() { }

  ngOnInit(): void {



  }


  onXButtonClick(){
    this.deleteEvent.emit();
  }
}

