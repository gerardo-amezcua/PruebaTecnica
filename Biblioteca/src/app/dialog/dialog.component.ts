import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

// Funcion para guardar libro o categoria
libroForm !: FormGroup;
actionBtn : string = "Guardar";

  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.libroForm = this.formBuilder.group({
      tituloLibro :['', Validators.required],
      autorLibro :['', Validators.required],
      categoriaLibro :['', Validators.required],
      portadaLibro :['', Validators.required],
      fechaLibro :['']
    })

     if(this.editData){
      this.actionBtn = "Actualizar";
      this.libroForm.controls['tituloLibro'].setValue(this.editData.tituloLibro);
      this.libroForm.controls['autorLibro'].setValue(this.editData.autorLibro);
      this.libroForm.controls['categoriaLibro'].setValue(this.editData.categoriaLibro);
      this.libroForm.controls['portadaLibro'].setValue(this.editData.portadaLibro);
      this.libroForm.controls['fechaLibro'].setValue(this.editData.fechaLibro);
     }

  }

  agregarLibro(){
    if(!this.editData){
      if(this.libroForm.valid){
        this.api.postLibro(this.libroForm.value)
        .subscribe({
          next:(res)=>{
            alert("Libro agregado correctamente")
            this.libroForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:()=>{
            alert("No se pudo agregar libro")
          }
        })
      }
    }else{
      this.actualizarLibro()
    }
  }
  actualizarLibro(){
    this.api.putLibro(this.libroForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Se actualizo el registro");
        this.libroForm.reset();
        this.dialogRef.close('Actualizar');
      },
      error:()=>{
        alert("Error actualizando el registro");
      }
    })
  }
}
