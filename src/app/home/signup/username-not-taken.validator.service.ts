import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { SignupService } from './signup.service';
import { Injectable } from '@angular/core';

// Serviço de validação de nome de usuário para validação assíncrona

// providedIn: root - implica que o serviço estará disponível para qualquer componente da aplicação.
// No entanto, nesse caso, o serviço é utilizado apenas para validar o nome de usuário
// em SignupComponent, portanto pode ser importado no decorator @Component() do mesmo, no array de providers.
// Ver SignupComponent
// @Injectable({ providedIn: 'root' })
@Injectable()
export class usernameNotTakenValidatorService {
    constructor(private signupService: SignupService){}

    // Observa input do teclado, e consulta a API para validar o nome de usuário. 
    checkUsernameTaken() {
        return (control: AbstractControl) => {
            return control.valueChanges.pipe(
                debounceTime(300), //previne disparo de multiplas emissões seguidas
                switchMap((username) => //switchmap troca o fluxo
                    this.signupService.checkUsernameTaken(username)),
                map(isTaken => isTaken?  { usernameTaken: true} : null ), //retorna validação
                first() //completa o observable após o primeiro valor
            )
        }
    }
}   