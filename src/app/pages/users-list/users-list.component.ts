import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserDto[];
  constructor(private userService: UserService) {
    
  }

  ngOnInit() {
    this.userService.GetUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }
}
