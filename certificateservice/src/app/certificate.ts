import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/certificates';

  // Create certificate
  addCertificate(certificateData: any): Observable<any> {
    return this.http.post(this.API, certificateData);
  }

  // Get all certificates
  getCertificates(): Observable<any> {
    return this.http.get(this.API);
  }

  // Get certificate by ID
  getCertificateById(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  // Update certificate
  updateCertificate(certificateData: any): Observable<any> {
    return this.http.put(`${this.API}/${certificateData.id}`, certificateData);
  }

  // Delete certificate
  deleteCertificate(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
