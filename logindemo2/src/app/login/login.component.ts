import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthenticationService } from '../_services';

@Component({ selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
    
    loginForm : FormGroup = new FormGroup({
        username : new FormControl(''),
        password : new FormControl('')
      });
    loading = false;
    submitted = false;
    returnUrl!: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
       
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log("1");
        this.authenticationService.login(this.f['username'].value,this.f['password'].value);
            
            // .subscribe(
            //     data => {
            //         this.router.navigate([this.returnUrl]);
            //     },
            //     error => {
            //         this.error = error;
            //         this.loading = false;
            //     });
    }
}
