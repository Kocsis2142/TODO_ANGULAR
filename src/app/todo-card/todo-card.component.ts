import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent {
  @Input() task: any;
  @Input() deleteTask: any;
  @Input() setSelectedTask: any;
  @Input() openModal: any;

  
}
