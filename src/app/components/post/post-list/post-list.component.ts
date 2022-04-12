import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  createPostList: any = [];
  postFormGroup: FormGroup;
  subscription: Subscription;
  categoryList: any = [];
  p: number = 1;
  searchfilter:any;
  constructor(private formBuider: FormBuilder, private router: Router, private service: PostService, private toastr: ToastrService) { }

  ngOnInit() {
      //initializing p to one

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

  gotocreatepost() {
    this.router.navigate(["home/create-post"]);
  }
  //get All Created Post
  getAllCreatePosts() {
    this.service.getAllPosts().subscribe(result => {
      this.createPostList = result;
      console.log(result)
    })
  }

  approvePost(list: any) {
    list.approved = true
    this.service.approvePost(list).subscribe(res => {
      console.log(res);
      this.toastr.success('', 'Your Post Was Approved Successfully')

    },
      error => {
        this.toastr.error(error.message, 'Post Approval Failed!')
      }
    )
  }

  viewPost(id: number) {
    this.router.navigate(['view-post', id]);
  }


  //delete a post
  deletePost(id: any) {
    this.service.deletePostById(id).subscribe(response => {
      this.getAllCreatePosts();
      console.log(response)

    })
  }
  //update post
  updatePost(data: any) {
    this.postFormGroup.patchValue(data);
  }

}
