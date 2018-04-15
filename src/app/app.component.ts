import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GenesisKYC';
  ready = false;

  constructor(private router: Router, private customerService: CustomerService) {
  }

  ngOnInit() {
    const component = this;
    const result = this.customerService.autoLogin();
    if (result === false && (this.router.url !== '/login' || this.router.url !== '/register')) {
      this.ready = true;
      this.router.navigate(['login']);
    } else if (result !== false) {
      component.router.navigate(['/']);
      result.subscribe(function () {
        component.router.navigate(['profile']);
      });
    }
  }
}
