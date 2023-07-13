import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {
  @Input() text:String="";
  @Output() action:EventEmitter<void>=new EventEmitter<any>();

  performAction():void{
    this.action.emit();
  }
}
