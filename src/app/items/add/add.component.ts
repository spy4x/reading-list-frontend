import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter, Input
} from '@angular/core';
import { MdInput } from '@angular/material';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Item } from '../item.model';


@Component({
  selector: 'rl-items-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ItemsAddComponent implements OnInit {
  readonly formDefaultValues: Item = new Item({priority: 1, type: 'article'});
  readonly itemTypes = ['article', 'video', 'guide'];
  @Input() item: Item;
  @Output() changed = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @ViewChild('urlInput') urlInput: MdInput;
  form: FormGroup;

  constructor (private fb: FormBuilder) {

  }

  initForm () {
    let formValues = this.item ? this.item : this.formDefaultValues;
    this.form = this.fb.group({
      'url': [formValues.url, Validators.required],
      'title': [formValues.title, Validators.required],
      'priority': [formValues.priority, Validators.required],
      'type': [formValues.type, Validators.required],
      'keywords': [formValues.keywords, Validators.required]
    });
    this.urlInput.focus();
  }

  ngOnInit () {
    this.initForm();
  }

  submitData (data: {title, url, priority, type, keywords}): void {
    if (this.form.invalid) {
      return;
    }
    this.changed.emit(data);
    this.form.reset(this.formDefaultValues);
    this.urlInput.focus();
  }
}
