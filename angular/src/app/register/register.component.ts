import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : any;

  constructor(private formBuilder: FormBuilder , private userService : UserService) {
    this.registerForm = this.formBuilder.group({
      name : '',
      mail : '',
      pass : ''
    })
   }

  ngOnInit(): void {
  }

  submitRegister() {
    console.log(this.registerForm)
    var name = this.registerForm.value.name
    var mail = this.registerForm.value.mail
    var pass = this.registerForm.value.pass
    this.userService.addUser({name : name , mail : mail , pass : pass})
  }

}
