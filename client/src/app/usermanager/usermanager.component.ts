import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  users;
  delete_user_target;
  edit_user_target;
  edit_user_form;
  edit_errors;
  cur_user;

  constructor(private uservice:UserService) { }

  ngOnInit() {
    let counter=0
    this.uservice.users.subscribe(
      (res)=>{
        this.users=res;
        if (counter<1){
          this.uservice.get_all_users(()=>{
            counter++
          })
        }
      }
    )
    this.uservice.delete_user_target.subscribe(
      (res)=>{
        this.delete_user_target=res;
      }
    )
    this.uservice.edit_user_target.subscribe(
      (res)=>{
        this.edit_user_target=res
      }
    )
    this.uservice.edit_user_form.subscribe(
      (res)=>{
        this.edit_user_form=res;
      }
    
    )
    this.uservice.edit_errors.subscribe(
      (res)=>{
        this.edit_errors=res
      }
    )

    
  }
  get_all_users(){
    this.uservice.get_all_users(
      (res)=>{
        console.log(res)

      }
    )
  }
  select_delete_target(id){
    this.uservice.select_delete_target(id)
  }
  delete_target_user(id){
    console.log(id)
    if (id==this.uservice.delete_user_target.getValue()){
      this.uservice.delete_user(id)
    }
  }
  select_edit_target(id){
    console.log(id)
    this.uservice.select_edit_target(id)

  }
  execute_edit_user(){
    this.uservice.execute_edit_user()
  }
}
