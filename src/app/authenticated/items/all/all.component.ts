import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import { State, DataState, UIState } from '../../../_general/store/app.state';
/* tslint:disable:max-line-length */
import {
  IntroduceService,
  Intro,
  IntroConfig
} from '../../../_shared/_services/introduce/introduce.service';
import { Subscription } from 'rxjs';
import { footerComponentIntroConfig } from '../../footer/footer.component';
import { itemsReadTodayComponentIntroConfig } from '../read-today/read-today.component';
import { itemsListComponentIntroConfig } from '../list/list.component';
import { itemsHeaderComponentIntroConfig } from '../header/header.component';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-items-all',
  templateUrl: 'all.component.html',
  styleUrls: ['all.component.css']
})
export class ItemsAllComponent implements OnInit, OnDestroy {
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
      .map(dataState => Array.from(dataState.items.values()))
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
        {
          intro: require('./greeting.intro.html')
        },
        ...itemsHeaderComponentIntroConfig.steps,
        ...itemsListComponentIntroConfig.steps,
        ...itemsReadTodayComponentIntroConfig.steps,
        ...footerComponentIntroConfig.steps
      ],
      hints: [
        ...itemsHeaderComponentIntroConfig.hints,
        ...itemsListComponentIntroConfig.hints,
        ...itemsReadTodayComponentIntroConfig.hints,
        ...footerComponentIntroConfig.hints
      ]
    };
  }
}
