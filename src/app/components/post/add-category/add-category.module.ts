import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component';
import { PostService } from './../post.service';


@NgModule({
  declarations: [AddCategoryComponent],
  imports: [
  CommonModule,
    AddCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AddCategoryModule { }
