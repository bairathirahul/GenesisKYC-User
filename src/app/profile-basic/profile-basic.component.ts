import {Component, OnInit, Input} from '@angular/core';
import {BasicInfo} from '../models/basicInfo';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-profile-basic',
  templateUrl: './profile-basic.component.html',
  styleUrls: ['./profile-basic.component.css']
})
export class ProfileBasicComponent implements OnInit {
  basicInfo: BasicInfo;
  message: string;
  requesting = false;

  constructor(private customerService: CustomerService) {
    this.basicInfo = customerService.basicInfo;
  }

  ngOnInit() {
  }

  getSalutations() {
    return BasicInfo.salutations;
  }

  getGenders() {
    return BasicInfo.genders;
  }

  save() {
    const component = this;
    this.requesting = true;
    this.customerService.updateCustomer('BasicInfo', this.basicInfo)
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
