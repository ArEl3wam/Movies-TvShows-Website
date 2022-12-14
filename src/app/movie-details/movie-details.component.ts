import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../Services/language.service';
import { MoviesService } from '../Services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  singleMovie: any = {};
  currentLanuage: string = this.langServ.getLanguageString();
  constructor(private serv: MoviesService, private langServ: LanguageService, private router: ActivatedRoute) {
    this.langServ.getLanguage().subscribe({
      next: (lang) => {
        this.currentLanuage = lang
        this.update();
      }
    })
  }
  id: number = 0;
  update(): void {
    this.serv.getMovieById(this.id, this.currentLanuage).subscribe({
      next: (movie) => {
        this.singleMovie = movie
      }
    })
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'))
    this.update();
  }

}
