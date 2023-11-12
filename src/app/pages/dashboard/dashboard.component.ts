import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SiniestroApiResponse } from 'src/app/models/siniestroApiResponse.model';
import { NotificationsService } from 'src/app/services/global/notifications.service';
import { ResumenService } from 'src/app/services/global/resumen.service';
import { PokemonService } from 'src/app/services/pages/pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  spinnerEvent: Subject<any> = new Subject<any>();
  frmPokemonToFilter: any = {};

  PokemonInfo: any[] = [];
  SugerenciaInfo: any[] = [];
  AbilitiesInfo: any[] = [];
  ResumenInfo: any[] = [];
  
  pokemones: string = "";   
  
  totalPokemon: any = 150;
  imagen: any;

  columns = {
    codigo: { title: 'Código',field: 'codigo',typeof: 'string' },
    nombre: { title: 'Nombre',field: 'nombre',typeof: 'string' },
    imagen: { title: 'Imagen',field: 'imagen',typeof: 'imagen' }
  };

  columnsAbilities = {
    ability: { title: 'habilidad',field: 'ability',typeof: 'string' },
    ranura: { title: 'Ranura',field: 'ranura',typeof: 'string' },
    hidden: { title: '¿Está oculto?',field: 'hidden',typeof: 'imagen' }
  };

  columnsResumen = {
    letra: { title: 'Letra - Abecedario',field: 'letra',typeof: 'string' },
    Cantidad: { title: 'Cantidad de Pokemon',field: 'Cantidad',typeof: 'string' }
  };

  actions = {
    select: true
  };

  constructor(private fb: FormBuilder, private pokemonService: PokemonService, private resumenService: ResumenService,private ntf: NotificationsService) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.searchPokemon();
  }

  createForm() {
    this.frmPokemonToFilter = this.fb.group({
      name: [{ value: null, disabled: true }],
      height: [{ value: null, disabled: true }],
      weight: [{ value: null, disabled: true }],
      experience: [{ value: null, disabled: true }],
    });
  }

  searchPokemon(){
    this.pokemonService.search().subscribe((rpta: any) => {      
      if (rpta.count > 0) {        
        this.searchPokemonId(rpta.count);

        setTimeout(() => {
          this.resumen();
        }, 1000);
      } else {
        this.PokemonInfo = [];
        this.SugerenciaInfo = [];
      }
       this.hideSpinner();
    }, error => {
      this.ntf.error(error.message);
      this.hideSpinner();
    });
  }

  searchPokemonId(count:any){
    this.PokemonInfo = [];
    this.SugerenciaInfo = [];

    let apiTrader: SiniestroApiResponse = new SiniestroApiResponse();

    let pokemonData;
    let sugerenciaData; 

    for(let i = 1; i <= 150; i++){
      this.pokemonService.searchId(i).subscribe((rpta: any) => {  
        if (rpta) {
          apiTrader.data = [rpta];
          
          pokemonData = {
            codigo: rpta.id,
            nombre: rpta.name,
            imagen: rpta.sprites.front_default
          };
          
          this.PokemonInfo.push(pokemonData);
          
          sugerenciaData = [
            rpta.name
          ]

          this.SugerenciaInfo.push(sugerenciaData);
          
          this.pokemones = this.pokemones + rpta.name + ",";
        } else {
          this.PokemonInfo = [];
        }
        this.hideSpinner();
      }, error => {
        this.ntf.error(error.message);
        this.hideSpinner();
      });
    }
    this.totalPokemon = 150;
  }

  resumen(){
    let miArregloPokemon: string[];

    this.pokemones = this.pokemones.slice(0, -1);
    miArregloPokemon = this.pokemones.split(',');

    this.ResumenInfo = Object.entries(this.resumenService.contarPalabrasPorLetra(miArregloPokemon))
    .map(([letra, Cantidad]) => ({ letra, Cantidad }))
    .sort((a, b) => a.letra.localeCompare(b.letra));
    
    console.log('this.PokemonInfo Prueba2 ------- ', this.ResumenInfo);
  }

  rowActionClick(event: any) {
    switch (event.action) {
      case 'select':
        this.selection(event.row);
        break;
      default:
        break;
    }
  }

  selection(event:any){
    console.log("Entra a la acción",event);
    this.AbilitiesInfo = [];

    let pokemonDetail;

    this.imagen = event.imagen;

    this.frmPokemonToFilter.get('name').setValue(event.nombre);

    this.pokemonService.searchDetail(event.nombre).subscribe((rpta: any) => {  
      let apiTrader: SiniestroApiResponse = new SiniestroApiResponse();
      apiTrader.data = [rpta];

      this.frmPokemonToFilter.get('height').setValue(rpta.height);
      this.frmPokemonToFilter.get('weight').setValue(rpta.weight);
      this.frmPokemonToFilter.get('experience').setValue(rpta.base_experience);

      for(let i = 0; i <= rpta.abilities.length - 1; i++){
        pokemonDetail = {
          ability: rpta.abilities[i].ability.name,
          ranura: rpta.abilities[i].slot,
          hidden: rpta.abilities[i].is_hidden === false ? 'NO':'SI'
        };

        this.AbilitiesInfo.push(pokemonDetail);
      }

    }, error => {
      this.ntf.error(error.message);
      this.hideSpinner();
    });
  }

  showSpinner() {
    this.spinnerEvent.next({ show: true, name: 'Pokemon' });
  }

  hideSpinner() {
    this.spinnerEvent.next({ show: false, name: 'Pokemon' });
  }
}
