import {Component, OnInit, ViewChild} from '@angular/core';
import {v4 as uuidV4} from 'uuid';
import {MatTable} from '@angular/material/table';
import moment from 'moment';

export interface Lesson {
  id: string;
  date?: Date;
  theme?: string;
  homework?: string;
  notes?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'less4-task1';
  lessons: Lesson[]  = [
    {id: uuidV4(),  date: new Date(), theme: 'Как ангуляриять', homework: 'сделать всё', notes: 'Было здорово'},
    {id: uuidV4(),  date: new Date() , theme: 'Как ангуляриятьdd', homework: 'сделать ddd всё', notes: 'Было dcc здорово'},
  ];
  displayedColumns = [
    'number', 'date', 'theme', 'homework', 'notes', 'edit'
  ];
  formVisible = false;
  editingLesson = {} as any;
  @ViewChild('lessonTable') lessonTable: MatTable<Lesson>;
  ngOnInit(): void {
    const recoveredLessons = JSON.parse(localStorage.getItem('lessonList'));
    this.lessons = recoveredLessons.map((item) => {
      return {...item, date: new Date(item.date)};
    });
  }

  editRow = (id) => {
    if (id) {
      const lessonToEdit = this.lessons.find((item) => item.id === id);
      this.editingLesson = {...lessonToEdit, date: moment(lessonToEdit.date).format('YYYY-MM-DD')};
    } else {
      this.editingLesson = {id: uuidV4()};
    }
    this.formVisible = true;
  }

  afterEdit = () => {
    const index = this.lessons.findIndex((item) => this.editingLesson.id === item.id);
    const lessonToSave = {...this.editingLesson, date: new Date(this.editingLesson.date)};
    if (index < 0) {
      this.lessons.push(lessonToSave);
    } else {
      this.lessons[index] = lessonToSave;
    }
    this.formVisible = false;
    localStorage.setItem('lessonList', JSON.stringify(this.lessons.sort((a, b) => (a.date.getTime() - b.date.getTime()))));
    this.lessonTable.renderRows();
}
  cancelEdit = () => {
    this.formVisible = false;
    this.lessonTable.renderRows();
  }

  deleteLesson = (id) => {
    this.formVisible = false;
    this.lessons = this.lessons.filter((item) => item.id !== id);
    localStorage.setItem('lessonList', JSON.stringify(this.lessons.sort((a, b) => (a.date.getTime() - b.date.getTime()))));
    this.lessonTable.renderRows();
  }


}
