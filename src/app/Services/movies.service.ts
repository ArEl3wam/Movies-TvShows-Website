import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private https: HttpClient) { }

  getMoviesData(pageNumber = 1, language = "en-us"): Observable<any> {
    return this.https.get(`https://api.themoviedb.org/3/movie/popular?api_key=15c27499b315bb42052c1affd371cd58&language=${language}&page=${pageNumber}`);
  }
  getSeriesData(pageNumber = 1, language = "en-us"): Observable<any> {
    return this.https.get(`https://api.themoviedb.org/3/tv/popular?api_key=15c27499b315bb42052c1affd371cd58&language=${language}&page=${pageNumber}`);
  }


}
