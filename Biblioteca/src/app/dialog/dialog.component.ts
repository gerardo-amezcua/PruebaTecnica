import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

// Funcion para guardar libro
libroForm !: FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.libroForm = this.formBuilder.group({
      tituloLibro :['', Validators.required],
      autorLibro :['', Validators.required],
      categoriaLibro :['', Validators.required],
      portadaLibro :['', Validators.required],
      fechaLibro :['', Validators.required]
    })
  }

  agregarLibro(){
    console.log(this.libroForm.value);
  }

}
