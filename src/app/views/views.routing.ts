import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../shared/guards/auth.guard';

const adminRoot = environment.adminRoot.substr(1); // path cannot start with a slash 

let routes: Routes = [
  //canActivate: [AuthGuard]
  { path: adminRoot, loadChildren: () => import('./app/app.module').then(m => m.AppModule), canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'error', component: ErrorComponent },
  { path : '', redirectTo : '/user/login', pathMatch: 'full' },
  { path : '**', redirectTo : '/', pathMatch :  "full" },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
