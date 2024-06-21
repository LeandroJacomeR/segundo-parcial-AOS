import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { authGuard } from './guards/auth.guard';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'productos',
        component: ProductsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'producto/:id',
        component: ProductComponent,
        canActivate: [authGuard]
    },
    {
        path: 'crear-producto',
        component: CreateProductComponent,
        canActivate: [authGuard]
    },
    { 
        path: '**', 
        redirectTo: 'productos' 
    },
];
