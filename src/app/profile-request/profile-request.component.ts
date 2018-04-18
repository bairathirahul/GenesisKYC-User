import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-profile-request',
  templateUrl: './profile-request.component.html',
  styleUrls: ['./profile-request.component.css']
})
export class ProfileRequestComponent implements OnInit {
  accesses: {};
  personas: Array<string>;

  constructor(private customerService: CustomerService) {
    this.accesses = customerService.accesses;
    this.personas = Object.keys(this.accesses);
  }

  onApproveClick(persona) {
    const component = this;
    this.customerService.approveRequest(persona)
      .subscribe(function (response: any) {
        if (response.returnCode === 'Success') {
          component.accesses[persona] = true;
        }
      });
  }

  ngOnInit() {
  }

}
