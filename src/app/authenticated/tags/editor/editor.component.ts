/* tslint:disable:max-line-length */
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
import { IntroConfig } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-tags-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.css'],
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

  submitData (formData: Tag): void {
    if (this.form.invalid) {
      return;
    }
    const newTag: Tag = {
      name: formData.name
    };
    this.changed.emit(newTag);
    this.form.reset(this.formDefaultValues);
  }
}

export const tagsEditorComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [
    {
      element: 'rl-tags-editor input#nameInput',
      hint: 'Enter tag name. Recommendations: use lowercase, dashes instead' +
      ' of spaces, keep it short and simple.',
      hintPosition: 'top-middle',
      position: 'bottom'
    }
  ]
};
