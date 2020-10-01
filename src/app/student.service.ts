import {Injectable, OnInit} from '@angular/core';
import {v4 as uuidV4} from 'uuid';
export interface Student {
  id: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  marks?: Record<string, number>;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [];
  constructor() {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.students = JSON.parse(localStorage.getItem('studentList')) || [];
  }

  addStudent = (student: Student) => {
    const newStudentsList = [...this.students];
    const index = newStudentsList.findIndex((item) => student.id === item.id);
    if (index < 0) {
      newStudentsList.push({...student, marks: {}});
    } else {
      newStudentsList[index] = {...student};
    }
    this.saveStudentList(newStudentsList);
  }


  private saveStudentList = (newStudentsList: Student[]): void => {
    localStorage.setItem('studentList', JSON.stringify(newStudentsList.sort((a, b) =>
      (this.formatName(a).localeCompare(this.formatName(b))))));
    this.students = newStudentsList;
  }

  deleteStudent = (id) => {
    const newStudentsList = this.students.filter((item) => item.id !== id);
    this.saveStudentList(newStudentsList);
  }

  formatName = (student: Student): string => [student.surname, student.name, student.patronymic].filter(Boolean).join(' ');

  getStudentById = (id: string): Student => {
    if (id) {
      const student = this.students.find((item) => item.id === id);
      if (student) { return student; }
    }
    return {id: uuidV4()};
  }

  calculateAverage = (student: Student, accuracy = 0) => {
    const marks = Object.values(student.marks).filter((value => typeof value === 'number'));
    if (!marks.length) { return 0; }
    const averageMark = marks.reduce(((previousValue, currentValue) => previousValue + currentValue), 0) / marks.length;
    const multi = 10 ** accuracy;
    return Math.round(averageMark * multi) / multi;
  }
}


