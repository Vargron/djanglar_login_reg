import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient }  from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs/behaviorsubject';


@Injectable()
export class UserService {
  errors:BehaviorSubject<Array<String>>=new BehaviorSubject([])
  users:BehaviorSubject<Object>= new BehaviorSubject([])
  delete_user_target:BehaviorSubject<Number>=new BehaviorSubject(-100)
  edit_user_target:BehaviorSubject<Number>=new BehaviorSubject(-100)
  edit_user_form:BehaviorSubject<Object>= new BehaviorSubject({})
  edit_errors:BehaviorSubject<Array<String>>=new BehaviorSubject([])
  logged_in_user:BehaviorSubject<any>= new BehaviorSubject(null)
  
  

  constructor(private router:Router, private http:HttpClient, ) {

  }

  testapi(){
    this.http.get('/api/user/test/').subscribe(
      (res)=>{
        // console.log(res)
      }
    )

  }
  register(r_user, cb){
    function valid_email(emailstring){
      let dot=0;
      let at=0;
      let order=0;
      for(let i=1;i<emailstring.length-1;i++){
        if(emailstring[i]=="@"){
          at++;
        }else if(emailstring[i]=="."){
          if (at==1){
            order++;
          }
          dot ++;
        }
      }
      if (dot>0 && at==1 && order>0 ){
        return true;
      }else{
        return false;
      }
    }

    let errors=[];
    let test_arr=[
      [r_user.username.length<2, "username must be at least 3 characters"],
      [r_user.password.length<8, "password must be at least 8 characters"],
      [r_user.password!=r_user.passwordc, "passwords must match"],
      [!valid_email(r_user.email), "email must be a valid email"]
    ]
    for(let i=0; i<test_arr.length;i++){
      if (test_arr[i][0]){
        errors.push(test_arr[i][1])
      }
    }
    if(errors.length>0){
      cb(errors)
    }
    else{
      this.http.post("/api/user/register", r_user ).subscribe(
        (res)=>{
          // console.log(res)
        
          cb(errors)
        }
      )
    }
    

  }
  get_all_users(cb){
    // console.log("going to http")
    this.http.get("/api/user/all").subscribe(
      (res)=>{
        // console.log(res)
        this.users.next(res["users"])
        cb(res)
      }
    )
  }
  select_delete_target(id){
    this.delete_user_target.next(id)
  }
  delete_user(id){
    if (id==this.delete_user_target.getValue()){
      // console.log("going to backend")
      this.http.post("/api/user/delete", {"id":id}).subscribe(
        (res)=>{
          // console.log(res)
          this.get_all_users(
            ()=>{

            }
          )
        }
      )
    }
  }
  select_edit_target(id){
    this.get_all_users(
      (res)=>{
        console.log(id)
        let bob={}
        let users=res["users"]
        console.log(users)
        for (let i=0; i<users.length;i++){
          console.log(users[i]._id, id)
          if (users[i]._id==id){
            bob={
              _id:users[i]._id,
              username:users[i].username,
              email:users[i].email,
              password:"",
              passwordc:"",

            }
            // bob=users[i]
          }
        }
        console.log(bob)
        
        // if (bob["_id"]){
        //   console.log(bob["_id"])
        //   bob.password=""
        //   bob.passwordc=""
        //   console.log(bob)
        // }
        
        this.edit_user_form.next(bob)
      
        this.edit_user_target.next(id)

      }
    )

  }
  execute_edit_user(){
    console.log(this.edit_user_form.getValue())
    let u_user=this.edit_user_form.getValue()
    function valid_email(emailstring){
      let dot=0;
      let at=0;
      let order=0;
      for(let i=1;i<emailstring.length-1;i++){
        if(emailstring[i]=="@"){
          at++;
        }else if(emailstring[i]=="."){
          if (at==1){
            order++;
          }
          dot ++;
        }
      }
      if (dot>0 && at==1 && order>0 ){
        return true;
      }else{
        return false;
      }
    }

    let errors=[];
    let test_arr=[
      [u_user["username"].length<2, "username must be at least 3 characters"],
      [u_user["password"].length<8 &&u_user["password"].length>0, "password must be at least 8 characters or zero characters to keep the same password"],
      [u_user["password"]!=u_user["passwordc"], "passwords must match"],
      [!valid_email(u_user["email"]), "email must be a valid email"]
    ]
    for(let i=0; i<test_arr.length;i++){
      if (test_arr[i][0]){
        errors.push(test_arr[i][1])
      }
    }
    this.edit_errors.next(errors)
    if (errors.length>0){
      
      
    }else{
      this.http.post('/api/user/edit', u_user).subscribe(
        (res)=>{
          console.log(res)
          this.get_all_users(
            (res)=>{
              

            }
          )
        }
      )
      
    }
    


  }
  login_user(user, cb){
    this.http.post("/api/user/login", user).subscribe(
      (res)=>{
        if (res["status"]=="success"){
          console.log(res["user"])
          this.logged_in_user.next(res["user"])
          this.router.navigate(["/home"])
        }
        

        cb(res)
        
      }
    )

  }
  check_logged_in_user_and_update(cb){
    this.http.get("/api/user/check_logged_in").subscribe(
      (res)=>{
        console.log(res)
        this.logged_in_user.next(res["user"])
        cb(res)

        })

  }
    




  logout_current_user(){
    this.http.get("/api/user/logout_current_user").subscribe(
      (res)=>{
        console.log(res)
        this.logged_in_user.next(null)
        this.router.navigate(["/"])
        
      }
    )
  }

}
