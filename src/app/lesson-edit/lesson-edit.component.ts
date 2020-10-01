import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {EditingLesson, Lesson, LessonService} from '../lesson.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent implements OnChanges {

  constructor(private lessonService: LessonService) {
    this.prepareForm(null);
  }
  editingLesson: EditingLesson;

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
   this.editingLesson = this.lessonService.getLessonById(id);
  }

  afterEdit = () => {
    this.lessonService.addLesson(this.editingLesson);
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
