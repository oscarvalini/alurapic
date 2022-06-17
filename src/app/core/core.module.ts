import { FooterComponent } from './footer/footer.component';
import { RequestInterceptor } from './auth/request.interceptor';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    exports: [HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [
        {
            // O Angular injeta um interceptador em HttpClient que não faz nada por padrão.
            // É preciso declarar para o Angular que não queremos utilizar a implementação dele
            // de HttpInterceptor, mas sim a nossa implementação customizada.
            provide: HTTP_INTERCEPTORS, // Injection Token para HTTP_INTERCEPTOR
            useClass: RequestInterceptor, // Informa qual classe queremos usar para esse token
            multi: true // declara que pode haver mais de uma implementação
        }
    ]
})
export class CoreModule { }