import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user : any
  change : boolean
  newName : any
  newMail : any
  oldPassword : any
  newPassword : any
  error : any

  constructor(private userService : UserService) { 
    this.user = this.userService.userConnected[0]
    this.change = false 
    this.newName = ''
    this.newMail = ''
    this.oldPassword = ''
    this.newPassword = ''
    this.error = ''
  }

  ngOnInit(): void {
  }

  update() {
    this.change = true
    console.log(this.user.name)
    this.newName = this.user.name
    this.newMail = this.user.mail
  }

  updateUser(id : any) {
    if (this.newPassword !== '') {
      if (this.oldPassword === this.user.pass){
        this.userService.updateUser({name : this.newName , mail : this.newMail , pass: this.newPassword})
        this.user.name = this.newName
        this.user.mail = this.newMail
        this.user.pass = this.newPassword
        this.change = false
        this.oldPassword = ''
      this.newPassword = ''
      } else {
        this.error = 'Mot de passe érroné'
      }
    } else {
      this.userService.updateUser({name : this.newName , mail : this.newMail})
      this.user.name = this.newName
      this.user.mail = this.newMail
      this.change = false
      this.oldPassword = ''
      this.newPassword = ''
    }
  }

  deleteUser(id : any) {
    this.userService.deleteUser(id)
  }

}
