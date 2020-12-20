import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre : '',
    apellido : '',
    email : '',
    pais : ''
  };
  paises: any[];
  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countryService.getPaises().subscribe( paises => {
      this.paises = paises;
      this.paises.unshift( {
        codigo: '',
        nombre: 'Seleccione un país'
      });
      console.log(this.paises);
    });
  }

  onSummit( formulario: NgForm ): void {

    if ( formulario.invalid ) {
      Object.values( formulario.controls ).forEach ( control => control.markAsTouched() );
      return;
    }
    console.log( formulario );
  }

}
