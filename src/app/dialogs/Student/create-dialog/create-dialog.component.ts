import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { student } from 'src/app/core/models';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', 
  },
  display: {
    dateInput: 'DD/MM/YYYY', 
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class CreateDialogComponent {

  nameControl = new FormControl(this.data.name, [
    Validators.required,
    Validators.minLength(3),
  ]);

  lastNameControl = new FormControl(this.data.lastName, [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailControl = new FormControl(this.data.email, [Validators.required, Validators.email]);

  phoneControl = new FormControl(this.data.phone, [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'),
  ]);

  birthDateControl = new FormControl(new Date(this.data.birthDate), [
    Validators.required,
    this.dateValidator(),
  ]);

  courseControl = new FormControl(this.data.course, [Validators.required]);

  genderControl = new FormControl(this.data.gender);

  studentForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    phone: this.phoneControl,
      birthDate: this.birthDateControl,
      course: this.courseControl,
      gender: this.genderControl
  });

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: student
  ){}

  save(): void{
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value)
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        new Date(control.value)?.getFullYear() >
          new Date().getFullYear() - 18 ||
        new Date(control.value)?.getFullYear() < new Date().getFullYear() - 100
      ) {
        return {
          dateInvalid: true,
        };
      }
      return null;
    };
  }
}
