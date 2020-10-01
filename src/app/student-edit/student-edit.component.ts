import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {Student, StudentService} from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnChanges {
  @Input() studentId: string;
  @Output() finishEdit = new EventEmitter();
  editingStudent = {} as Student;
  constructor(private studentService: StudentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.studentId) {return; }
    const currentStudentId = changes.studentId.currentValue;
    if (changes.studentId.previousValue !== currentStudentId) {
      this.prepareForm(currentStudentId);
    }
  }

  prepareForm = (id: string): void => {
    this.editingStudent = this.studentService.getStudentById(id);
  }

  afterEdit = () => {
    this.studentService.addStudent(this.editingStudent);
    this.prepareForm(null);
    this.finishEdit.emit();
  }

  cancelEdit = () => {
    this.prepareForm(null);
    this.finishEdit.emit();
  }

  deleteStudent = (id) => {
    this.studentService.deleteStudent(id);
    this.prepareForm(null);
    this.finishEdit.emit();
  }

}
