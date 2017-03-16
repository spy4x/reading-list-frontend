import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Tag } from '../tag.model';
import { State, UIState } from '../../../_general/store/app.state';
import { TagAddAction } from '../../../_general/store/tags/tagAdd.action';
import {
  Intro,
  IntroduceService,
  IntroConfig
} from '../../../_shared/_services/introduce/introduce.service';
import { Subscription } from 'rxjs';
import { tagsEditorComponentIntroConfig } from '../editor/editor.component';
import { footerComponentIntroConfig } from '../../footer/footer.component';


@Component({
  selector: 'rl-tags-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class TagsAddComponent implements OnInit, OnDestroy {
  intro: Intro;
  uiStateSub: Subscription;

  constructor (private store: Store<State>,
               private location: Location,
               private introduceService: IntroduceService) {
    this.intro = this.introduceService.create(this.getIntroConfig());
  }

  ngOnInit () {
    this.uiStateSub = this.store.select<UIState>('ui').subscribe(uiState => {
      if (uiState.hintsVisible) {
        this.showIntro();
      }
    });
  }

  ngOnDestroy () {
    this.uiStateSub.unsubscribe();
  }

  save (tag: Tag) {
    this.store.dispatch(new TagAddAction(tag));
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
        ...tagsEditorComponentIntroConfig.steps,
        ...footerComponentIntroConfig.steps
      ],
      hints: [
        ...tagsEditorComponentIntroConfig.hints,
        ...footerComponentIntroConfig.hints
      ]
    };
  }

}
