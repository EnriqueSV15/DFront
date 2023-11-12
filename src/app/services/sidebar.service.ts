import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [{
    titulo:'Seguridad',
    icono:'nav-icon fas fa-user-secret',
    submenu:[
      {titulo:'Usuarios', url:'usuarios', icono:'fa fa-users'},
      {titulo:'Roles', url:'roles', icono:'fa fa-cubes'}
    ]},
    {titulo: 'Mensajería',
    icono: 'nav-icon fas fa-bell',
    submenu:[
      {titulo:'Registro de Mensajes', url:'mensajeria', icono:'fab fa-telegram-plane'}
    ]},
    {titulo: 'Mantenedor',
    icono: 'nav-icon fas fa-archive',
    submenu:[
      {titulo:'Semáforo', url:'semaforo', icono:'fas fa-traffic-light'},
      {titulo:'Chofer', url:'chofer', icono:'fas fa-car'},
      {titulo:'Responsable', url:'responsable', icono:'fas fa-male'}
    ]},
    {titulo: 'Gestión',
    icono: 'nav-icon fas fa-chart-pie',
    submenu:[
      {titulo:'Asociar Siniestro', url:'asociar', icono:'fa fa-handshake'},
      {titulo:'Activar Siniestro', url:'activar', icono:'fas fa-pencil-alt'},
      {titulo:'Siniestros en cartera', url:'siniestros', icono:'fa fa-list-ul'},
    ]},
    {titulo: 'Reportes',
    icono: 'nav-icon fas fa-folder',
    submenu:[
      {titulo:'Clientes Bloqueados', url:'clientesBloqueados', icono:'fa fa-users'},
      {titulo:'Siniestros en cartera - Lectura', url:'siniestrosLectura', icono:'fa fa-list-ul'},
      {titulo:'Siniestros anulados', url:'siniestrosAnulados', icono:'fa fa-ban'},
      {titulo:'Siniestros atendidos', url:'siniestrosAtendidos', icono:'fa fa-ban'},
      {titulo:'Siniestros por Cliente', url:'siniestrosClientes', icono:'fa fa-clipboard'}
    ]}
]
}
