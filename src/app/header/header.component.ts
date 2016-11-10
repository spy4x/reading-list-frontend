import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'rl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  authUrl: string;

  constructor (private _auth: AuthService) {
    this.authUrl = this._auth.getAuthUrl();
  }

  ngOnInit () {
    this._auth.user.subscribe(user => {
      this.user = user;
      console.log('HeaderComponent - new user appeared:', user);
    });
  }

  signOut (): void {
    this._auth.signOut();
  }


}
