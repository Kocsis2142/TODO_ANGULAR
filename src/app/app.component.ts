import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  tasks: any[] = [];
  selectedTask: any | null = null;
  showModal = false;
  modalType = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  setSelectedTask = (newTask: any | null) => {
    this.selectedTask = newTask;
  }

  getTasks = () => {
    this.http.get<any[]>('https://localhost:5001/Task')
      .subscribe({
        next: data => this.tasks = data,
        error: err => console.error(err)
      }
      );
  }

  changeTasks(newTaskPhase: string) {
    this.http.put<any>('https://localhost:5001/Task', {
      TaskId: this.selectedTask.TaskId,
      TaskTitle: this.selectedTask.TaskTitle,
      TaskDescription: this.selectedTask.TaskDescription,
      TaskPhase: newTaskPhase
    }).subscribe({
      next: res => this.getTasks(),
      error: err => console.error(err)
    })
  }

  deleteTask = (id: number) => {
    if (confirm('Sure you want to delete this task?')){
      this.http.delete(`https://localhost:5001/Task/${id}`)
        .subscribe({
          next: res => {
            alert(res)
            this.getTasks()
          },
          error: err => console.error(err)
        })
    }
  }

  openModal = (modalType: string) => {
    this.modalType = modalType;
    this.showModal = true;
  }

  closeModal = () => {
    this.showModal = false;
  }

  filterTasks(taskArray: Array<any>, taskPhase: string) {
    return taskArray.filter(task => task.TaskPhase === taskPhase)
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  dragDrop(phase: string) {
    this.changeTasks(phase)
  }
}
