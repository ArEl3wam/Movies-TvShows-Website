import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private subject = new Subject<any>();
  currentLanguage: string = "en-us";


  changeLanguage(): void {
    if (this.currentLanguage == "en-us") {
      this.currentLanguage = "ar-sa";
    }
    else {
      this.currentLanguage = "en-us"
    }
    this.subject.next(this.currentLanguage);
  }
  getLanguage(): Observable<any> {
    return this.subject.asObservable();
  }
  getLanguageString(): string {
    return this.currentLanguage;
  }

  constructor() { }
}
