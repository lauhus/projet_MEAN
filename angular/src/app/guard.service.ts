import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private userService : UserService , private router : Router) { }

  canActivate(): boolean{
    let user = this.userService.userConnected
    let token = this.userService.userToken
    if (user.length !== 0 && token !== '' ) {
      return true
    } else {
      this.router.navigate(['error'])
      return false
    }
  }
}
