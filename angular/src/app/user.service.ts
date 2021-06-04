import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userConnected: any
  tasks : any
  userToken : String
  userId : number
  ApiUrl : String
  loading : Boolean
  error : any

  constructor(private http: HttpClient , private router : Router) { 
    this.userConnected = {}
    this.tasks = ''
    this.userToken = ''
    this.ApiUrl = 'http://127.0.0.1:8081/api/'
    this.userId = 0
    this.loading = false
  }

  connect(mail: String , pass: String) {
    this.loading = true
    this.http.post<any>(this.ApiUrl+'connect' , {mail : mail , pass: pass})
      .subscribe((data) => {
        this.userToken = data.token
        this.userId = data.userId
        this.getUser()
      },
      error => {
        console.log(error)
        this.error = 'Erreur dans les identifiants'})
    }

    getUser() {
      let config = {
        headers : {
          'Authorization' : 'Baerer '+this.userToken
        }
      }
      this.http.get<any>(this.ApiUrl+'users/'+this.userId , config)
        .subscribe((data) => {
          this.userConnected = []
          this.userConnected.push({ name : data.name , mail : data.mail , pass : data.pass})
          this.tasks = []
          data.tasks.map((task_ : any) => this.tasks.push({_id : task_._id , title : task_.title , content : task_.content , state : task_.state , onChange : false}))
          if (this.userToken !== '' && this.tasks !== '') {
            this.router.navigate(['tasks'])
            this.loading = false
          }
        },
        error => console.log(error))

    }

    addUser(user : any){
      this.http.post<any>(this.ApiUrl+'users' , user)
        .subscribe((data) => {
          let mail = data.data.mail
          let pass = data.data.pass
          this.connect(mail,pass)
          this.router.navigate(['tasks'])
        },
        error => console.log(error))
    }

    updateUser(userUpdated : any) {
      let config = {
        headers : {
          'Authorization' : 'Baerer '+this.userToken
        }
      }

      var body = { 
        name : userUpdated.name , 
        mail : userUpdated.mail , 
        pass : userUpdated.pass 
      }
      this.http.patch<any>(this.ApiUrl+'users/'+this.userId, body, config)
        .subscribe((data) => {
          this.userConnected = data
        },
        error => console.log(error))
    }


    deleteUser(id : any) {
      let config = {
        headers : {
          'Authorization' : 'Baerer '+this.userToken
        }
      }
      this.http.delete<any>(this.ApiUrl+'users/'+this.userId,config)
      .subscribe((data) => {
        this.userConnected = {}
        this.userToken = ''
        this.router.navigate(['login'])
      },
      error => console.log(error))
    }
}
