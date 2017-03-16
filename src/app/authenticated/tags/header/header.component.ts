/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import { IntroConfig } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-tags-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class TagsHeaderComponent implements OnInit {

  constructor () {
  }

  ngOnInit () {
  }

}

export const tagsHeaderComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [
    {
      element: 'rl-tags-header input.search',
      hint: 'Search tags by name (Work in progress)',
      hintPosition: 'top-middle',
      position: 'bottom'
    },
    {
      element: 'rl-tags-header .add-tag-button',
      hint: 'Click to add tag',
      hintPosition: 'top-left',
      position: 'auto'
    }
  ]
};
