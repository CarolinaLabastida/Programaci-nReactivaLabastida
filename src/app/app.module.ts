import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './modules/material/material.module';
import { IndexComponent } from './pages/Student/index/index.component';
import { CreateDialogModule } from './dialogs/Student/create-dialog/create-dialog.module';
import { FullNamePipe } from './shared/pipes/full-name.pipe';
import { FontSizeDirective } from './shared/directives/font-size.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    IndexComponent,
    FullNamePipe,
    FontSizeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CreateDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
