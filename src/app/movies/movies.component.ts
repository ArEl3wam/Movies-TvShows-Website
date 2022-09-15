import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../Services/language.service';

import { MoviesService } from '../Services/movies.service';
import { SearchService } from '../Services/search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {


  private _searchValue: string = ""
  movies: any[] = []
  searchMvoies: any[] = this.movies
  pageSize: number = 20;
  length: number = 0;
  currentPage: number = 1;
  currentLanguage: string = this.langServ.getLanguageString();


  constructor(private movService: MoviesService, private langServ: LanguageService, private searchServ: SearchService) {
    this.langServ.getLanguage().subscribe({
      next: (lang) => {
        this.changeLanguage(lang);
      }
    })
    this.searchServ.gettingSearch().subscribe({
      next: (search) => {
        this._searchValue = search;
        this.searchMvoies = this.search(search)
      }
    })

  }

  update(): void {
    this.movService.getMoviesData(this.currentPage, this.currentLanguage).subscribe({
      next: (allMovies) => {
        this.movies = allMovies.results;
        this.length = allMovies.total_results
        this.searchMvoies = this.movies
      }
    })
    console.log(this.currentLanguage);
  };

  ngOnInit() {
    this.currentLanguage = this.langServ.getLanguageString();
    this.update();

  }
  toggleData(id: number): void {
    this.movies.filter((movie) => {
      if (movie.id == id) {
        movie.isVisible = !movie.isVisible
      }
    })
  }
  search(value: string): any[] {
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase()))

  }
  changePage(pageData: any) {
    this.currentPage = pageData.pageIndex + 1;
    this.update();
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.update();
  }



}
