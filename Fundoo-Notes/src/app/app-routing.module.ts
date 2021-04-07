import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatenotesComponent } from './components/createnotes/createnotes.component';
import { DisplaynotesComponent } from './components/displaynotes/displaynotes.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { UpdateComponent } from './components/update/update.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotpassword', component: ForgotComponent },
  { path: 'reset/:token', component: ResetComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [{ path: "create", component: CreatenotesComponent },
    { path: "", component: DisplaynotesComponent },
    { path: "displaynote", component: DisplaynotesComponent },
    { path: "trash", component: TrashComponent },
    { path: "archive", component: ArchiveComponent },
    { path: "reminder", component: ReminderComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
