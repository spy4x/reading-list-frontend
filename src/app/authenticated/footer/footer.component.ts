/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import { IntroConfig } from '../../_shared/_services/introduce/introduce.service';
import { userMenuComponentIntroConfig } from '../../_shared/user-menu/user-menu.component';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor () {
  }

  ngOnInit () {
  }

}

export const footerComponentIntroConfig: IntroConfig = {
  steps: [
    ...userMenuComponentIntroConfig.steps
  ],
  hints: [
    ...userMenuComponentIntroConfig.hints,
    {
      element: '.dashboard-link',
      hint: 'Dashboard with useful statistics and with "what to read today"' +
      ' links',
      hintPosition: 'top-middle',
      position: 'top'
    },
    {
      element: '.items-link',
      hint: 'All links that you created',
      hintPosition: 'top-middle',
      position: 'top'
    },
    {
      element: '.tags-link',
      hint: 'Your tags',
      hintPosition: 'top-middle',
      position: 'auto'
    }
  ]
};
