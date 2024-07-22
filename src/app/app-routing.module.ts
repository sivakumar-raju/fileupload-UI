import { RouterModule, Routes } from '@angular/router';

import { ApprovalPageComponent } from './approval-page/approval-page.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'approval', component: ApprovalPageComponent },
  { path: 'background-verification', component: FileUploadComponent , canActivate: [AuthGuard]},
 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
