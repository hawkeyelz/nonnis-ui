import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},
  {path: 'inventory', loadChildren: ()=>import('./components/inventory/inventory.module').then(m => m.InventoryModule)},
  {path: 'products', loadChildren: ()=>import('./components/products/products.module').then(m => m.ProductsModule)},
  {path: '**', pathMatch: 'full', component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
