import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre : 'Ricardo',
    apellido : 'Vargas',
    email : 'godxvincent@gmail.com'
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSummit( formulario: NgForm ): void {
    console.log( formulario );
  }

}
