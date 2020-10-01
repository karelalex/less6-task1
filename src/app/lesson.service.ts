import {Injectable} from '@angular/core';
import {v4 as uuidV4} from 'uuid';
import moment from 'moment';

export interface Lesson {
  id: string;
  date?: Date;
  theme?: string;
  homework?: string;
  notes?: string;
}

export interface EditingLesson {
  id: string;
  date?: string;
  theme?: string;
  homework?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  lessons: Lesson[] = [];

  constructor() {
    this.loadLessons();
  }

  loadLessons = (): void => {
    const recoveredLessons = JSON.parse(localStorage.getItem('lessonList')) || [];
    this.lessons = recoveredLessons.map((item) => {
      return {...item, date: new Date(item.date)};
    });
  }

  getLessonById = (id: string): EditingLesson => {
    if (id) {
      const lesson = this.lessons.find((item) => item.id === id);
      if (lesson) {
        return {...lesson, date: moment(lesson.date).format('YYYY-MM-DD')};
      }
    }
    return {id: uuidV4()};
  }

  addLesson = (lesson: EditingLesson): void => {
    const newLessonsList = [...this.lessons];
    const index = newLessonsList.findIndex((item) => lesson.id === item.id);
    const lessonToSave = {...lesson, date: new Date(lesson.date)};
    if (index < 0) {
      newLessonsList.push(lessonToSave);
    } else {
      newLessonsList[index] = lessonToSave;
    }
    this.saveLessonList(newLessonsList);
}
  saveLessonList = (list: Lesson[]): void => {
    localStorage.setItem('lessonList', JSON.stringify(list.sort((a, b) => (a.date.getTime() - b.date.getTime()))));
    this.lessons = list;
  }

  deleteLesson = (id) => {
    const newLessonList = this.lessons.filter((item) => item.id !== id);
    this.saveLessonList(newLessonList);
  }
}

