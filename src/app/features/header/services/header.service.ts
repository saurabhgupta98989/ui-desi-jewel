import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';

@Injectable()
export class HeaderService {

  constructor(private httpClient: HttpClient) { }

  public fetchAllCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:8080/subcategories").pipe(mergeMap(subcategories => {
      return this.httpClient.get<any[]>("http://localhost:8080/categories").pipe(map(categories => {
        return { categories, subcategories }
      }))
    }))
      .pipe(map(({ categories, subcategories }) => {
        const categoriesMap: Map<number, any> = new Map();
        for (const item of subcategories) {
          const { id, name, category } = item;

          if (!categoriesMap.has(category.id)) {
            categoriesMap.set(category.id, {
              id: category.id,
              name: category.name,
              subcategories: []
            });
          }
          categoriesMap.get(category.id)!.subcategories.push({
            id,
            name
          });
        }
        for (const category of categories) {
          if (!categoriesMap.has(category.id)) {
            categoriesMap.set(category.id, {
              id: category.id,
              name: category.name,
              subcategories: []
            });
          }
        }
        return Array.from(categoriesMap.values());
      }));
  }
}
