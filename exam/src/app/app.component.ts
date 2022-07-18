import { Component, OnInit, Inject } from '@angular/core';
import { EmpresasService } from './empresas.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  empresas:any=[];
  dataSource:any;

  constructor(public dialog: MatDialog, public empresaService: EmpresasService) {}
  ngOnInit() {
    this.updateTable();
  }
  displayedColumns: string[] = ['nombre', 'tipo', 'fecha', 'acciones'];

  New() {
    const dialogRef = this.dialog.open(AppComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }
  Edit(id:number) {
    const dialogRef = this.dialog.open(AppComponentDialogEdit, {data: id});
    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }
  Delete(id:number){
    const dialogRef = this.dialog.open(AppComponentDialogDelete, {data: id});
    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }
  updateTable(){
    this.empresaService.getEmpresas().subscribe((result:any) => { this.empresas = result;
      this.dataSource = new MatTableDataSource<Empresa>(this.empresas);
    });
  }
}

export interface Empresa {
  id: number;
  nombre: string;
  fecha: string;
  tipo: string;
}
//Create Dialog
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog.app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentDialog implements OnInit {
  tipo_empresa:any = [];

  constructor(public dialogRef: MatDialogRef<AppComponentDialog>, public empresaService: EmpresasService, private _snackBar: MatSnackBar) {}
  empresaFormControl = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    fecha: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    comentarios: new FormControl('', Validators.maxLength(1020))
  });

  ngOnInit(){
    this.empresaService.getTipoEmpresa().subscribe((result:any) => this.tipo_empresa = result);
  }

  createNew(){
    if(this.empresaFormControl.valid){
      this.empresaService.createEmpresa(this.empresaFormControl.value).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this._snackBar.open(datos['mensaje'], 'OK', {duration: 5000});;
        }
      });
      this.dialogRef.close();
    }
    else{
      this._snackBar.open('Completa los campos requeridos para continuar', 'OK', {duration: 5000});
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}

//Edit Dialog
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog.edit.app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentDialogEdit implements OnInit {
  tipo_empresa:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<AppComponentDialogEdit>, public empresaService: EmpresasService, private _snackBar: MatSnackBar) {}
  empresaFormControl = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    fecha: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    comentarios: new FormControl('', Validators.maxLength(1020))
  });

  ngOnInit(){
    this.empresaService.getEmpresa(this.data).subscribe((result:any) => {
      this.empresaFormControl = new FormGroup({
        nombre: new FormControl(result[0].nombre, [Validators.required, Validators.maxLength(255)]),
        fecha: new FormControl(result[0].fecha, Validators.required),
        tipo: new FormControl(result[0].tipo, Validators.required),
        comentarios: new FormControl(result[0].comentarios, Validators.maxLength(1020))
      });
    this.empresaService.getTipoEmpresa().subscribe((result:any) => this.tipo_empresa = result)});
  }

  update(){
    if(this.empresaFormControl.valid){
      this.empresaService.updateEmpresa(this.data, this.empresaFormControl.value).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this._snackBar.open(datos['mensaje'], 'OK', {duration: 5000});;
        }
      });
      this.dialogRef.close();
    }
    else{
      this._snackBar.open('Completa los campos requeridos para continuar', 'OK', {duration: 5000});
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}

//Delete Dialog
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog.delete.app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentDialogDelete {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<AppComponentDialogDelete>, public empresaService: EmpresasService, private _snackBar: MatSnackBar) {}

  delete(){
    this.empresaService.deleteEmpresa(this.data).subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        this._snackBar.open(datos['mensaje'], 'OK', {duration: 5000});;
      }
    });
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }
}

