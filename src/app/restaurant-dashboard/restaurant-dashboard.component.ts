import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../shared/apiservice.service';
import { RestaurantData } from '../shared/restaurant.modal';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent implements OnInit {
  formValue!: FormGroup;
  alldata:any;
  showadd!:boolean;
  showupdate!:boolean;
  restaurantdatatypeobj:RestaurantData=new RestaurantData;
  constructor(private FormBuilder: FormBuilder,private service:ApiserviceService) { }

  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })
    this.getalldata();
  }
  clickAddresto()
  {
    this.formValue.reset();
    this.showadd=true;
    this.showupdate=false;
  }
  // now subscribe our data whitch is map via services.

  // assign data to data type modal and post data
  addrestodetails(){
    this.restaurantdatatypeobj.name=this.formValue.value.name;
    this.restaurantdatatypeobj.email=this.formValue.value.email;
    this.restaurantdatatypeobj.mobile=this.formValue.value.mobile;
    this.restaurantdatatypeobj.address=this.formValue.value.address;
    this.restaurantdatatypeobj.service=this.formValue.value.service;

    this.service.postrestaurantdata(this.restaurantdatatypeobj).subscribe(res=>{
      console.log(res);

      alert("submitted");
      this.formValue.reset(); //to reset form data
      this.getalldata(); //it is use to get all data after post new data
    },
    err=>{
      alert("somthing wrong");
    })
  }

  // get all restaurant data

  getalldata(){
    this.service.getrestaurantdata().subscribe(res=>{
      this.alldata=res;
    })
  }

  // delete resto data

  deletedata(data:any){
    this.service.DeleteRestaurantdata(data.id).subscribe(res=>{
      alert("data deleted successfully");
       this.getalldata();   //use to quick refresh data
    })
  }
   
  // edit data
   editrestrodata(data:any){
     this.showupdate=true;
     this.showadd=false;
     this.restaurantdatatypeobj.id=data.id;
     this.formValue.controls['name'].setValue(data.name);
     this.formValue.controls['email'].setValue(data.email);
     this.formValue.controls['mobile'].setValue(data.mobile);
     this.formValue.controls['address'].setValue(data.address);
     this.formValue.controls['service'].setValue(data.service);
   }
  
  //  update data
  udaterestrodata()
{
  this.restaurantdatatypeobj.name=this.formValue.value.name;
  this.restaurantdatatypeobj.email=this.formValue.value.email;
  this.restaurantdatatypeobj.mobile=this.formValue.value.mobile;
  this.restaurantdatatypeobj.address=this.formValue.value.address;
  this.restaurantdatatypeobj.service=this.formValue.value.service;

  this.service.updaterestaurantdata(this.restaurantdatatypeobj,this.restaurantdatatypeobj.id).subscribe(res=>{
    console.log(res);
    alert("data updated successfully");
    this.formValue.reset();
    this.getalldata(); 
  })
}}
