import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CookieModule, CookieService } from 'ngx-cookie';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';
//import { LeafletComponent } from '../leaflet/leaflet.component';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddAcademyComponent } from './add-academy/add-academy.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, 
    ForgotPasswordComponent, 
    UserComponent, 
    ResetPasswordComponent, 
    UserLayoutComponent, ConfirmRegisterComponent,
    //LeafletComponent,
    AddAcademyComponent
  ],
  imports: [
  //  LeafletModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    SimpleNotificationsModule.forRoot(),
    TimepickerModule.forRoot(),
    ComponentsStateButtonModule,
    CookieModule.forRoot()
  ],
  providers: [CookieService]
})
export class UserModule { }
