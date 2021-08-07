import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tiles: Tile[] = [
    {text: 'Message', cols: 1, rows: 1, color: '#f5f5f5'},
    {text: 'To:', cols: 5, rows: 1, color: '#f5f5f5'},
    {text: '', cols: 1, rows: 5, color: '#f5f5f5'},
    {text: 'Start new conversation', cols: 5, rows: 5, color: '#f5f5f5'},
  ];
}
