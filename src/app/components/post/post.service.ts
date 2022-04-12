import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Post } from "./post";
import { catchError } from 'rxjs/operators';
import { _ParseAST } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class PostService {



  categoryUrl: string = '/cyberLink/category/'
  postUrl: string = '/cyberLink/post/'


  constructor(private http: HttpClient) { }

  //category Api Service
  addCategory(value: any): any {
    this.getAllPosts()
    return this.http.post(this.categoryUrl + 'create', value);
  }

  getAllCategories(): any {
    return this.http.get(this.categoryUrl + 'allCategories');
  }

  deleteCategoryById(id: any) {
    return this.http.delete(this.categoryUrl + 'deleteCategory/' + id);
  }

  approvePost(list: any) {
    return this.http.post(this.postUrl + 'approve/post', list);
  }

  //Post Api Service
  savePostInformation(formData: FormData): Observable<any> {
    return this.http.post(this.postUrl + 'create', formData);
  }

  getAllPosts(): any {
    return this.http.get(this.postUrl + 'allPosts');
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(this.postUrl + 'Post/' + id)
  }


  deletePostById(id: any) {
    return this.http.delete(this.postUrl + 'deletePost/' + id);
  }

  getDetail(id: number): Observable<Post> {

    return this.http.get<Post>(this.postUrl + 'Post/' + id).pipe(
      catchError(_ParseAST => {
        console.log("Get Detail Failed");
        return of(new Post());
      })
    );
  }

}