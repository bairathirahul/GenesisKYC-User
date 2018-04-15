import {Component, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';
import {BasicInfo} from '../models/basicInfo';
import {Address} from '../models/address';
import {Contact} from '../models/contact';
import {Document} from '../models/document';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileBasicComponent} from '../profile-basic/profile-basic.component';
import {ProfileAddressComponent} from '../profile-address/profile-address.component';
import {BankAccount} from '../models/bank-account';
import {Employment} from '../models/employment';
import {ProfileContactComponent} from '../profile-contact/profile-contact.component';
import {ProfileEmploymentComponent} from '../profile-employment/profile-employment.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {ProfileBankAccountComponent} from '../profile-bank-account/profile-bank-account.component';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  sideNavOpen = true;

  private _mobileQueryListener: () => void;

  constructor(private router: Router, private route: ActivatedRoute, private customerService: CustomerService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogoutClick() {
    this.customerService.logout();
    this.router.navigate(['login']);
  }
}
