import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CreateDialogComponent } from './create-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorMessagesPipe } from 'src/app/shared/pipes/control-error-messages.pipe';


@NgModule({
  declarations: [
    CreateDialogComponent,
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreateDialogComponent
  ]
})
export class CreateDialogModule { }
