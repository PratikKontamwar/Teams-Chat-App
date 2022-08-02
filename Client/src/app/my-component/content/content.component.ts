import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() inputContent: { sideBar1: string, sideBar2: string };
  items = [];
  showMessage: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.inputContent);
    this.getMessagesFromApi();
  }

  ngOnChanges() {
    this.getMessagesFromApi();
  }

  get inputMsg() {
    return this.userMessage.get('inputMessage');
  }

  userMessage = new FormGroup({
    inputMessage: new FormControl('')
  })



  sendMessage() {
    let message = this.inputMsg.value;
    let date = new Date();
    let userId = localStorage.getItem("id");
    let sideBar1 = this.inputContent.sideBar1;
    let sideBar2 = this.inputContent.sideBar2;
    this.userService.addMessage(sideBar1, sideBar2, message, date, userId).subscribe({
      next: (res: any) => {
        let jsonData = res;
        let success: boolean = jsonData.success;

        if (success) { //success === true is same as success
          console.log("Message Sent Successfully!");
          this.getMessagesFromApi();
        } else {
          // inavlid
          console.log("Message Not Sent Successfully!");
        }
        console.log(res)
      },
      error: (e) => { }

    })

    

  }

  getMessagesFromApi() {
    let sideBar1 = this.inputContent.sideBar1;
    let sideBar2 = this.inputContent.sideBar2;
    let userId = localStorage.getItem("id");
    let apiToCall = this.userService.getMessages(sideBar1, sideBar2, userId);
    apiToCall.subscribe({
      next: (res: any) => {
        let jsonData = res;
        let success: boolean = jsonData.success;

        if (success) { //success === true is same as success
          this.items = jsonData.items;
          this.showMessage = true;
          console.log(this.items, this.showMessage);
          console.log("Message read Successfully!");
        } else {
          // inavlid
          this.showMessage = false;
          console.log("Message not read Successfully!");
        }
        console.log(res)
      },
      error: (e) => { }

    })

  }

}
