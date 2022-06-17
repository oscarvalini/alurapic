import { SignupService } from './signup/signup.service';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [ 
        SignInComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers: [
        SignupService
    ]
})
export class HomeModule { }