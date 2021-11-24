import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginform!:FormGroup;
  constructor(private formbuilder:FormBuilder,private service:ApiserviceService,private router:Router) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      email:[''],
      password:['']
    })
  }
  login(){
    this.service.getloginuser().subscribe(res=>{
      const usermatch= res.find((a:any)=>{
        return a.email=== this.loginform.value.email && a.password === this.loginform.value.password
      })
      if(usermatch){
        alert("userlogin succesfully");
        this.loginform.reset();
        this.router.navigate(['dashboard']);
      }
      else{
        alert("user not found !")
      }
    },err=>{
      alert("server error");
    })
  }

}
