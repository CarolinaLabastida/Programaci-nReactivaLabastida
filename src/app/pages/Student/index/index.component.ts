import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CreateDialogComponent } from 'src/app/dialogs/Student/create-dialog/create-dialog.component';
import { StudentService } from '../../../core/services/student.service';
import { student } from 'src/app/core/models';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  students: student[] | null = null;
  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'email',
    'phone',
    'birthDate',
    'gender',
    'course',
  ];
  dataSource : any = null;
  length: number = 0;

  @ViewChild(MatTable) table!: MatTable<student>;

  suscriptionRef: Subscription | null;
  totalStudents$: Observable<string>;

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService
  ) {
    this.totalStudents$ = this.studentService.getTotalStudents();
    
    this.suscriptionRef = this.studentService.showMessage().subscribe((name) => {
      Swal.fire( name, '', 'success');
    })
  }

  ngOnInit(): void {
    let promise = this.studentService.getAllStudents();
    promise
      .then((studentsList) => {
        this.students = studentsList;
        this.dataSource = [...this.students];
        this.length = this.dataSource.length;
      })
      .catch((error) => {
        alert(error.error);
      });
  }

  ngOnDestroy(): void {
    this.suscriptionRef?.unsubscribe();
  }

  removeData(i: number, name: string) {
    this.dataSource.splice(i, 1);
    this.table.renderRows();
    this.studentService.createMessage(`${name} ha sido eliminado(a)`);
  }

  openCreateStudentDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: '',
        course: '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.length = this.length + 1;
        this.dataSource.push({ ...result, id: this.length });
        this.table.renderRows();
        this.studentService.createMessage(`${result.name} ha sido sido creado(a)`);
        this.studentService.countStudent();
      }
    });
  }

  editData(i: number): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {
        name: this.dataSource[i].name,
        lastName: this.dataSource[i].lastName,
        email: this.dataSource[i].email,
        phone: this.dataSource[i].phone,
        birthDate: this.dataSource[i].birthDate,
        gender: this.dataSource[i].gender,
        course: this.dataSource[i].course,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource[i] = { ...result, id: this.dataSource[i].id };
        this.table.renderRows();
        this.studentService.createMessage(`${result.name} ha sido modificado(a)`);
      }
    });
  }
}

