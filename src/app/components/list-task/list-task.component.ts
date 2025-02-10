import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  listTask: Task[] = [];
  isModalOpen: boolean = false;
  currentTaskId: number | null = null;
  editTaskForm: FormGroup;

  constructor(private _taskService: TaskService, private fb: FormBuilder) {
    // Inicializamos el formulario en el constructor
    this.editTaskForm = this.fb.group({
      title: [''] // Campo de la tarea
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this._taskService.getTasks().subscribe({
      next: (data) => this.listTask = data,
      error: (error) => console.error('Error obteniendo tareas:', error)
    });
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: (error) => console.error('Error eliminando tarea:', error)
    });
  }

  openEditModal(task: Task) {
    this.currentTaskId = task.id;
    this.editTaskForm.patchValue({ title: task.task }); // Cargamos la tarea en el formulario
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateTask() {
    if (this.currentTaskId !== null) {
      const updatedTask: Task = {
        id: this.currentTaskId,
        task: this.editTaskForm.value.title,
        status: false // Puedes mantener el estado actual si lo necesitas
      };

      this._taskService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
        this.isModalOpen = false;
        this.getTasks();
      });
    }
  }
  toggleStatus(task: Task) {
    const updatedTask = { ...task, status: !task.status };
    this._taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        console.log('Estado actualizado correctamente');
        this.getTasks();
      },
      error: (err) => console.error('Error actualizando estado:', err)
    });
  }
}
