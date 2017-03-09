import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { State } from '../../_general/store/app.state';
import { Store } from '@ngrx/store';
import { Directive, forwardRef, Input } from '@angular/core';
import { Item } from './item.model';

@Directive({
  /* tslint:disable:max-line-length */
  selector: '[rl-items-is-url-unique][formControlName],[rl-items-is-url-unique][formControl],[rl-items-is-url-unique][ngModel]',
  /* tslint:enable:max-line-length */
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ItemsIsUrlUniqueDirective),
      multi: true
    }
  ]
})
export class ItemsIsUrlUniqueDirective implements Validator {
  @Input() rlItemsIsUrlUniqueCurrentItem: Item;

  constructor (private store: Store<State>) {
  }

  validate (formControl: FormControl) {
    if (!formControl.value) {
      return;
    }
    let state: State;
    this.store.take(1).subscribe(currentState => state = currentState);
    const itemFound = Array.from(state.data.items.values())
      .find(item => {
        const isTheCurrentItem =
          item.url === this.rlItemsIsUrlUniqueCurrentItem.url;
        return !isTheCurrentItem && item.url === formControl.value;
      });
    return itemFound
      ? {urlUnique: true}
      : undefined;
  }
}
