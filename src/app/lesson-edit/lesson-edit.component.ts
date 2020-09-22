import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {v4 as uuidV4} from 'uuid';
import moment from 'moment';
import {Lesson} from '../app.component';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent implements OnChanges {

  constructor() {
  }
  editingLesson = {} as any;

  @Input() lessonId: string;
  @Input() lessons: Lesson[];
  @Output() finishEdit = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.lessonId) { return; }
    const currentLessonId = changes.lessonId.currentValue;
    if (changes.lessonId.previousValue !== currentLessonId) {
      this.editRow(currentLessonId);
    }
  }

  editRow = (id) => {
    if (id) {
      const lessonToEdit = this.lessons.find((item) => item.id === id);
      this.editingLesson = {...lessonToEdit, date: moment(lessonToEdit.date).format('YYYY-MM-DD')};
    } else {
      this.editingLesson = {id: uuidV4()};
    }
  }

  afterEdit = () => {
    const index = this.lessons.findIndex((item) => this.editingLesson.id === item.id);
    const lessonToSave = {...this.editingLesson, date: new Date(this.editingLesson.date)};
    if (index < 0) {
      this.lessons.push(lessonToSave);
    } else {
      this.lessons[index] = lessonToSave;
    }
    localStorage.setItem('lessonList', JSON.stringify(this.lessons.sort((a, b) => (a.date.getTime() - b.date.getTime()))));
    this.finishEdit.emit();
  }

  cancelEdit = () => {
    this.finishEdit.emit();
  }

  deleteLesson = (id) => {
    this.lessons = this.lessons.filter((item) => item.id !== id);
    localStorage.setItem('lessonList', JSON.stringify(this.lessons.sort((a, b) => (a.date.getTime() - b.date.getTime()))));
    this.finishEdit.emit();
  }
}
