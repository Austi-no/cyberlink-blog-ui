import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';

declare const uploadImage: any;


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser'));

  public Editor = ClassicEditor;
  postFormGroup: FormGroup;
  categoryList: any = [];
  createPostList: any;
  // selectedFile: File;
  public postImage: any = File;
  constructor(private formBuider: FormBuilder, private router: Router, private service: PostService, private toastr: ToastrService) { }

  ngOnInit() {
    this.postFormGroup = this.formBuider.group({
      id: [],
      description: ['', [Validators.required]],
      excerpt: ['', [Validators.required]],
      title: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      categoryId: ['', Validators.required],
      imageUrl: [''],
      approved: [''],
      createdBy: ['']

    })
    uploadImage();

    this.getAllCategories();
  }

  // Get All Categories
  getAllCategories() {
    this.service.getAllCategories().subscribe(result => {
      this.categoryList = result;
      console.log(result)
    });
  }

  onSelectedFile(e) {

    const file = e.target.files[0];
    console.log(file)
    this.postImage = file;
  }
  // save post and deplay it to the post list
  savePost(postFormGroup: FormGroup): any {
    this.postFormGroup.get('createdBy').setValue(this.loggedInUser)
    const post = postFormGroup.value;
    const formData = new FormData();
    formData.append('postDto', JSON.stringify(post));
    formData.append('image', this.postImage);

    this.service.savePostInformation(formData).subscribe(response => {
      console.log(response);
      this.postFormGroup.reset();
      this.toastr.success('Post was Added Successfully!!!')
      this.router.navigate(["home/post-list"]);
    });
  }

}
