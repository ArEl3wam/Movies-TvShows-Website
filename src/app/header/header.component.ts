import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../Services/language.service';
import { SearchService } from '../Services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isEnglish: boolean = true;
  _searchValue: string = "";
  set searchValue(search: string) {
    this._searchValue = search;
    this.searchServ.settingSearch(this._searchValue);
  }
  get searchValue(): string {
    return this._searchValue;
  }



  toggle(): void {
    this.isEnglish = !this.isEnglish;
    this.lang.changeLanguage();
  }
  constructor(private lang: LanguageService, private searchServ: SearchService) { }

  ngOnInit(): void {
  }

}
