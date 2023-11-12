import { Injectable } from '@angular/core';
import { QueryBuilderService } from '../global/query-builder.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private qb: QueryBuilderService) { }

  search() {
    return this.qb.sendGet_SinParam('/pokemon');
  }

  searchId(id: number) {    
    return this.qb.sendGet_SinParam(`/pokemon/${id}`);
  }

  searchDetail(name: string) {    
    return this.qb.sendGet_SinParam(`/pokemon/${name}`);
  }
}
