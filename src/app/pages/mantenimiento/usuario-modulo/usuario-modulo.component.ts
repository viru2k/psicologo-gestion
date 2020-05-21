import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService } from 'primeng/api';
import { AlertServiceService } from './../../../services/alert-service.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-usuario-modulo',
  templateUrl: './usuario-modulo.component.html',
  styleUrls: ['./usuario-modulo.component.scss']
})
export class UsuarioModuloComponent implements OnInit {

  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;
  selectedElemento:any;

  constructor(private userService: UserService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadlist();
  }

  borrar(e:any){
    console.log(e);
  }
  
  loadlist(){

    this.loading = true;
    try {
        this.userService.getItemsMenu()
        .subscribe(resp => {
            this.elementos = resp;
            console.log(this.elementos);
            this.loading = false;
            console.log(resp);
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}
}
