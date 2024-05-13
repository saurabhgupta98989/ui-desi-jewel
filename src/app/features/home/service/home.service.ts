import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Images } from '../models/images';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  public fetchSliderImages(): Observable<Images[]> {
    return of([
      {
        url: "https://media.istockphoto.com/id/1488371329/photo/indian-traditional-gold-jewellery-displayed-in-a-shop-for-sale-in-pune-maharashtra-indian-art.jpg?s=1024x1024&w=is&k=20&c=5CsDg2p92d_0jAcHQWW8s72rrBOR_TLmcXb1I64L2tI=",
        heading: "First slide label",
        para: "Some representative placeholder content for the first slide."
      },
      {
        url: "https://media.istockphoto.com/id/652925014/photo/horizontal-portrait-of-a-beautiful-girl-with-shiny-jewelry.jpg?s=1024x1024&w=is&k=20&c=I4CHzJq_b7YKIl1bUeGcUAntWJW3YiVJt8YQBBbkZcA=",
        heading: "Second slide label",
        para: "Some representative placeholder content for the first slide."
      },
      {
        url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        heading: "Third slide label",
        para: "Some representative placeholder content for the first slide."
      },
      {
        url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        heading: "Test slide label",
        para: "Some representative placeholder content for the first slide."
      }
    ])
  }

  public fetchAllCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:8080/categories");
  }
}
