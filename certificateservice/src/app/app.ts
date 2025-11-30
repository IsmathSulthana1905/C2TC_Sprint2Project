import { Component, signal, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from './certificate';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected readonly title = signal('Certificate Management');

  certificateDetails: any[] = [];

  certificateToUpdate = {
    id: null as any,
    name: '',
    type: '',
    issuedBy: '',
    issuedTo: '',
    issueDate: '',
    expiryDate: ''
  };

  constructor(private certificateService: CertificateService) {
    this.getCertificateDetails();
  }

  // Add new certificate
  register(registerForm: NgForm) {
    this.certificateService.addCertificate(registerForm.value).subscribe(
      () => {
        registerForm.reset();
        this.getCertificateDetails();
      },
      (err) => console.error(err)
    );
  }

  // Get all certificates
  getCertificateDetails() {
    this.certificateService.getCertificates().subscribe(
      (resp: any) => {
        this.certificateDetails = resp;
      },
      (err) => console.error(err)
    );
  }

  // Delete certificate
  deleteCertificate(certificate: any) {
    this.certificateService.deleteCertificate(certificate.id).subscribe(
      () => this.getCertificateDetails(),
      (err) => console.error(err)
    );
  }

  // Edit certificate
  edit(certificate: any) {
    this.certificateToUpdate = { ...certificate };
  }

  // Update certificate
  updateCertificate() {
    this.certificateService.updateCertificate(this.certificateToUpdate).subscribe(
      () => {
        this.certificateToUpdate = {
          id: null,
          name: '',
          type: '',
          issuedBy: '',
          issuedTo: '',
          issueDate: '',
          expiryDate: ''
        };
        this.getCertificateDetails();
      },
      (err) => console.error(err)
    );
  }
}
