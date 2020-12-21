import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  apellidoInvalido( control: FormControl ): ErrorValidate {
    // La interrogación es para decir que no aplique el tolowercase a menos que venga valor.
    if ( control.value ) {
      const texto: string = control.value?.toLowerCase();
      if ( texto.startsWith('f') ) {
        return {
          noValidSurname: true
        };
      }
    }
    return null;
  }

  validarDosPasswordFields(field1: string, field2: string): (formGroup: FormGroup) => void {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[field1];
      const pass2Control = formGroup.controls[field2];
      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors( null );
      } else {
        pass2Control.setErrors( { confirmationPass :  true });
      }
    };
  }

  existeUsuario( control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {


    return new Promise(
      (resolve, reject) => {
        if ( !control.value ) {
          return Promise.resolve( null );
        }
        setTimeout( () => {
          const texto: string = control.value;
          if ( texto.toLowerCase().startsWith('g') ) {
            resolve( { usuarioExiste: true });
          } else {
            resolve( null );
          }
        } , 3500 );
      }
    );
  }
}
