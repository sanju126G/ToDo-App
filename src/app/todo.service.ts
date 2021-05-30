import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  dbUrl = 'http://localhost:3000/todos';

  getToDos(){
    return this.http.get(this.dbUrl);
}
  
  getToDo(date){
    return this.http.get('http://localhost:3000/todos?date=' + date)
  }

  addToDos(newObject){
    return this.http.post('http://localhost:3000/todos/',newObject)
  }

  deleteTODo(id){
    return this.http.delete(`${environment.toDoUrl}/${id}`)
  }

  updateTasks(id,updatedObj){
    return this.http.put(`${environment.toDoUrl}/${id}`,updatedObj)
  }

}
