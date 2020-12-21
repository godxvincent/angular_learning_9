import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {


  formGroupReactivo: FormGroup;

  constructor(private formBuilder: FormBuilder, private validadores: ValidacionesService) {
    this.crearFormulario();
    this.cargarFormulario();
    this.crearListener();
   }

  ngOnInit(): void {
  }

  crearFormulario(): any {
    const validacionesSincronas = [Validators.required, Validators.minLength(5), this.validadores.apellidoInvalido];
    this.formGroupReactivo = this.formBuilder.group(
      // Cada elemento es un campo del formulario, el primer valor del arreglo definido corresponde a los valores por default,
      // segundo validaciones sincronas y el ultimo a las validaciones asincronas
      {
        nombre: ['', validacionesSincronas ],
        apellido: ['', validacionesSincronas  ],
        correo: ['' , [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
        usuario: ['', validacionesSincronas, this.validadores.existeUsuario ],
        password1: ['', Validators.required],
        password2: ['', Validators.required],
        direccion: this.formBuilder.group( {
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required]
        }),
        pasatiempos: this.formBuilder.array([])
      },
      {
        // Recibe una validación o arreglo de validadores, además debe retornarse una función que será invocada.
        validators: this.validadores.validarDosPasswordFields('password1', 'password2')
      }
    );
  }

  guardar(): void {
    console.log(this.formGroupReactivo);
    if ( this.formGroupReactivo.invalid ) {
      Object.values( this.formGroupReactivo.controls ).forEach ( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( subControl => {
            subControl.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
      return;
    }
    this.formGroupReactivo.reset();
  }

  checkField(fieldName: string): boolean {
    return this.formGroupReactivo.get(fieldName).invalid && this.formGroupReactivo.get(fieldName).touched;
  }

  cargarFormulario(): void {
    // Set value obliga que todos los campos sean informados.
    // this.formGroupReactivo.setValue(
    //   {
    //     nombre: 'Ricardo',
    //     apellido: 'Vargas',
    //     correo: 'godxvincent@gmail.com',
    //     direccion: {
    //       distrito: 'XXX1',
    //       ciudad: 'YYYY2'
    //     }
    //   }
    // );

    this.formGroupReactivo.reset(
      {
        nombre: 'Ricardo',
        apellido: 'Vargas',
        correo: 'godxvincent@gmail.com',
        password1 : '123',
        password2 : '123',
        direccion: {
          distrito: 'XXX1',
          ciudad: 'YYYY2'
        }
      }
    );
  }

  get pasatiempos(): FormArray {
    return this.formGroupReactivo.get('pasatiempos') as FormArray;
  }

  agregarPasatiempo(): void {
    this.pasatiempos.push( this.formBuilder.control(
      ''
    ) );
  }

  borrarPasatiempo(indice: number): void {
    this.pasatiempos.removeAt(indice);
  }

  crearListener(): void {
    this.formGroupReactivo.valueChanges.subscribe( valor => {
      console.log(valor);
    });

    this.formGroupReactivo.statusChanges.subscribe( status => {
      console.log(status);
    });

    this.formGroupReactivo.get('nombre').valueChanges.subscribe( console.log );
  }

}
