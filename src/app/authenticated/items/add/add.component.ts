import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import { Location } from '@angular/common';
import { State, DataState, UIState } from '../../../_general/store/app.state';
import { ItemAddAction } from '../../../_general/store/items/itemAdd.action';
import { Tag } from '../../tags/tag.model';
import {
  Intro,
  IntroduceService,
  IntroConfig
} from '../../../_shared/_services/introduce/introduce.service';
import { Subscription } from 'rxjs';
import { itemsEditorComponentIntroConfig } from '../editor/editor.component';
import { footerComponentIntroConfig } from '../../footer/footer.component';


@Component({
  selector: 'rl-items-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class ItemsAddComponent implements OnInit, OnDestroy {
  tags: Tag[];
  intro: Intro;
  dataStateSub: Subscription;
  uiStateSub: Subscription;

  constructor (private store: Store<State>,
               private location: Location,
               private introduceService: IntroduceService) {
    this.intro = this.introduceService.create(this.getIntroConfig());
  }

  ngOnInit () {
    this.dataStateSub = this.store
      .select<DataState>('data')
      .map(data => data.tags)
      .subscribe(tags => {
        this.tags = Array.from(tags.values());
      });
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

  save (item: Item) {
    this.store.dispatch(new ItemAddAction(item));
    this.location.back();
  }

  cancel () {
    this.location.back();
  }

  showIntro () {
    this.intro.show(500);
  }

  getIntroConfig (): IntroConfig {
    return {
      steps: [
        ...itemsEditorComponentIntroConfig.steps,
        ...footerComponentIntroConfig.steps
      ],
      hints: [
        ...itemsEditorComponentIntroConfig.hints,
        ...footerComponentIntroConfig.hints
      ]
    };
  }

}
