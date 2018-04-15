import {Injectable} from '@angular/core';
import {Customer} from './models/customer';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BasicInfo} from './models/basicInfo';
import {Address} from './models/address';
import {Contact} from './models/contact';
import {Employment} from './models/employment';
import {BankAccount} from './models/bank-account';
import {Document} from './models/document';
import {map} from 'rxjs/operators';

@Injectable()
export class CustomerService {

  customer: Customer;
  basicInfo: BasicInfo;
  addresses: Array<Address>;
  contact: Contact;
  employments: Array<Employment>;
  bankAccounts: Array<BankAccount>;
  documents: Array<Document>;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  obcParams = {
    channel: 'kycaccess',
    chaincode: 'genesiskyc',
    chaincodeVer: 'v1.1.5',
    method: 'updateCustomer',
    args: null
  };

  constructor(private http: HttpClient) {
  }

  autoLogin() {
    if (!this.customer && localStorage.getItem('customer') !== null) {
      this.customer = JSON.parse(localStorage.getItem('customer'));
    }
    if (this.customer) {
      return this.queryCustomer();
    }
    return false;
  }

  login(loginInfo) {
    const service = this;
    return this.http.post(environment.serviceURL + 'login', loginInfo, this.httpOptions)
      .pipe(map(function (response: any) {
        if (response.status === 200) {
          const customer = new Customer();
          customer.id = response.customer.id;
          customer.firstName = response.customer.firstName;
          customer.middleName = response.customer.middleName;
          customer.lastName = response.customer.lastName;
          customer.email = response.customer.email;
          customer.authToken = response.customer.authToken;
          customer.createdOn = response.customer.createdOn;
          service.setCustomer(customer);
        }
        return response;
      }));
  }

  register(registerInfo) {
    return this.http.post(environment.serviceURL + 'register', registerInfo, this.httpOptions);
  }

  queryCustomer() {
    const service = this;
    const params = {...this.obcParams};
    params.method = 'queryCustomer';
    params.args = [this.customer.id.toString()];
    return this.http.post(environment.ocbURL, params, this.httpOptions)
      .pipe(map(function (response: any) {
        if (response.returnCode === 'Success') {
          const data = JSON.parse(response.info);
          service.basicInfo = BasicInfo.convert(data.BasicInfo);
          service.addresses = Address.convert(data.Addresses);
          service.contact = Contact.convert(data.Contact);
          service.bankAccounts = BankAccount.convert(data.BankAccounts);
          service.employments = Employment.convert(data.Employments);
          service.documents = Document.convert(data.Documents);
        }
        return response;
      }));
  }

  updateCustomer(fieldName, data) {
    const serializedData = JSON.stringify(data, function (key, value) {
      if (key === 'dateOfBirth' || key === 'startDate' || key === 'endDate') {
        return new Date(value).getTime();
      }
      return value;
    });
    const params = {...this.obcParams};
    params.args = [fieldName, this.customer.id.toString(), serializedData];

    return this.http.post(environment.ocbURL, params, this.httpOptions);
  }

  logout() {
    delete this.customer;
    localStorage.removeItem('customer');
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  getCustomer() {
    return this.customer;
  }
}
