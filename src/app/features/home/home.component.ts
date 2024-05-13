import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Images } from './models/images';
import { HomeService } from './service/home.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public sliderImages: Images[] = [];
  public categories: any[] = [];
  constructor(private homeService: HomeService) {

  }

  public ngOnInit(): void {
    const sliderImages$ = this.homeService.fetchSliderImages();
    const categories$ = this.homeService.fetchAllCategories();
    forkJoin([sliderImages$, categories$]).subscribe(([sliderImages, categories]) => {
      this.sliderImages = sliderImages;
      this.categories = categories;
    })
  }
}
