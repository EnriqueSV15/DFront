import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.css']
})
export class GenericInputComponent implements OnInit {

  @Input() id: string = "";
  @Input() title: string = "";
  @Input() placeholder: string = "";
  @Input() type: string = "";
  @Input() control: any;
  @Input() submitted: boolean = false;
  @Input() minDate = new Date('1900-01-01');
  @Input() loading: boolean = false;
  @Input() decimals = 0;
  @Input() maxLength = 50;

  constructor() {
  }

  ngOnInit(): void {

  }
}
