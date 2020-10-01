import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {LessonService} from '../lesson.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {dateValidator} from '../validators';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent implements OnChanges {
  lessonForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    number: new FormControl(
      undefined,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^(\d+)$/)
        ]
    ),
    date: new FormControl(undefined, [Validators.required, dateValidator]),
    theme: new FormControl(undefined, [Validators.required, Validators.pattern(/[А-Яа-я]+/)]),
    homework: new FormControl(undefined, [Validators.required, Validators.pattern(/[А-Яа-я]+/)]),
    notes: new FormControl()
  });
  constructor(private lessonService: LessonService) {
    this.prepareForm(null);
  }

  @Input() lessonId: string;
  @Output() finishEdit = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.lessonId) { return; }
    const currentLessonId = changes.lessonId.currentValue;
    if (changes.lessonId.previousValue !== currentLessonId) {
      this.prepareForm(currentLessonId);
    }
  }

  prepareForm = (id) => {
   this.lessonForm.reset();
   this.lessonForm.patchValue(this.lessonService.getLessonById(id));
  }

  afterEdit = () => {
    this.lessonService.addLesson(this.lessonForm.value);
    this.prepareForm(null);
    this.finishEdit.emit();
  }

  cancelEdit = () => {
    this.prepareForm(null);
    this.finishEdit.emit();
  }

  deleteLesson = (id) => {
    this.lessonService.deleteLesson(id);
    this.prepareForm(null);
    this.finishEdit.emit();
  }
}
