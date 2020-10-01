import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {Student, StudentService} from '../student.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnChanges {
  @Input() studentId: string;
  @Output() finishEdit = new EventEmitter();
  constructor(private studentService: StudentService) { }
  studentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(undefined, [Validators.required, Validators.pattern(/[А-Яа-я]+/)]),
    surname: new FormControl(undefined, [Validators.required, Validators.pattern(/[А-Яа-я]+/)]),
    patronymic: new FormControl(undefined, [Validators.required, Validators.pattern(/[А-Яа-я]+/)]),
  });
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.studentId) {return; }
    const currentStudentId = changes.studentId.currentValue;
    if (changes.studentId.previousValue !== currentStudentId) {
      this.prepareForm(currentStudentId);
    }
  }

  prepareForm = (id: string): void => {
    this.studentForm.reset();
    this.studentForm.patchValue(this.studentService.getStudentById(id));
  }

  afterEdit = () => {
    this.studentService.addStudent(this.studentForm.value);
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
