import {Component, OnInit} from '@angular/core';
import {Document} from '../models/document';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-profile-documents',
  templateUrl: './profile-documents.component.html',
  styleUrls: ['./profile-documents.component.scss']
})

export class ProfileDocumentsComponent implements OnInit {
  documents: Array<Document>;
  message: string;
  requesting = false;

  constructor(private customerService: CustomerService) {
    this.documents = customerService.documents;
  }

  ngOnInit() {

  }

  onRemoveClick($event, address: Document) {
    $event.stopPropagation();
    address.deleted = true;
  }

  onAddNewClick() {
    const address = new Document();
    address.open = true;
    this.documents.push(address);
  }

  getDocumentTypes() {
    return Document.documentTypes;
  }

  onFileSelected($event) {

  }

  save() {
    const component = this;
    this.requesting = true;
    this.customerService.updateCustomer('Documents', this.documents)
      .subscribe(function (response: any) {
        component.requesting = false;
        if (response.returnCode === 'Success') {
          component.message = 'Information saved successfully';
        } else {
          component.message = response.info;
        }
      });
  }

}
