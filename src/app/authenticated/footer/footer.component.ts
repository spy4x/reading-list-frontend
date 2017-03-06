import { Component, OnInit } from '@angular/core';
import { User } from '../../_general/auth/user.model';

@Component({
  selector: 'rl-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {

  user: User;

  constructor () {
  }

  ngOnInit () {
  }

}
