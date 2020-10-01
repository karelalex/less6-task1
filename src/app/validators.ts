import moment from 'moment';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export const dateValidator = (dateControl: AbstractControl): ValidationErrors => {
    const inputDate = moment(dateControl.value).startOf('day');
    const today = moment().startOf('day');
    if (inputDate.isBefore(today)) { return {wrongDate: 'Ошибочная дата'}; }
    return null;
  };

