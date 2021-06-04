import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks : any
  task: any;
  new = false 
  createTask : any;
  state: any;
  title_update : any
  content_update : any
  title_new : any
  content_new : any

  constructor( private taskService : TaskService , private userService : UserService) { 
    this.title_new = '',
    this.content_new = ''
    this.tasks = this.userService.tasks
    this.title_update = ""
    this.content_update = ""

    
  }

  ngOnInit(): void {
  }

  updateTask(task : any , i : any) {
    this.task = task
    this.tasks[i].onChange = true
    this.title_update = this.task.title
    this.content_update = this.task.content
  }

  annuleModif(i : any){
    this.tasks[i].onChange = false
  }

  changeState(_id : any , change : string , state : number, i : any){
    if (change === '+') {
      let newState = state+1 
      this.taskService.updateStateTask(_id , newState)
      this.tasks[i].state = newState
    } else if ( change === '-') {
      let newState = state-1
      this.taskService.updateStateTask(_id , newState)
      this.tasks[i].state = newState
    }
  }

  updateTaskFormFunction(i : any) {
    console.log(this.task)
    var idTask = this.task._id
    var title = this.title_update
    var content = this.content_update
    this.taskService.updateTask(idTask , {title : title , content : content})
    this.tasks[i].onChange = false
    this.tasks[i].title = title
    this.tasks[i].content = content
  }

  changeNew(state : any) {
    console.log(state)
    this.state = state
    console.log(this.state)
    if (this.new === false){
      this.new = true
    } else {
      this.new = false
    }
  }

  newTask(){
    console.log(this.state)
    let newTask = {
      title : this.title_new, 
      content : this.content_new,
      state : this.state
    }
    this.taskService.addTask(newTask)
    this.new = false
    setTimeout(() => this.tasks.push(this.taskService.newTask), 500)
    this.title_new = ''
    this.content_new= ''
    this.state = ''
  }


  deleteTask(id : any , i : any){
    this.taskService.deleteTask(id)
    this.tasks.splice(i,1)
  }

}
