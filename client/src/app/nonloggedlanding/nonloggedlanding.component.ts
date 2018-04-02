import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nonloggedlanding',
  templateUrl: './nonloggedlanding.component.html',
  styleUrls: ['./nonloggedlanding.component.css']
})
export class NonloggedlandingComponent implements OnInit {

  constructor(private uservice:UserService) { }

  ngOnInit() {
  }
  testapi(){
    console.log("in test api")
    this.uservice.testapi()

  }

}
