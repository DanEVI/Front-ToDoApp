import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../interfaces/Task";

@Injectable({
    providedIn: 'root'
})

export class TaskService{
    private myAppUrl = 'http://localhost:5236/'; 
    private myApiUrl = 'api/tasks/';

    constructor(private http: HttpClient){}

    getTasks():Observable<any>
    {
        return this.http.get(this.myAppUrl + this.myApiUrl);
    }
    
    deleteTask(id: number):Observable<any>
    {
        return this.http.delete(this.myAppUrl + this.myApiUrl + id);
    }

    updateTask(id: number, changes: Partial<Task>): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, changes);
    } 

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.myAppUrl + this.myApiUrl, task);
      }
      
}