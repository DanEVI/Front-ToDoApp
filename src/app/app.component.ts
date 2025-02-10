import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTaskComponent } from "./components/list-task/list-task.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, AddTaskComponent, ListTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoApp';

}
