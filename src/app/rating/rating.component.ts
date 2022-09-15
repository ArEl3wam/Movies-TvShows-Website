import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input()
  rating!: number;
  clipWidth: number = 75;
  @Output() messageFromChild: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.clipWidth = this.rating * 75 / 10
  }

  onClick() {
    this.messageFromChild.emit(`from child with rating ${this.rating}`)
  }

}
