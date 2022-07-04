import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialog-cat.component.html',
  styleUrls: ['./dialog-cat.component.css']
})
export class DialogsComponent implements OnInit {

actionsBtn : string = "Guardar Categoria";
catForm !: FormGroup;

constructor(private formBuilder : FormBuilder,
  private api : ApiService,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef : MatDialogRef<DialogsComponent>) { }

  ngOnInit(): void {
    this.catForm = this.formBuilder.group({
      nombreCategoria : ['', Validators.required]
    })
    if(this.editData){
      this.actionsBtn = "Actualizar";
      this.catForm.controls['nombreCategoria'].setValue(this.editData.nombreCategoria);
    }
  }
  agregarCategoria(){
    if(!this.editData){
      if(this.catForm.valid){
        this.api.postCategoria(this.catForm.value)
        .subscribe({
          next:(res)=>{
            alert("Categoria agregada correctamente")
            this.catForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:()=>{
            alert("No se pudo agregar categoria")
          }
        })
      }
    }else{
      this.actualizarCategoria()
    }
  }
  actualizarCategoria(){
    this.api.putCategoria(this.catForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Se actualizo la categoria");
        this.catForm.reset();
        this.dialogRef.close('Actualizar');
      },
      error:()=>{
        alert("Error actualizando la categoria");
      }
    })
  }
}
