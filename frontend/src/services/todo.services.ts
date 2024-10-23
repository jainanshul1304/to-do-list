import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  dateString: string | null;
  description: string;
  status: 'active' | 'done';
}
@Injectable({
  providedIn: 'root' 
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/todo';

  constructor(private http: HttpClient) {}

  addTodo(description: string, status: 'active' | 'done',dateString: string): Observable<Todo> {
    const newTodo: Todo = { description, status ,dateString};
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }
  getTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
}
