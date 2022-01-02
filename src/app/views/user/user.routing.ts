import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';
import { AddAcademyComponent } from './add-academy/add-academy.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'confirm-register/:token', component: ConfirmRegisterComponent },
            { path: 'login/reset/:token', component: ResetPasswordComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'add-academy', component: AddAcademyComponent }
            
        ], 
    },
    { path : '' , redirectTo : '/user/login', pathMatch : 'full' }
    // { path : '**' , redirectTo : '/error' , pathMatch : 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
