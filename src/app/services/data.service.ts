import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  Post,
  PostSearchFieldsEnum
} from "../model/post.model";
import {
  map,
  Observable
} from "rxjs";
import { Album } from "../model/album";
import { Photo } from "../model/photo";
import { User } from "../model/user";

export interface GetPostsParams {
  field?: PostSearchFieldsEnum;
  expression?: string;
  // sortField?: string;
  // isAscending?: boolean;
  pageSize?: number;
  pageNumber?: number
}

export interface Collection<T>{
  items: T[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getPosts(params?: GetPostsParams): Observable<Collection<Post>> {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    return this.httpClient.get<Post[]>(url).pipe(
      map(posts => {
        let result = posts;
        if (params?.expression && params?.field) {
          result = posts.filter(p => p[params.field].toString().includes(params.expression))
        }
        let count = result.length;
        if ((params?.pageNumber || params?.pageNumber === 0) && params?.pageSize) {
          let start = params.pageSize * params.pageNumber;
          result = result.slice(start, (start + params.pageSize));
        }
        return { items: result, count };
      })
    );
  }

  getPost(id: number): Observable<Post> {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + id;
    return this.httpClient.get<Post>(url);
  }

  getLastPosts(number: number) {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    return this.httpClient.get<Post[]>(url).pipe(
      map((posts) => {
        posts.slice(posts.length-number)
      })
    );
  }

  getAlbums(): Observable<Album[]> {
    const url = 'https://jsonplaceholder.typicode.com/albums/';
    return this.httpClient.get<Album[]>(url);
  }

  getAlbum(id: number): Observable<Album> {
    const url = 'https://jsonplaceholder.typicode.com/albums/' + id;
    return this.httpClient.get<Album>(url);
  }

  getPhotos(): Observable<Photo[]> {
    const url = 'https://jsonplaceholder.typicode.com/photos/';
    return this.httpClient.get<Photo[]>(url);
  }

  getPhoto(id: number): Observable<Photo> {
    const url = 'https://jsonplaceholder.typicode.com/photos/' + id;
    return this.httpClient.get<Photo>(url);
  }

  getLastPhotos(number: number) {
    const url = 'https://jsonplaceholder.typicode.com/photos/';
    return this.httpClient.get<Photo[]>(url).pipe(
      map((photos) => {
        photos.slice(photos.length-number)
      })
    );
  }

  getUsers(): Observable<User[]> {
    const url = 'https://jsonplaceholder.typicode.com/users/';
    return this.httpClient.get<User[]>(url);
  }

  getUser(id: number): Observable<User> {
    const url = 'https://jsonplaceholder.typicode.com/users/' + id;
    return this.httpClient.get<User>(url);
  }


}
