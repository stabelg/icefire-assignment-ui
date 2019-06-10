import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Information } from '../information/informartion.interface';

@Injectable()
export class ApiService {

  //private apiRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getInformations() {
    return this.http.get(environment.apiUrl.concat('information/list/'));
  }

  createInformation(information: Information) {
    return this.http.post(
      environment.apiUrl.concat('information/create/'),
      information
    );
  }

  decryptInformation(information: Information) {
    return this.http.post(
      environment.apiUrl.concat('information/decrypt/'),
      information
    );
  }
}