import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../Services/language.service';
import { MoviesService } from '../Services/movies.service';
import { SearchService } from '../Services/search.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {


  private _searchValue: string = ""
  series: any[] = []
  searchSeries: any[] = this.series
  pageSize: number = 20;
  length: number = 0;
  currentPage: number = 1;
  currentLanguage: string = this.langSer.getLanguageString();

  constructor(private serService: MoviesService, private langSer: LanguageService, private searchServ: SearchService) {
    this.langSer.getLanguage().subscribe({
      next: (lang) => {
        this.changeLanguage(lang)
      }
    })
    this.searchServ.gettingSearch().subscribe({
      next: (search) => {
        this._searchValue = search;
        this.searchSeries = this.search(search);
      }
    })
  }

  update(): void {
    this.serService.getSeriesData(this.currentPage, this.currentLanguage).subscribe({
      next: (allSeries) => {
        this.series = allSeries.results;
        this.length = allSeries.total_results
        this.searchSeries = this.series
      }
    })
    console.log(this.currentLanguage);
  }

  ngOnInit() {
    this.currentLanguage = this.langSer.getLanguageString();
    this.update();
  }

  toggleData(id: number): void {
    this.series.filter((show) => {
      if (show.id == id) {
        show.isVisible = !show.isVisible
      }
    })
  }

  search(value: string): any[] {
    return this.series.filter((show) =>
      show.name.toLowerCase().includes(value.toLowerCase()))

  }
  changePage(pageData: any) {
    this.currentPage = pageData.pageIndex + 1;
    this.update();
  }
  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.update();
  }


}
