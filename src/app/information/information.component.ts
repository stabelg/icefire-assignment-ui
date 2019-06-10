import { Component, OnInit } from '@angular/core';
import { ApiService } from '../auth-guard/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';
import { Information } from './informartion.interface';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  informationList: Information[];
  error: any;
  information: Information = {
    id: null,
    information: "",
    informationSecured: ""
  };
  username: any;

  constructor(private apiService: ApiService, 
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
    this.loadInformations();  
    this.username = localStorage.getItem('username');
  }

  loadInformations(){
    this.apiService.getInformations().subscribe(
      (result: Information[]) => {
        this.informationList = result;
        this.error = "";
      },
      (error:any) => this.error = error
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  encrypt(){
    if(this.information.information != "" || this.information.informationSecured){
      this.apiService.createInformation(this.information).subscribe(
        (result: Information) => {
          if(result.informationSecured){
            this.information = {
              id: null,
              information: "",
              informationSecured: ""
            };        
            //JUST TO ENSURE ALL DATA ARE OKAY
            this.error = "";
            this.loadInformations();
          }
        },
        (error:any) => {
          console.log(error);
          this.error = error.error.message;
        }
      );
    }else{
      this.error = "Cannot encrypt empty strings";
    }
  }

  decrypt(){
    if(this.information.informationSecured != ""){
      this.apiService.decryptInformation(this.information).subscribe(
        (result: Information) => {
          this.information = result;
          this.error = "";
        },
        (error:any) => {
          console.log(error);
          this.error = error.error.message;
        }
      );
    }else{
      this.error = "Cannot decrypt empty strings";
    }
  }

  pickUp(information: Information){
    this.information = JSON.parse(JSON.stringify(information));
    this.error = "";
  }
}
