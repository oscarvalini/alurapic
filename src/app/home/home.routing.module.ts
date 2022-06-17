import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';
import { AuthGuard } from './../core/auth/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { 
        path: '', //O nome da rota é definido em outro módulo de rotas
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: '',
                component: SignInComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'signup',
                component: SignupComponent
            },
        ]
    }  
];

@NgModule({
    imports: [ 
        //forChild indica que essas rotas serão subordinadas a outro módulo de rotas
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

