import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'rl-token-interceptor',
  templateUrl: './token-interceptor.component.html',
  styleUrls: ['./token-interceptor.component.sass']
})
export class TokenInterceptorComponent implements OnInit {

  constructor (private authService: AuthService,
               private activatedRoute: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit () {
    this.activatedRoute.params
      .subscribe(value => {
        const token = value['token'];
        this.authService.setToken(token);
        this.router.navigate(['/']);
      });
  }
}
