/* tslint:disable:max-line-length */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../items/item.model';
import { State, DataState, UIState } from '../../_general/store/app.state';
import { statisticsComponentIntroConfig } from './statistics/statistics.component';
import { itemsReadTodayComponentIntroConfig } from '../items/read-today/read-today.component';
import {
  IntroduceService,
  Intro,
  IntroConfig
} from '../../_shared/_services/introduce/introduce.service';
import { Subscription } from 'rxjs';
import { itemsHeaderComponentIntroConfig } from '../items/header/header.component';
import { footerComponentIntroConfig } from '../footer/footer.component';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  items: Item[];
  intro: Intro;
  dataStateSub: Subscription;
  uiStateSub: Subscription;

  constructor (private store: Store<State>,
               private introduceService: IntroduceService) {
    this.intro = introduceService.create(this.getIntroConfig());
  }

  ngOnInit () {
    this.dataStateSub = this.store.select<DataState>('data')
      .map(state => Array.from(state.items.values()))
      .subscribe(items => this.items = items);
    this.uiStateSub = this.store.select<UIState>('ui').subscribe(uiState => {
      if (uiState.hintsVisible) {
        this.showIntro();
      }
    });
  }

  ngOnDestroy () {
    this.dataStateSub.unsubscribe();
    this.uiStateSub.unsubscribe();
  }

  showIntro () {
    this.intro.show(500);
  }

  getIntroConfig (): IntroConfig {
    return {
      steps: [
        ...itemsHeaderComponentIntroConfig.steps,
        ...statisticsComponentIntroConfig.steps,
        ...itemsReadTodayComponentIntroConfig.steps,
        ...footerComponentIntroConfig.steps
      ],
      hints: [
        ...itemsHeaderComponentIntroConfig.hints,
        ...itemsReadTodayComponentIntroConfig.hints,
        ...statisticsComponentIntroConfig.hints,
        ...footerComponentIntroConfig.hints
      ]
    };
  }

}
