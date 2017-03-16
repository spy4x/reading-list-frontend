/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import { IntroConfig } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-items-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class ItemsHeaderComponent implements OnInit {

  constructor () {
  }

  ngOnInit () {
  }

}

export const itemsHeaderComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [
    {
      element: 'rl-items-header input.search',
      hint: 'Full-text rich search with url, title, @tags, !priorities, etc' +
      ' (Work in progress)',
      hintPosition: 'top-middle',
      position: 'bottom'
    },
    {
      element: 'rl-items-header .add-item-button',
      hint: 'Click to add link',
      hintPosition: 'top-left',
      position: 'auto'
    }
  ]
};
