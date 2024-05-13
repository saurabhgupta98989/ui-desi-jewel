import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DJIcon } from '../../shared/enum/icon.enum';
import { HeaderService } from './services/header.service';
import { forkJoin, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
  public DJIcon = DJIcon;

  isSticky: boolean = false;
  categories: any[] = [];
  constructor(private headerService: HeaderService, private router: Router) {
  }

  public ngOnInit(): void {
    const categories$ = this.headerService.fetchAllCategories();
    forkJoin([categories$]).subscribe(([categories]) => {
      this.categories = categories;
      console.log(this.categories)
    })
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 150;
  }

  public navigateToLogin(): void {
    this.router.navigateByUrl("login");
  }
}
