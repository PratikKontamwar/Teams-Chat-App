import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent implements OnInit {
  @Output() onchange = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  switchTo(text) {
    this.onchange.emit(text);
  }
}
