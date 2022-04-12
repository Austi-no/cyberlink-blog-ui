import { Component, OnInit } from '@angular/core';
// import * as $ from "jquery";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser'));

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  toggle() {
    // console.log(e);
    var wrapper = document.querySelector("body");
    wrapper.classList.toggle("sb-sidenav-toggled");
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }

}
