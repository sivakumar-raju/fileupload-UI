import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

import { AuthService } from '../auth.service';
import { FileUploadService } from '../file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

interface Files {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  _id?: string;
}


export interface File {
  _id: string ;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl?: string;
  file?: any; // Use a more specific type if possible, such as File or Blob
}

export interface Document {
  id: string ;
  label: string;
  mandatory: boolean | number;
  files: File[];
  approved: boolean;
  progress: number;
  __v?: number;
}




@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;
  pdfSrc: string | ArrayBuffer | null = null;
  isChecked = false;
  accepted: boolean = false;
  uploadProgress: number = 0;
  isApproved: boolean = false;
  percentage: number = 0;
  emai_link = 'raj@whitedeerinnovation.com'
  showofferletter = false

  // Other methods as needed

  onCheckboxChange() {
    // You can handle any additional logic here if needed
  }

  onSubmit() {
    if (this.isChecked) {
      sessionStorage.setItem('accept', 'true');
     this.showofferletter = true;
      sessionStorage.setItem('offerletter', 'yes')
      console.log('Offer letter accepted.');
      // You can add your submit logic here
    }
  }


// Assuming `percentage` is a number property in your component class
// Assuming `percentage` is a number property in your component class
getBorderStyle(): any {
  if (this.percentage > 5 && this.percentage < 25) {
    return {
      'border-top': '4px solid green',
      'border-left': '4px solid white',
      'border-bottom': '4px solid white',
      'border-right': '4px solid white',
    };
  } else if (this.percentage >= 25 && this.percentage < 50) {
    return {
      'border-top': '4px solid green',
      'border-left': '4px solid green',
      'border-bottom': '4px solid white',
      'border-right': '4px solid white',
    };
  } else if (this.percentage >= 50 && this.percentage < 75) {
    return {
      'border-top': '4px solid green',
      'border-left': '4px solid green',
      'border-bottom': '4px solid green',
      'border-right': '4px solid white',
    };
  } else if (this.percentage >= 75) {
    return {
      'border-top': '4px solid green',
      'border-bottom': '4px solid green',
      'border-left': '4px solid green',
      'border-right': '4px solid green'
    };
  } else {
    return {}; // Default border style if percentage is below 5
  }
}



  documents: Document[] = [
    { id: '' , mandatory: true, label: 'Previous Company Offer Letter', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Payslips (3 months)', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Hike/Increment Letter', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Experience/Relieving Letter', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Previous Company Offer Letter 1', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Payslips 1 (3 months)', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Hike/Increment Letter 1', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Experience/Relieving Letter 1', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Bank Statement (3-6 months)', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: false, label: 'PF History (Optional)', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Form 16', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'SSC Mark Sheet', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Secondary Mark Sheet', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Undergraduate', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: false, label: 'Postgraduate (Optional)', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Aadhar Card', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'PAN Card', files: [], approved: false, progress: 0 },
    { id: '' , mandatory: true, label: 'Passport Size Photo', files: [], approved: false, progress: 0 },
  ];

  constructor(private authService: AuthService , private snackBar: MatSnackBar , private fileUploadService: FileUploadService , private titleService: Title , private toastr: ToastrService) { 

  }

  ngOnInit(): void {
    const acceptStatus = sessionStorage.getItem('accept');
    this.showofferletter = acceptStatus === 'true'
    this.loadDocuments();
    this.titleService.setTitle('White Deer Innovation - Product Sourcing Services | Parisspany-Trony');
  }

  

 


logout(): void {
  this.authService.logout();
}

  



  openFileInput(index: number): void {
    // Check if fileInputs is initialized and has elements
    if (this.fileInputs && this.fileInputs.length > index) {
      this.fileInputs.toArray()[index].nativeElement.click();
    }
  }

  handleFileChange(event: Event, index: number) {
    const fileList = (event.target as HTMLInputElement).files!;
    for (let i = 0; i < fileList.length; i++) {
      this.documents[index].files.push({
        fileName: fileList[i].name,
        fileSize: fileList[i].size,
        fileType: fileList[i].type,
        file: fileList[i],
        _id: ''
      });
    }

  }

  formatFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }
    return `${size.toFixed(2)} ${units[index]}`;
  }

  removeFile(index: number, fileIndex:any , doc:any) {
    this.deleteFileFromDocument(doc , index)
    this.documents[index].progress = 0;
    this.documents[index].files.splice(fileIndex.id, 1); 
    if( this.documents[index].files.length == 0){
      this.documents[index].approved = false
      this.fileUploadService.updateDocument(doc)
      .subscribe(updatedDocument => {
        this.snackBar.open('Document approved', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    }
  }

  

  deleteFileFromDocument(doc:any , index:number): void {
    this.fileUploadService.deleteFile(doc , index).subscribe(
      response => {
        // this.documents = this.documents.filter(doc => doc._id !== id);
        this.snackBar.open('Deleted Successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error => {
        console.error('Error deleting file:', error);
        // Handle error (e.g., show error message)
      }
    );
  }

  async uploadFiles(index: number) {
    const doc = this.documents[index];
    
    if (!doc) {
      console.error('Document not found at index', index);
      return;
    }
    
    let filesArray: any[] = [];
    
    if (doc.files && Array.isArray(doc.files)) {
      doc.files.forEach((fileData) => {
        filesArray.push(fileData.file);
      });
    } else {
      console.error('Files array in document is either null or not an array');
      return;
    }
    
    const formData = new FormData();
    formData.append('label', doc.label || ''); // Ensure label is defined
    formData.append('mandatory', doc.mandatory?.toString() || ''); // Ensure mandatory is defined
    doc.files.forEach(fileData => {
      formData.append('files', fileData.file);  // Append files as an array
    });
    formData.append('approved', doc.approved?.toString() || ''); // Ensure approved is defined
    formData.append('progress', '50');
    
    // Check if the document already exists in the list
    const existingDocumentIndex = this.documents.findIndex(d => d.label === doc.label);
    if (existingDocumentIndex !== -1) {
      // Replace the existing document with the updated one
      this.documents[existingDocumentIndex] = doc;
    }
  
    this.fileUploadService.createDocument(formData).subscribe(
      response => {
        this.loadDocuments();
        this.snackBar.open('Uploaded Successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error => {
        this.snackBar.open('Error in uploading document', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
  
  

loadDocuments() {
  this.fileUploadService.getDocuments().subscribe(
    data => {  

      let approvedCount = data.filter(doc => doc.approved).length;
      if(approvedCount >= 13 ){
        this.percentage = 100
      }else if(approvedCount >=9 ){
        this.percentage = 75
      }else if(approvedCount >= 7){
        this.percentage = 50
      }else if(approvedCount >= 5){
        this.percentage = 25
      }else{
        this.percentage = 0
      }
      console.log('234', this.percentage)
      data.forEach(receivedDoc => {
        // receivedDoc.progress = receivedDoc.files.length >= 1 ? receivedDoc.approved = true : receivedDoc.approved = false;
        let existingDocIndex = this.documents.findIndex(doc => doc.label === receivedDoc.label);
        if (existingDocIndex !== -1) {
            this.documents[existingDocIndex] = receivedDoc;
        }
    });
      // this.updateDocuments(data);
      this.snackBar.open('Documents loaded successfully', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
    },
    error => {
      this.snackBar.open('Error loading documents', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  );
}

convertBase64ToBlob(base64: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'application/pdf' });
}

}
