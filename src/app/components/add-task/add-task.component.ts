import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;

  @Output() taskAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private _taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required] // Campo obligatorio
    });
  }

  agregar() {
    if (this.taskForm.invalid) {
      console.error("Formulario inválido");
      return;
    }

    const newTask: Task = {
      id: 0,
      task: this.taskForm.value.title,
      status: false
    };

    this._taskService.addTask(newTask).subscribe({
      next: (data) => {
        console.log('Tarea agregada:', data);
        this.taskForm.reset();
        this.taskAdded.emit();
      },
      error: (err) => console.error('Error al agregar tarea:', err)
    });
  }
  
}
