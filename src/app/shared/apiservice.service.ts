import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  Url = "http://localhost:3000/posts";
  constructor(private http: HttpClient) { }
  // we use get,post put,delete request here

  // create post api for user data
  postuser(data: any) {
    return this.http.post<any>("http://localhost:3000/signup", data).pipe(map((res: any) => {
      return res;
    }))
  }

  // create get api for login form
  getloginuser(){
    return this.http.get<any>("http://localhost:3000/signup").pipe(map((res:any)=>{
      return res;
    }))
  }

  // create restaurant using  post request to post data in database
  postrestaurantdata(data: any) {
    return this.http.post<any>(this.Url, data).pipe(map((res: any) => {
      return res;
    }))
  }

  // get restaurent data using get method
  getrestaurantdata() {
    return this.http.get<any>(this.Url).pipe(map((res: any) => {
      return res;
    }))
  }

  // update restaurant using put method

  updaterestaurantdata(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  // Delete restaurant data using delete method

  DeleteRestaurantdata(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res: any) => {
      return res;
    }))
  }

}
