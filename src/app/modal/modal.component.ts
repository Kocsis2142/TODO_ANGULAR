import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
 @Input() closeModal:any;
 @Input() selectedTask:any;
 @Input() getTasks:any;
 @Input() modalType:any;

 newTaskDetailes: any =
  {
    TaskId: 0,
    TaskTitle: '',
    TaskDescription: '',
    TaskPhase: ''
  };

 constructor(private http: HttpClient) {}

 ngOnInit() {
    if (this.selectedTask !== null && this.modalType === 'CHG') this.newTaskDetailes = this.selectedTask;
  }

  changeTasks(task: any) {
    this.http.put<any>('https://localhost:5001/Task', {
      TaskId: task.TaskId,
      TaskTitle: task.TaskTitle,
      TaskDescription: task.TaskDescription,
      TaskPhase: task.TaskPhase
    }).subscribe({
      next: res => {
        this.getTasks();
        this.closeModal()
      },
      error: err => console.error(err)
    })
  }

  createTask() {
    this.http.post<any>('https://localhost:5001/Task', {
      TaskTitle: this.newTaskDetailes.TaskTitle,
      TaskDescription: this.newTaskDetailes.TaskDescription,
      TaskPhase: 'TODO'
    }).subscribe({
      next: res => {
        this.getTasks();
        this.closeModal()
      },
      error: err => console.error(err)
    })
  }
}
