import { NewUser } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

// providedIn: root - implica que o serviço estará disponível para qualquer componente da aplicação.
// No entanto, nesse caso, o serviço é utilizado apenas dentro de HomeModule em SignupComponent e UsernameNotTakenService,
// portanto pode ser importado no próprio módulo, para que esteja disponível em todos os serviços e componentes declarados nele.
// Ver HomeModule.
// @Injectable({ providedIn: 'root' })
@Injectable()
export class SignupService {

    constructor(private http: HttpClient) {}

    // Consulta a API para verificar se o nome de usuário já existe.
    checkUsernameTaken(username: string) {
        return this.http.get(API_URL + '/user/exists/' + username);
    }

    signup(newUser: NewUser) {
        return this.http.post(API_URL + '/user/signup', newUser);
    }

}