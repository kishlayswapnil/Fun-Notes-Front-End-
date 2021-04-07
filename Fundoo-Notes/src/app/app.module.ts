import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationComponent } from './components/registration/registration.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { NoteComponent } from './components/note/note.component';
import { MatChipsModule } from '@angular/material/chips';
import { CreatenotesComponent } from './components/createnotes/createnotes.component';
import { DisplaynotesComponent } from './components/displaynotes/displaynotes.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { IconsComponent } from './components/icons/icons.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { DatePipe } from '@angular/common';
import { ReminderComponent } from './components/reminder/reminder.component';
import { UpdateComponent } from './components/update/update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LabelComponent } from './components/label/label.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditLabelComponent } from './components/edit-label/edit-label.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotComponent,
    ResetComponent,
    DashboardComponent,
    NoteComponent,
    CreatenotesComponent,
    DisplaynotesComponent,
    IconsComponent,
    TrashComponent,
    ArchiveComponent,
    ReminderComponent,
    UpdateComponent,
    LabelComponent,
    EditLabelComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  entryComponents: [UpdateComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
