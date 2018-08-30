import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  apiUrl = 'https://sauti-app.herokuapp.com';
  reqUrl:any;
  constructor(public http: HttpClient,public storage: Storage) {
    console.log('Hello ApiProvider Provider');
  }

  getItems(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/items').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getItemsByScreen(screen_name){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/items/'+screen_name).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
