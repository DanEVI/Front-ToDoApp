import { Routes } from '@angular/router';
import { ListTaskComponent } from './components/list-task/list-task.component';

export const routes: Routes = [
    { path : '' , component: ListTaskComponent },
    { path : '**', redirectTo: '/' },
];
