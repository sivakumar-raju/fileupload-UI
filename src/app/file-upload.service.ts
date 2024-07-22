import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Document {
  id: string;
  title: string;
  label: string;
  mandatory: boolean;
  progress: number;
  approved: boolean;
  // Other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'https://whitedeerinnovations.in/documents';

  constructor(private http: HttpClient) { }

  createDocument(document: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, document);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateDocument(document: Document): Observable<Document> {
    const url = `${this.apiUrl}/${document.id}`; // Assuming _id is used for MongoDB document ID
    return this.http.put<Document>(url, document);
  }

  deleteFile(doc: any , index:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-file/${doc.id}/${doc.files[0].id}` , { observe: 'response', responseType: 'text' });
  }
}
