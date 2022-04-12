import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryFormGroup: FormGroup;
  categoryList: any = [];
  subscription: Subscription;

  constructor(private formBuider: FormBuilder, private router: Router, private service: PostService) { }

  ngOnInit() {
    this.getAllCategories();
    this.categoryFormGroup = this.formBuider.group({
      id: [''],
      categoryName: ['', [Validators.required]],
      dateCreated: ['', [Validators.required]]
    })

  }

  //save a category
  saveCategory(): any {
    this.service.addCategory(this.categoryFormGroup.value).subscribe(response => {
      console.log(response)
      this.categoryFormGroup.reset();
      this.getAllCategories()
    })
  }


  // Get All Categories
  getAllCategories() {
    this.service.getAllCategories().subscribe(result => {
      this.categoryList = result;
   
      console.log(result)
    });
  }

//delete a category
deleteCategory(id:any){
  this.service.deleteCategoryById(id).subscribe(response=>{
    this.getAllCategories();
    console.log(response)
    
  })
}

//update category
updateCategory(data: any){
  this.categoryFormGroup.patchValue(data);
}
}
