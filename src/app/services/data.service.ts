import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  combineLatest,
  delay,
  map,
  Observable
} from "rxjs";
import {
  Album,
  AlbumWithPhotos
} from "../model/album";
import { Post } from "../model/post";
import { Photo } from "../model/photo";
import { User } from "../model/user";
import { Params } from "@angular/router";

export const PAGE_SIZE = 5;
export const PAGE_SIZE_PARAM = 'pageSize';
export const PAGE_NUM_PARAM = 'pageNum';

export interface GetCollectionFilter {
  fieldName: string;
  expression: string;
  operator: 'ct' | 'eq';
}

export interface GetCollectionParams {
  // sortField?: string;
  // isAscending?: boolean;
  pageSize?: number;
  pageNumber?: number
  filters?: GetCollectionFilter[]
}

export interface Collection<T> {
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

  parseCollectionParamsToQueryParams(params: GetCollectionParams): Params {
    const result: Params = {};
    result[PAGE_SIZE_PARAM] = params.pageSize;
    result[PAGE_NUM_PARAM] = params.pageNumber;
    params?.filters?.forEach((f, index) => {
      result['filterField' + index] = f.fieldName;
      result['filterValue' + index] = f.expression;
      result['filterOperator' + index] = f.operator;
    });
    return result;
  }

  parseQueryParamsToCollectionParams(params: Params): GetCollectionParams {
    const result: GetCollectionParams = {
      pageSize: params[PAGE_SIZE_PARAM]? parseInt(params[PAGE_SIZE_PARAM]) : PAGE_SIZE,
      pageNumber: params[PAGE_NUM_PARAM] ? parseInt(params[PAGE_NUM_PARAM]) : 0,
      filters: this.parseQueryParamsFilters(params),
    };
    return result;
  }

  private parseQueryParamsFilters(params: Params): GetCollectionFilter[] {
    const result: GetCollectionFilter[] = [];
    let index = 0;
    let key = 'filterField0';
    while (params[key]) {
      result.push({
        fieldName: params[key],
        expression: params['filterValue' + index],
        operator: params['filterOperator' + index]
      });
      index += 1;
      key = 'filterField' + index;
    }
    return result;
  }

  getPosts(params?: GetCollectionParams): Observable<Collection<Post>> {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    return this.httpClient.get<Post[]>(url).pipe(
      delay(500),
      map(posts => {
        return this.filterAndSliceCollection(posts, params);
      })
    );
  }

  getPost(id: number): Observable<Post> {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + id;
    return this.httpClient.get<Post>(url).pipe(
      delay(500),
    );
  }

  getAlbums(params?: GetCollectionParams): Observable<Collection<Album>> {
    const url = 'https://jsonplaceholder.typicode.com/albums/';
    return this.httpClient.get<Album[]>(url).pipe(
      delay(500),
      map(albums => {
        return this.filterAndSliceCollection(albums, params);
      })
    );
  }

  getAlbumsWithPhotos(params?: GetCollectionParams): Observable<Collection<AlbumWithPhotos>> {
    const url = 'https://jsonplaceholder.typicode.com/albums/';
    return combineLatest([
      this.httpClient.get<Album[]>(url),
      this.getPhotos()
    ])
      .pipe(
        delay(500),
        map(([albums, photosCollection]) => {
          const albumsCollection = this.filterAndSliceCollection(albums, params);
          const albumsWithPhotosCollection = {
            count: albumsCollection.count,
            items: albumsCollection.items.map(a => {
              return <AlbumWithPhotos>{
                ...a,
                photos: photosCollection.items.filter(p => p.albumId === a.id).slice(0, 4) // todo move to params
              };
            })
          };
          return albumsWithPhotosCollection;
        })
      );
  }

  getAlbum(id: number): Observable<Album> {
    const url = 'https://jsonplaceholder.typicode.com/albums/' + id;
    return this.httpClient.get<Album>(url);
  }

  getPhotos(params?: GetCollectionParams): Observable<Collection<Photo>> {
    const url = 'https://jsonplaceholder.typicode.com/photos/';
    return this.httpClient.get<Photo[]>(url).pipe(
      delay(500),
      map(photos => {
        return this.filterAndSliceCollection(photos, params);
      })
    );
  }

  getPhoto(id: number): Observable<Photo> {
    const url = 'https://jsonplaceholder.typicode.com/photos/' + id;
    return this.httpClient.get<Photo>(url).pipe(
      delay(500)
    );
  }

  getLastPhotos(number: number) {
    const url = 'https://jsonplaceholder.typicode.com/photos/';
    return this.httpClient.get<Photo[]>(url).pipe(
      map((photos) => {
        photos.slice(photos.length - number)
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

  private filterAndSliceCollection<T>(items: T[], params: GetCollectionParams): Collection<T> {
    let result = items;
    params?.filters?.forEach((filter) => {
      if (filter.expression === '' || filter.expression === undefined) {
        return;
      }
      switch (filter.operator) {
        case "ct": {
          result = result.filter(p => p[filter.fieldName as keyof T].toString().includes(filter.expression));
          break;
        }
        case "eq": {
          result = result.filter(p => p[filter.fieldName as keyof T].toString() === filter.expression);
          break
        }
      }
    })
    const count = result.length;
    if ((params?.pageNumber || params?.pageNumber === 0) && params?.pageSize) {
      const start = params.pageSize * params.pageNumber;
      result = result.slice(start, (start + params.pageSize));
    }
    return { items: result, count };
  }


}
