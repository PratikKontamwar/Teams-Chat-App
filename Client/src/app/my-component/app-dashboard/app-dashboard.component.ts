import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css'],
})
export class AppDashboardComponent implements OnInit {
  activeSidebarItem = 'Activity';
  activeContentHeader = {sideBar1: 'Activity', sideBar2: 'Meet up' };

  constructor() {}

  ngOnInit(): void {}

  onChangeSidebarOne(event) {
    console.log(event);
    this.activeSidebarItem = event;
  }

  onChangesContentHeader(event) {
    console.log(event);
    this.activeContentHeader = event;
  }
}
