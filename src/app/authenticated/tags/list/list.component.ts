/* tslint:disable:max-line-length */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from '../tag.model';
import { State, DataState, UIState } from '../../../_general/store/app.state';
import {
  IntroduceService,
  Intro,
  IntroConfig
} from '../../../_shared/_services/introduce/introduce.service';
import { tagsLineComponentIntroConfig } from '../line/line.component';
import { Subscription } from 'rxjs';
import { footerComponentIntroConfig } from '../../footer/footer.component';
import { tagsHeaderComponentIntroConfig } from '../header/header.component';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-tags-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class TagsListComponent implements OnInit, OnDestroy {
  tags: Tag[];
  intro: Intro;
  dataStateSub: Subscription;
  uiStateSub: Subscription;

  constructor (private store: Store<State>,
               private introduceService: IntroduceService) {
    this.intro = introduceService.create(this.getIntroConfig());
  }

  ngOnInit () {
    this.dataStateSub = this.store.select<DataState>('data')
      .map(state => Array.from(state.tags.values()))
      .map((tags: Tag[]) => tags.sort((tag1, tag2) => {
        return tag1.name.localeCompare(tag2.name);
      }))
      .subscribe(items => this.tags = items);
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
        ...tagsHeaderComponentIntroConfig.steps,
        ...tagsLineComponentIntroConfig.steps,
        ...footerComponentIntroConfig.steps
      ],
      hints: [
        ...tagsHeaderComponentIntroConfig.hints,
        ...tagsLineComponentIntroConfig.hints,
        ...footerComponentIntroConfig.hints
      ]
    };
  }
}
