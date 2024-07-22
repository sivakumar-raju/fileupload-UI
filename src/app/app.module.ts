import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApprovalPageComponent } from './approval-page/approval-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ApprovalPageComponent,
    LoginComponent
  ],
  imports: [
    PdfJsViewerModule,
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSnackBarModule ,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
