import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../Services/movies.service';
import { LanguageService } from '../Services/language.service';


@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css']
})
export class SeriesDetailsComponent implements OnInit {


  singleShow: any = {}
  constructor(private serv: MoviesService, private langServ: LanguageService, private router: ActivatedRoute) {
    this.langServ.getLanguage().subscribe({
      next: (lang) => {
        this.currentLanguage = lang;
        this.update()
      }
    })
  }
  id: number = 0;
  currentLanguage: string = this.langServ.getLanguageString();

  update(): void {
    this.serv.getShowById(this.id, this.currentLanguage).subscribe({
      next: (show) => {
        this.singleShow = show
      }
    })
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'))
    this.update();
  }
}
