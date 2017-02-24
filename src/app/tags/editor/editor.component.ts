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
import { Tag } from '../tag.model';


@Component({
  selector: 'rl-tags-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsEditorComponent implements OnInit, OnChanges {

  readonly formDefaultValues: Tag = {
    name: ''
  };
  @Input() tag: Tag;
  @Output() changed = new EventEmitter<Tag>();
  @Output() cancel = new EventEmitter();
  form: FormGroup;

  constructor (private fb: FormBuilder) {

  }

  ngOnInit () {
    this.initForm();
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.setNewFormValue(this.tag);
  }

  initForm () {
    const formValues = this.tag ? this.tag : this.formDefaultValues;
    this.form = this.fb.group({
      'name': [formValues.name, Validators.required]
    });
  }

  setNewFormValue (newValue: Tag) {
    if (!this.form || !newValue) {
      return;
    }
    this.form.setValue({
      name: newValue.name
    });
  }

  submitData (data: Tag): void {
    if (this.form.invalid) {
      return;
    }
    this.changed.emit(data);
    this.form.reset(this.formDefaultValues);
  }
}
