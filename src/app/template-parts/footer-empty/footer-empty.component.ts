import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-empty',
  templateUrl: './footer-empty.component.html',
  styleUrls: ['./footer-empty.component.scss']
})
export class FooterEmptyComponent implements OnInit {
  ngOnInit(): void {
    (window as any).customFunc();
  }

}
