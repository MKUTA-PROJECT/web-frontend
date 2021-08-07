import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tiles: Tile[] = [
    {text: 'Notifications', cols: 5, rows: 1, color: '#f5f5f5'},
    {text: 'No Notification', cols: 5, rows: 5, color: '#f5f5f5'},
  ];
}
