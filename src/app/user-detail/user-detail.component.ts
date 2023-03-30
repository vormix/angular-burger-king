import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserDto } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent  implements OnInit {
  
  user: UserDto;
  userId!:number;
  new!:boolean;

  constructor(private userService: UserService,
              private router:Router,
              private route:ActivatedRoute) {}

  ngOnInit() {
    this.user = new UserDto;

    this.route.params.subscribe((params:Params)=>{
      if (params.id){
        this.userService.GetUser(params.id).subscribe(user => {
          if (!user) {
            this.router.navigateByUrl('/users');
            return;            
          }
          this.user = user;
          console.log('user', user);
        });
        this.new=false;
        this.userId=params.id;
      } else{
        this.new=true;
      }
    });
  }

  onSubmit(form) {
    console.log('form', form.value);
    if(this.new){
      //allora dobbiamo salvare la nota
       //SALVO LA NOTA
      this.userService.add(form.value).subscribe(result => {
        this.router.navigateByUrl('/users');
      });
    
    }else {
      this.userService.update(this.userId,form.value).subscribe(result => {
        this.router.navigateByUrl('/users');
      });
    }
  }

  cancel(){
    this.router.navigateByUrl('/users');
  }


  deleteUser(){
    this.userService.DeleteUser(this.userId).subscribe(result => {
      this.router.navigateByUrl('/users');
    });
  }

       
}
