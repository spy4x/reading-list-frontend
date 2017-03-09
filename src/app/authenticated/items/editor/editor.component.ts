import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item.model';
/* tslint:disable:max-line-length */
import { OpenGraphService } from '../../../_general/openGraph/open-graph.service';
import { Observable } from 'rxjs';
/* tslint:enable:max-line-length */
import * as _ from 'lodash';
import { Tag } from '../../tags/tag.model';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'rl-items-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsEditorComponent implements OnInit, OnChanges {

  @Input() item: Item;
  @Input() tags: Tag[];
  @Output() changed = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter();
  @ViewChild('tagsInput') tagsInputHTMLElement: ElementRef;
  readonly formDefaultValues: Item = {
    priority: 1,
    title: '',
    imageUrl: '',
    description: '',
    url: '',
    tags: []
  };
  itemClone: Item = this.formDefaultValues;
  mainForm: FormGroup;
  metaDataForm: FormGroup;
  editMode: boolean;


  constructor (private fb: FormBuilder,
               private openGraphService: OpenGraphService) {

  }

  ngOnInit () {
    this.initMainForm();
    this.initMetaDataForm();
  }

  ngOnChanges (changes: SimpleChanges): void {
    const itemChange = changes['item'];
    if (itemChange) {
      this.itemClone = _.cloneDeep(itemChange.currentValue);
      if (!_.isEqual(itemChange.currentValue, itemChange.previousValue)) {
        this.setNewFormValue(this.itemClone);
      }
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
      .do(formValue => this.registerItemCloneChanges(formValue))
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
    this.metaDataForm.valueChanges
      .debounceTime(450)
      .subscribe(formValue => this.registerItemCloneChanges(formValue));
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
    this.changed.emit(this.itemClone);
  }

  searchTag = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        if (term.length < 1) {
          return [];
        }
        return this.tags
          .filter(tag => new RegExp(term, 'gi').test(tag.name))
          .filter(tag => {
            return !this.itemClone.tags
              .find(selectedTag => selectedTag._id === tag._id);
          })
          .splice(0, 10);
      });
  }

  tagInputFormatter = (tag: Tag) => tag.name;

  tagsInputSelectedEvent = (event: NgbTypeaheadSelectItemEvent) => {
    const selectedTag: Tag = event.item;
    this.registerItemCloneChanges({
      tags: [ ...this.itemClone.tags, selectedTag ]
    });
    event.preventDefault();
    this.tagsInputHTMLElement.nativeElement.value = '';
  }

  removeTag (tagToRemove: Tag) {
    this.registerItemCloneChanges({
      tags: _.without(this.itemClone.tags, tagToRemove)
    });
  }

  private registerItemCloneChanges (changes: any): void {
    this.itemClone = Object.assign({}, this.itemClone, changes);
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
