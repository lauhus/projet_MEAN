import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  loading : Boolean
  error : any

  constructor(private formBuilder: FormBuilder , private userService : UserService ) {
    this.loginForm = this.formBuilder.group({
      mail: '',
      pass : ''
    })
    this.loading = this.userService.loading
    this.error = ''
   }


  ngOnInit(): void {
  }

  submitLogin() {
    this.loading = this.userService.loading
    console.log(this.loading)
    var mail = this.loginForm.value.mail
    var pass = this.loginForm.value.pass
    this.userService.connect(mail , pass)
    setTimeout(() => this.error = this.userService.error , 500)
    
  }

}
