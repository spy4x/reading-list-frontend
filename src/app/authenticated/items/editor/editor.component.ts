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
import * as _ from 'lodash';


@Component({
  selector: 'rl-items-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsEditorComponent implements OnInit, OnChanges {

  @Input() item: Item;
  @Input() tags: string[];
  @Output() changed = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter();
  mainForm: FormGroup;
  metaDataForm: FormGroup;
  selectedTags: string[] = [];
  editMode: boolean;

  readonly formDefaultValues: Item = {
    priority: 1,
    title: '',
    imageUrl: '',
    description: '',
    url: '',
    tags: []
  };

  constructor (private fb: FormBuilder,
               private openGraphService: OpenGraphService) {

  }

  ngOnInit () {
    this.initMainForm();
    this.initMetaDataForm();
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (!_.isEqual(changes['item'].currentValue,
        changes['item'].previousValue)) {
      this.setNewFormValue(this.item);
    }
  }

  initMainForm () {
    const formValues = this.item ? this.item : this.formDefaultValues;
    this.mainForm = this.fb.group({
      'url': [formValues.url, Validators.required],
      'priority': [formValues.priority, Validators.required]
    });
    this.mainForm.valueChanges
      .debounceTime(450)
      .map(formValue => formValue.url)
      .filter(url => !!url)
      .map(url => {
        if (this.hasProtocol(url)) {
          return url;
        } else {
          const urlWithProtocol = this.addProtocol(url);
          this.mainForm.patchValue({url: urlWithProtocol});
          return urlWithProtocol;
        }
      })
      .filter(url => !this.item || url !== this.item.url)
      .distinct(url => url)
      .switchMap(url => this.openGraphService.parse(url))
      .catch(err => Observable.of(undefined))
      .subscribe(openGraphInfo => {
        if (!openGraphInfo) {
          return;
        }
        this.metaDataForm.patchValue({
          title: openGraphInfo.title,
          imageUrl: openGraphInfo.image,
          description: openGraphInfo.description
        });
      });
  }

  initMetaDataForm () {
    const formValues = this.item ? this.item : this.formDefaultValues;
    this.metaDataForm = this.fb.group({
      'title': [formValues.title, Validators.required],
      'imageUrl': [formValues.imageUrl],
      'description': [formValues.description]
    });
  }

  setNewFormValue (newValue: Item) {
    if (!this.mainForm || !this.metaDataForm || !newValue) {
      return;
    }
    this.mainForm.patchValue({
      url: newValue.url,
      priority: newValue.priority
    });
    this.metaDataForm.patchValue({
      title: newValue.title,
      imageUrl: newValue.imageUrl,
      description: newValue.description
    });
  }

  isSubmitDisabled (): boolean {
    return this.mainForm.invalid || this.metaDataForm.invalid;
  }

  submit (): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const formValues: {url, priority, title, imageUrl, description} =
      Object.assign({}, this.mainForm.value, this.metaDataForm.value);
    const newItem: Item = {
      title: formValues.title,
      url: formValues.url,
      imageUrl: formValues.imageUrl,
      description: formValues.description,
      priority: formValues.priority,
      tags: this.selectedTags
    };
    this.changed.emit(newItem);
    this.mainForm.reset(this.formDefaultValues);
    this.metaDataForm.reset(this.formDefaultValues);
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
