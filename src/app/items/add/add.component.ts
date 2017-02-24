import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../items.service';


@Component({
  selector: 'rl-items-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ItemsAddComponent implements OnInit {

  constructor (private service: ItemsService, private router: Router) {
  }

  ngOnInit () {
  }

  save (data) {
    this.service.add(data);
    this.router.navigate(['/']);
  }

}
