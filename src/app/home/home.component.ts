import { Component, OnInit } from '@angular/core';

// Home === Dashboard
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Zevere';
  constructor() { }

  ngOnInit() {
  }

}