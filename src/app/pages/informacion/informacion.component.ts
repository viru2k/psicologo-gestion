import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { DialogService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as $ from 'jquery';


import { URL_ARCHIVO, URL_ARCHIVO_VIDEO, URL_ARCHIVO_IMAGEN } from './../../config/config';
import { PsicologoService } from './../../services/psicologo.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {


  urgente: any= null;
  display;
  elementos:any[] = [];
  elementos_videos: any[] = [];
  elemento_detalle: any = null;
  loading;
  public safeURL: SafeResourceUrl;
  errorvideo;
  errornoticia;

  constructor(private miServicio: PsicologoService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadListNoticias();
    this.loadListVideos();
  }


  
  loadListNoticias() {
    this.errornoticia = false;
    this.loading = true;
    try {
           this.miServicio.getinformacionPrivado()
           .subscribe(resp => {
             let i=0;
             let res = resp;
             let ultimo;
             resp.forEach(element => {
                   //enlaces
                   if(res[i]['tiene_enlace']==='SI'){
                    res[i]['enlace'] = URL_ARCHIVO+res[i]['enlace'];
                   }
                   // videos
                   if(res[i]['es_video']==='SI'){
                    res[i]['enlace_video'] = URL_ARCHIVO_VIDEO+res[i]['enlace_video'];
                   }

                   if(res[i]['tiene_imagen']==='SI'){
                    res[i]['imagen'] = URL_ARCHIVO_IMAGEN+res[i]['imagen'];
                   }
                   if(!ultimo){
                     if(resp[i]['es_importante'] ==='SI'){
                       this.urgente = resp[i];
                       ultimo = true;
                       console.log('noticia');
                     }
                   }
                   i++;
                });
             this.elementos = resp;
             console.log(resp);
             this.loading = false;
           },
           error => { // error path
               console.log(error);
               console.log(error.status);
               this.errornoticia = true;
               this.loading = false;
            });
       } catch (error) {
        this.errornoticia = true;
       }
   }

  loadListVideos() {
    this.loading = true;
    this.errorvideo = false;

   }


   actualizarVideo(){
     this.loadListVideos();
   }

   actualizarNoticia(){
     this.loadListNoticias();
   }

   

   photoURL(element:any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(element);
  }


}
