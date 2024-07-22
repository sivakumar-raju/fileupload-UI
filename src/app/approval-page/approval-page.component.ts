import { Component, OnInit } from '@angular/core';

import { FileUploadService } from '../file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Document {
  id: string; // MongoDB ObjectId
  title: string;
  label: string;
  mandatory: boolean;
  progress: number;
  approved: boolean;
  files:any
}


@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.css']
})
export class ApprovalPageComponent implements OnInit {
  documents!: Document[];

  constructor(private snackBar: MatSnackBar ,private documentService: FileUploadService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(): void {
    this.documentService.getDocuments()
      .subscribe(documents => this.documents = documents);
  }

  approveDocument(document: Document): void {
   if(document.files.length > 0){
    document.approved = true;
    document.progress = 100;
   }else{
    document.approved = false;
    document.progress = 0;
   }  
    this.documentService.updateDocument(document)
      .subscribe(updatedDocument => {
        this.snackBar.open('Document approved', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
  }
}
