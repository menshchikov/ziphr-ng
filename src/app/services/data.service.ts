import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Post } from "../model/post.model";
import {
  map,
  Observable
} from "rxjs";
import { Album } from "../model/album";
import { Photo } from "../model/photo";
import { User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getPosts(): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    return this.httpClient.get<Post[]>(url);
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
