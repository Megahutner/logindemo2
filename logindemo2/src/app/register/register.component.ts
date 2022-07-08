import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  registerForm : FormGroup = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required,Validators.minLength(4)]
    });
    
    
  }
  get f(){ return this.registerForm.controls;}
  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
    .pipe(first()).subscribe({
      next:() => {
        this.router.navigate(['../login']);
      },
      error: error =>{
        
        this.loading = false;
      }
    });
  }

}
