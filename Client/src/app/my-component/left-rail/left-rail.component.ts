import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-left-rail',
  templateUrl: './left-rail.component.html',
  styleUrls: ['./left-rail.component.css'],
})
export class LeftRailComponent implements OnInit {
  @Input() myinputMsg: string;
  @Output() onChangeInMenu = new EventEmitter<any>();
  items = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.myinputMsg);
    this.getListFromApi();
  }

  ngOnChanges() {
    console.log('Updated Item', this.myinputMsg);

    // check for selected item & call get API to ge the list

    if (this.myinputMsg) {
      this.getListFromApi();
    }

  }


  onAdd() {
    let name = window.prompt('Enter message');
    let date = new Date();
    // console.log(date);
    let userId = localStorage.getItem("id");
    // console.log(userId);

    if (this.myinputMsg == "Activity") {

      console.log(name, date, userId)
      this.userService.addActivity(name, date, userId).subscribe({
        next: (res: any) => {
          let jsonData = res;
          let success: boolean = jsonData.success;

          if (success) { //success === true is same as success
            console.log("Activity Added Successfully!");
            this.getListFromApi();
          } else {
            // inavlid
            console.log("Activity Not Added Successfully!");
          }
          console.log(res)
        },
        error: (e) => { }

      })

    }
    else if (this.myinputMsg == "Chat") {

      console.log(name, date, userId)
      this.userService.addChat(name, date, userId).subscribe({
        next: (res: any) => {
          let jsonData = res;
          let success: boolean = jsonData.success;

          if (success) { //success === true is same as success
            console.log("Chat Added Successfully!");
            this.getListFromApi();
          } else {
            // inavlid
            console.log("Chat Not Added Successfully!");
          }
          console.log(res)
        },
        error: (e) => { }

      })

    }
    else if (this.myinputMsg == "Teams") {

      console.log(name, date, userId)
      this.userService.addTeam(name, date, userId).subscribe({
        next: (res: any) => {
          let jsonData = res;
          let success: boolean = jsonData.success;

          if (success) { //success === true is same as success
            console.log("Teams Added Successfully!");
            this.getListFromApi();
          } else {
            // inavlid
            console.log("Teams Not Added Successfully!");
          }
          console.log(res)
        },
        error: (e) => { }

      })

    }

  }

  getListFromApi() {

    let apiToCall = null;
    if (this.myinputMsg === 'Activity') {
      apiToCall = this.userService.getActivities();
    } else if (this.myinputMsg === 'Chat') {
      apiToCall = this.userService.getChats();;
    } else if (this.myinputMsg === 'Teams') {
      apiToCall = this.userService.getTeams();;
    }

    if (apiToCall) {

      apiToCall.subscribe({
        next: (res: any) => {
          let jsonData = res;
          let success: boolean = jsonData.success;

          if (success) { //success === true is same as success
            this.items = jsonData.items;
            console.log(this.items);
            console.log(" read Successfully!");
          } else {
            // inavlid
            console.log(" not read Successfully!");
          }
          console.log(res)
        },
        error: (e) => { }

      })
    }

  }


  switchToMenu(text) {
    this.onChangeInMenu.emit({
      sideBar1: this.myinputMsg,
      sideBar2: text
    });
  }


}
