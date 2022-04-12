import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../components/post/post.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../post/post';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  createPostList: any = [];
  // postFormGroup: FormGroup;
  // subscription: Subscription;
  categoryList: any = [];
  post: Post;
  permalink: number
  id: number;
  // data: any;

  constructor(private router: Router, private service: PostService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {

    this.post = new Post();

    // this.getAllCreatePosts();
    this.getAllCategories();
    // this.getPostById(id);
    this.permalink = this.route.snapshot.params['id'];
    this.service.getPostById(this.permalink).subscribe(data => {
      console.log(data.data);
      this.post = data.data;
    },
      error => console.log(error)
    )



    // this.route.params.subscribe(params => {
    //   this.permalink = params['id']
    // });
    // this.service.getPostById(this.permalink).subscribe((res: Post) => {
    //   this.post = res;
    //   this.toastr.success('it works')
    // },
    //   error => {
    //     this.toastr.error('Error Reading Post');
    //   });


    // this.getPostById();




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

  loginButtonClicked() {
    this.router.navigate(['login']);
  };

}
