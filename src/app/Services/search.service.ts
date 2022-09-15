import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  search: string = "";
  private subject = new Subject<any>();
  settingSearch(search: string): void {
    this.search = search;
    this.subject.next(this.search);
  }
  gettingSearch(): Observable<any> {
    return this.subject.asObservable();
  }

}
