import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogsComponent } from './dialogs/dialog-cat.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Biblioteca';
  displayedColumns: string[] = ['tituloLibro', 'autorLibro', 'categoriaLibro', 'portadaLibro', 'fechaLibro', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  displayedColumn: string[] = ['nombreCategoria', 'accionesCat'];
  dataSources!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginators!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;

  // Se agrega constructor para Dialog
  constructor(private dialog: MatDialog, private api: ApiService, private dialogCat: MatDialog) {

  }
  ngOnInit(): void {
    this.getAllLibros();
    this.getAllCat();
  }
  // Funcion de Dialog
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Guardar') {
        this.getAllLibros();
      }
    })
  }
  getAllLibros() {
    this.api.getLibro()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error actualizando");
        }
      })
  }
  editLibros(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Actualizar') {
        this.getAllLibros();
      }
    })
  }
  eliminarLibro(id: number) {
    this.api.deletLibro(id)
      .subscribe({
        next: (res) => {
          alert("Registro eliminado");
          this.getAllLibros();
        },
        error: () => {
          alert("Error al eliminar el registro")
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //  CATEGORIAS

  openDialogCat() {
    this.dialogCat.open(DialogsComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Guardar') {
        this.getAllCat();
      }
    })
  }
  getAllCat() {
    this.api.getCategoria()
      .subscribe({
        next: (resCat) => {
          this.dataSources = new MatTableDataSource(resCat);
          this.dataSources.paginator = this.paginators;
          this.dataSources.sort = this.sorts;
        },
        error: (err) => {
          alert("Error actualizando");
        }
      })
  }

  editCategoria(row: any) {
    this.dialogCat.open(DialogsComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Actualizar') {
        this.getAllCat();
      }
    })
  }

  eliminarCategoria(id: number) {
    this.api.deletCategoria(id)
      .subscribe({
        next: (resCat) => {
          alert("Categoria eliminada");
          this.getAllCat();
        },
        error: () => {
          alert("Error al eliminar la categoria")
        }
      })
  }
  applyFilterCat(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();

    if (this.dataSources.paginator) {
      this.dataSources.paginator.firstPage();
    }
  }
}

