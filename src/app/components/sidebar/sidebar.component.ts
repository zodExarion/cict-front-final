import { Component, OnInit  } from '@angular/core';
import * as $ from 'jquery';


// declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $('#sidebarToggle').on('click', (e) => {
      e.preventDefault();
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
    });
  }
}
