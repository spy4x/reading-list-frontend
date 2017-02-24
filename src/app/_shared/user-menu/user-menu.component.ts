import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_general/auth/auth.service';
import { User } from '../../_general/auth/user.model';

@Component({
  selector: 'rl-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  user: User;

  constructor (private auth: AuthService) {
  }

  ngOnInit () {
    this.auth.user.subscribe(user => this.user = user);
  }

  signOut (): void {
    this.auth.signOut();
  }

}
