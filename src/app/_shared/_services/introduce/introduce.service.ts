/* tslint:disable:max-classes-per-file */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { User } from '../../../_general/auth/user.model';
const IntroJs = require('intro.js').introJs;

export interface Step {
  intro: string;
}
export interface Hint {
  element: string;
  hint: string;
  hintPosition: string;
  position: string;
}

export interface IntroConfig {
  steps: Step[];
  hints: Hint[];
}

export class Intro {
  constructor (private introJs: any) {
  }

  show (delay = 0): void {
    if (this.introJs._options.steps.length) {
      this.introJs
        .exit() // to prevent error for more that one call of .show() func
        .start() // main start function, that make tooltip visible
        .refresh(); // to make sure tooltip's position is correct
    }
    if (this.introJs._options.hints.length) {
      setTimeout(() => {
        this.introJs.showHints();
      }, delay);
    }
  }
}

@Injectable()
export class IntroduceService {
  readonly greetingKey = 'greetingShown';

  create (config: IntroConfig): Intro {
    config.hints = this.clearDuplicates(config.hints);
    config.steps = this.clearDuplicates(config.steps);
    const newIntro = IntroJs();
    const resultConfig = Object.assign({}, this.getDefaultConfig(), config);
    newIntro.setOptions(resultConfig);
    return new Intro(newIntro);
  }

  shouldShowHintsForNewUser (user: User): boolean {
    const today = new Date();
    const threeDaysAgo = new Date(today.valueOf());
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const isNewUser = new Date(Date.parse(user.createdAt)) > threeDaysAgo;
    const wasGreetedAlready = localStorage.getItem(this.greetingKey);
    if (isNewUser && !wasGreetedAlready) {
      localStorage.setItem(this.greetingKey, 'true');
      return true;
    }
    return false;
  }

  cleanUpOnUserSignOut () {
    localStorage.removeItem(this.greetingKey);
    this.removeHints();
  }

  removeHints () {
    // here we manipulate DOM. Yes. But - we remove elements from custom lib
    //  Intro.js, that doesn't have it's own methods to remove hints
    const hintsContainer = document.querySelector('.introjs-hints');
    if (hintsContainer) {
      hintsContainer.parentNode.removeChild(hintsContainer);
    }
  }

  private getDefaultConfig () {
    return {
      hintButtonLabel: 'Done',
      showStepNumbers: false,
      hidePrev: true,
      hideNext: true,
      showBullets: false
    };
  }

  private clearDuplicates (stepsOrHints: any[]): any[] {
    return _.uniqBy(stepsOrHints, 'element');
  }

}
