import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../../../services/insumo.service';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { InsumoEditarComponent } from './../insumo-editar/insumo-editar.component';
import { UserService } from './../../../services/user.service';
import { UsuarioEditarComponent } from './../usuario-editar/usuario-editar.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  
  cols: any[];
  columns: any[];
  elementos:any[];
  selecteditems:any;
  loading;

  constructor(private userService: UserService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'nombreyapellido', header: 'Nombre y apellido',  width: '50%' },
      { field: 'email', header: 'Usuario',  width: '30%' },
      { field: '', header: 'Permisos',  width: '10%' },
      { field: '', header: 'Contraseña',  width: '10%' },
      { field: '', header: 'Acción',  width: '10%' },
      
      
   ];
  }

  ngOnInit() {
    console.log('cargando insumo');
    this.loadlist();
  }

  loadlist(){

    this.loading = true;
    try {
        this.userService.getUsers()
        .subscribe(resp => {
            this.elementos = resp;
            console.log(this.elementos);
            this.loading = false;
            console.log(resp);
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
    }
}

buscar(elemento: any) {
  console.log(elemento);
  elemento['editaPassword'] = 'NO';
  const data: any = elemento;
  const ref = this.dialogService.open(UsuarioEditarComponent, {
  data,
   header: 'Editar usuario',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((UsuarioEditarComponent: any) => {
    if (UsuarioEditarComponent) {
      this.loadlist();
    }

  });

}



editarPassword(elemento: any) {
  console.log(elemento);
  elemento['editaPassword'] = 'SI';
  const data: any = elemento;
  const ref = this.dialogService.open(UsuarioEditarComponent, {
  data,
   header: 'Editar usuario',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((UsuarioEditarComponent: any) => {
    if (UsuarioEditarComponent) {
      this.loadlist();
    }

  });

}


nuevo() {

  const data: any = null;
  const ref = this.dialogService.open(UsuarioEditarComponent, {
  data,
   header: 'Crear usuario',
   width: '50%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((UsuarioEditarComponent: any) => {
    if (UsuarioEditarComponent) {
      this.loadlist();
    }
  });

}
}

