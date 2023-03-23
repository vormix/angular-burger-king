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
  constructor(private userService: UserService,
              private router:Router,
              private route:ActivatedRoute) {}

  ngOnInit() {
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
      }
    });
  }
}
