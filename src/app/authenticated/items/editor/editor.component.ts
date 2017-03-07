import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item.model';
/* tslint:disable:max-line-length */
import { OpenGraphService } from '../../../_general/openGraph/open-graph.service';
import { Observable } from 'rxjs';
/* tslint:enable:max-line-length */


@Component({
  selector: 'rl-items-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsEditorComponent implements OnInit, OnChanges {

  readonly formDefaultValues: Item = {
    priority: 1,
    title: '',
    url: '',
    tags: []
  };
  @Input() item: Item;
  @Input() tags: string[];
  @Output() changed = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter();
  form: FormGroup;
  selectedTags: string[] = [];

  constructor (private fb: FormBuilder,
               private openGraphService: OpenGraphService) {

  }

  ngOnInit () {
    this.initForm();
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.setNewFormValue(this.item);
  }

  initForm () {
    const formValues = this.item ? this.item : this.formDefaultValues;
    this.form = this.fb.group({
      'url': [formValues.url, Validators.required],
      'title': [formValues.title, Validators.required],
      'priority': [formValues.priority, Validators.required]
    });
    this.form.valueChanges
      .debounceTime(450)
      .map(formValue => {
        if (this.hasProtocol(formValue.url)) {
          return formValue.url;
        } else {
          const urlWithProtocol = this.addProtocol(formValue.url);
          this.form.patchValue({url: urlWithProtocol});
          return urlWithProtocol;
        }
      })
      .filter(url => !!url)
      .distinct(url => url)
      .switchMap(url => this.openGraphService.parse(url))
      .catch(err => Observable.of(undefined))
      .subscribe(openGraphInfo => {
        if (!openGraphInfo) {
          return;
        }
        this.form.patchValue({title: openGraphInfo.title});
      });
  }

  setNewFormValue (newValue: Item) {
    if (!this.form || !newValue) {
      return;
    }
    this.form.setValue({
      url: newValue.url,
      title: newValue.title,
      priority: newValue.priority
    });
  }

  submitData (formValues: {title, url, priority}): void {
    if (this.form.invalid) {
      return;
    }
    const newItem: Item = {
      title: formValues.title,
      url: formValues.url,
      priority: formValues.priority,
      tags: this.selectedTags
    };
    this.changed.emit(newItem);
    this.form.reset(this.formDefaultValues);
    this.selectedTags = [];
  }


  private hasProtocol (url: string): boolean {
    if (!url) {
      return false;
    }
    return url.lastIndexOf('http://') === 0 ||
      url.lastIndexOf('https://') === 0 ||
      url.lastIndexOf('ftp://') === 0 ||
      url.lastIndexOf('ftps://') === 0 ||
      url.lastIndexOf('file://') === 0;
  }

  private addProtocol (url: string): string {
    return this.hasProtocol(url) ? url : `http://${url}`;
  }
}
