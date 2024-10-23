import { Component, inject, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.services';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
  title = 'to-do-list';
  allItems: Todo[] = [];
  isChecked!: boolean;
  booleanChecker($event: any){
    this.isChecked = $event;
  }
  today = new Date(); 
  dd = this.today.getDate();
  private todoService = inject(TodoService);
  items() {
    this.todoService.getTodo().subscribe(
      
      (response: Todo[]) => {
        console.log('Fetched Todos:', response);
        this.allItems = response;
      },
      (error) => {
        console.error('Error fetching todos:', error);
        this.allItems = [];
      }
    );
  }
  ngOnInit() {
    this.items();
  }
  addItems(description: string, done: string ,dateString: string) {
    if (!description || !dateString) {
      console.warn('Both description and date are required.');
      return;
    }
    let date =  new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error('Invalid date provided');
      return;
    }  
    this.todoService.addTodo(description, 'active', this.formatDateForSQL(date)).subscribe(
      (newTodo) => {
        this.allItems.unshift({ ...newTodo, dateString});
      },
      (error) => {
        console.error('Error adding todo', error);
      }
    );
  }

  clearInputs(newItem: HTMLInputElement, newItem2: HTMLInputElement) {
    newItem.value = '';
    newItem2.value = '';
  }
  formatDateForSQL(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const finalDate  = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return finalDate;
  }
}



        // if(this.isChecked){
        //   this.allItems.filter((item)=>{
        //     const dt = new Date(item.dateString != null ? item.dateString: '');
        //     console.log(dt);
        //     const day = dt.getDay();
        //     return this.today.getDay() - day > 0; 
        //   })
        // }
        // else{
        //   this.allItems.filter((item)=>{
        //     const dt = new Date(item.dateString != null ? item.dateString: '');
        //     const day = dt.getDay();
        //     return this.today.getDay() - day < 0; 
        //   })
        // }