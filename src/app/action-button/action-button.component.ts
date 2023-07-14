import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {
  @Input() text:String="";
  @Input() id:Number=0;
  @Output() action=new EventEmitter<Number>();

  performAction(id:Number){
    this.action.emit(id);
  }
}
