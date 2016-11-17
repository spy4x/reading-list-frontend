import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'rl-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {

  user: User;

  constructor (private _auth: AuthService) {
  }

  ngOnInit () {
    this._auth.user.subscribe(user => this.user = user);
  }

}
