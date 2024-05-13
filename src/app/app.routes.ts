import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "products",
        loadComponent: () => import("./features/products/products.component").then((m) => m.ProductsComponent
        ),
    },
    {
        path: "products/:productId",
        loadComponent: () => import("./features/product/product.component").then((m) => m.ProductComponent
        ),
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }
];
