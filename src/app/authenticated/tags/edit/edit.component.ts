import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tag } from '../tag.model';
import { State, DataState, UIState } from '../../../_general/store/app.state';
import { TagEditAction } from '../../../_general/store/tags/tagEdit.action';
import {
  Intro,
  IntroduceService, IntroConfig
} from '../../../_shared/_services/introduce/introduce.service';
import { tagsEditorComponentIntroConfig } from '../editor/editor.component';
import { footerComponentIntroConfig } from '../../footer/footer.component';

@Component({
  selector: 'rl-tags-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})
export class TagsEditComponent implements OnInit, OnDestroy {
  tag: Tag;
  intro: Intro;
  routeParamsSub: Subscription;
  uiStateSub: Subscription;

  constructor (private store: Store<State>,
               private location: Location,
               private route: ActivatedRoute,
               private introduceService: IntroduceService) {
    this.intro = this.introduceService.create(this.getIntroConfig());
  }

  ngOnInit () {
    this.routeParamsSub = this.route.params
      .combineLatest(this.store.select<DataState>('data'))
      .map((values: [Params, DataState]) => {
        return {id: values[0]['id'], tags: values[1].tags};
      })
      .subscribe((values: {id: string, tags: Map<string, Tag>}) => {
        this.tag = values.tags.get(values.id);
      });
    this.uiStateSub = this.store.select<UIState>('ui').subscribe(uiState => {
      if (uiState.hintsVisible) {
        this.showIntro();
      }
    });
  }

  ngOnDestroy () {
    this.routeParamsSub.unsubscribe();
    this.uiStateSub.unsubscribe();
  }

  save (changes: any): void {
    this.store.dispatch(new TagEditAction({
      tag: this.tag,
      changes
    }));
    this.location.back();
  }

  cancel (): void {
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
