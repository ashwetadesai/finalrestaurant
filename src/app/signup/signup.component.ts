import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupgroup!: FormGroup;
  constructor(private formbuilder: FormBuilder, private service: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.signupgroup = this.formbuilder.group({
      name: [''],
      mobile: [''],
      email: [''],
      password: ['']
    })
  }
  signupuser() {
    this.service.postuser(this.signupgroup.value).subscribe(res => {
      alert("resistration Successfully");
      this.signupgroup.reset();
      this.router.navigate(['login']);
    }, err => {
      alert("somthing went wrong");
    })
  }
}
