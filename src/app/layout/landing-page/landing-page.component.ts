import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from '../../components/post/post.service';




@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser'));
  p: number = 1;
  createPostList: any = [];
  postFormGroup: FormGroup;
  subscription: Subscription;
  categoryList: any = [];
  approved=true
  searchfilter:any;
  constructor(private router: Router, private service: PostService,) { }

  ngOnInit() {
  
    this.getAllCreatePosts();
    this.getAllCategories();

  }


  // Get All Categories
  getAllCategories() {
    this.service.getAllCategories().subscribe(result => {
      this.categoryList = result;
      console.log(result)
    });
  }

  //get All Created Post
  getAllCreatePosts() {
    this.service.getAllPosts().subscribe(result => {
      this.createPostList = result;
      console.log(result)
    })
  }

  
  viewPost(id: number) {
    this.router.navigate(['view-post', id]);
  }

  loginButtonClicked() {
    this.router.navigate(['login']);
  };

}
