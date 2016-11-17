import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';


@Component({
  selector: 'rl-items-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ItemsAddComponent implements OnInit {

  constructor (private _service: ItemsService, private _router: Router) {
  }

  ngOnInit () {
  }

  save (data) {
    data.title = 'Test title ' + Date.now();
    this._service.add(data);
    this._router.navigate(['/items']);
  }

}
