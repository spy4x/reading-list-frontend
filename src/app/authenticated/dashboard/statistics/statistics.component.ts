/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import { IntroConfig } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor () {
  }

  ngOnInit () {
  }

}

export const statisticsComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [{
    element: 'rl-statistics .statistics-charts',
    hint: 'There will be some useful statistics about how do you collect' +
    ' links and how often do you view them (Work in progress)',
    hintPosition: 'top-middle',
    position: 'auto'
  }]
};
