import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public ds:TodoService) { }

  todo:any;
  temp:any;
  isNew = false;
 
  addToDosForm:FormGroup;
  // tasks = new FormArray([   ------Extra Code-----
  //   new FormControl('Recharge Mobile')
  // ]);

  // toDo = {date:'12-05-2021',task1:'Watch person of intrest'}

  ngOnInit(): void {
    // this below Snipet is for Reactive FormArray Which Takes Details To Add Into API
    this.addToDosForm = new FormGroup({
      'date': new FormControl(),
      'id': new FormControl(),
      'tasks': new FormArray([
        new FormControl()
      ])
    })

    //This Is used to check code in Line No 19 ----Extra Code-----
    // console.log(this.tasks);
    
    // This Function Is used to retirve Data From API
    this.ds.getToDos().subscribe(data => {
      this.todo = data;
      console.log(this.todo);       
    })
  }


  //This Function will Fetch The Data By taking Date As Arguments To Filter In the API
  onClick(date){
    console.log(date);
    this.ds.getToDo(date).subscribe(data => {
      console.log('this is responce From server' + data);
      this.temp = data;
      for(let detail in this.temp){
          console.log(this.temp[detail]);
        }

    })
    
  }

  //this Function Is For Togling Add ToDo form
  showForm(){
    this.isNew = !this.isNew;
  }



  addToDo(form){
    console.log('addToDoForm Is Loged Below');
    console.log(form);
    console.log(form.value);
    const formData = form.value;
    console.log(formData);
    this.ds.addToDos(formData).subscribe((res) => { },err => {
    console.log('Server Busy please Try Again Later');
    })
  }


  //This Below Code Is Related To Form Array
  getTasks():FormArray {
    return this.addToDosForm.get('tasks') as FormArray;
  }


  addNewToDo(){
    let tasksArray = this.addToDosForm.get('tasks') as FormArray;
    let newTask = new FormControl();
    tasksArray.push(newTask);
  }

  remove(index){
    let tasksArray = this.getTasks();
    tasksArray.removeAt(index);
  }


  //This function Is To Delete a single Task From TAsk Array
  deleteTask(index,id){
    console.log(index);
    console.log(id);
    const altData = this.temp;
    console.log(altData);
    for( let obj in altData){
      console.log(altData[obj].tasks[index]);
      altData[obj].tasks.splice(index,1);
    }
    console.log(altData);
    let newData = new Object();
    newData = altData[0];
    console.log('below is the output for converting array into object');
    
    console.log(newData);
    
    this.ds.updateTasks(id,newData).subscribe((res) => {
    })
    // console.log(altData.date);
  }

  //this Fuction Implements The Updation of tasks
  select;
  index;
  id;
  editTask(index,id){
    const UpdatedTask = this.temp;
    this.index = index;
    this.id = id;
    console.log(UpdatedTask);
    for( let obj in UpdatedTask){
    this.select = UpdatedTask[obj].tasks[index];
    console.log(this.select);
    
      UpdatedTask[obj].tasks.splice(index,1);
      console.log(UpdatedTask);
    }
  }

  //this function Is used to update The Task list after by taking new input Form user 
  updateSelect;
  onsubmitUpdate(){
    console.log(this.updateSelect);
    const updateTask = this.temp
    for( let obj in updateTask){
      console.log(updateTask[obj].tasks[this.index]);
      updateTask[obj].tasks.splice(this.index,1,this.updateSelect);
      console.log(updateTask);
    }
    let newData = new Object();
    newData = updateTask[0];
    console.log('below is the output for converting array into object');
    
    console.log(newData);
    // console.log(updateTask);
    
    this.ds.updateTasks(this.id,newData).subscribe((res) => {})
    
  }

  addNewTask(id){
    this.id =id;
    
  }


  newTask;
  onsubmitAdd(){
    let altData = this.temp;
    for( let obj in altData){
      console.log(altData[obj].tasks[this.index]);
      altData[obj].tasks.push(this.newTask)
      console.log(altData);
    }
    let newData = new Object();
    newData = altData[0];
    console.log('below is the output for converting array into object');
    
    console.log(newData);
    this.ds.updateTasks(this.id,newData).subscribe((res) => {})
  }


  deleteToDo(id){
    console.log(id);
    this.ds.deleteTODo(id).subscribe((res) => { },err => {
      console.log('Server Is Not Working,Please Check The Server');
      
    })
    
  }

}
