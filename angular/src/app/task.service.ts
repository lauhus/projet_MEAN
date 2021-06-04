import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListComponent } from './list/list.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  token : any
  ApiUrl : String
  headers : any
  baerer : any
  userId : any
  newTask : any


  constructor(private http : HttpClient , private userService : UserService){ 
    this.ApiUrl = 'http://127.0.0.1:8081/api/'
    this.userId = this.userService.userId
  }

  updateStateTask(idTask: any , state : any) {
    this.baerer  = `Baerer ${this.userService.userToken}`
    this.headers = new HttpHeaders().set('Authorization',this.baerer)
    let body = { state : state}
    let options = {headers :this.headers}

    this.http.patch<any>(this.ApiUrl+'tasks/'+idTask, body, options  )
        .subscribe((data) => {
        },
        error => console.log(error))
  }

  addTask(newTask : any){
    this.baerer  = `Baerer ${this.userService.userToken}`
    this.headers = new HttpHeaders().set('Authorization',this.baerer)
    let options = {headers :this.headers}
    let user = this.userService.userId
    let body = {
      title : newTask.title,
      content : newTask.content,
      state : newTask.state
    }
    this.http.post<any>(this.ApiUrl+'users/'+user+'/task', body , options)
      .subscribe((data) => {
        this.newTask ={ _id : data.task._id , title : data.task.title  ,content : data.task.content , state : data.task.state , onChange : false}
      },
      error => console.log(error))
  }

  updateTask(idTask : any , Task : any) {
    this.baerer  = `Baerer ${this.userService.userToken}`
    this.headers = new HttpHeaders().set('Authorization',this.baerer)
    let options = {headers :this.headers}
    let body = {
      title : Task.title,
      content : Task.content,
    }
    this.http.patch<any>(this.ApiUrl+'tasks/'+idTask, body , options)
      .subscribe((data) => {
      },
      error => console.log(error))
  }

  deleteTask(idTask : any) {
    this.baerer  = `Baerer ${this.userService.userToken}`
    this.headers = new HttpHeaders().set('Authorization',this.baerer)
    let options = {headers :this.headers}

    this.http.delete<any>(this.ApiUrl+'tasks/'+idTask,options)
      .subscribe((data) => {

      },
      error => console.log(error))
  }
}
