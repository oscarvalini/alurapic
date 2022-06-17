import { AbstractControl } from '@angular/forms';

/**
 * Retorna um objeto se houver erro, ou null se não houver.
 * @param {AbstractControl} control - Controle de formulário do Angular.
 */
export function lowercaseValidator(control: AbstractControl) {
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        /*o nome da propriedade 'lowercase' é importante, pois ele será usado para acessar
         * os erros, como por exemplo: form.get('nome').errors?.lowercase
         */
        return { lowercase: true };
    }

    return null;
}