import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        // Lazy Loading. Todo o módulo Home é carregado preguiçosamente dessa forma.
        // Para alcançar esse resultado é preciso fazer a separação correta dos módulos:
        // - Eliminar qualquer import de HomeModule de app.module e app.routing.module
        // - Configurar as rotas de home em um módulo separado (home.routing.module nesse caso) 
        //   configurando como 'forChild()' ao invés de 'forRoot()' (forRoot apenas no módulo principal da aplicação) 
        // - importar HomeRoutingModule em HomeModule
        // - Configurar o carregamento do arquivo HomeModule como abaixo.
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },    
    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent 
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }  
];

@NgModule({
    imports: [ 
        // RouterModule.forRoot(routes) 

        //Essa forma trás maior compatibilidade com os navegadores do mercado, mas deixa uma '#' na rota.
        RouterModule.forRoot(routes, { useHash: true }) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

