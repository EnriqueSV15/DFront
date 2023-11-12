import { Injectable } from '@angular/core';
import { QueryBuilderService } from '../global/query-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(private qb: QueryBuilderService) { }

  contarPalabrasPorLetra(abecedarioData: string[]): Record<string, number> {
    const resultado: Record<string, number> = {};

    abecedarioData.forEach((palabra) => {
      const primeraLetra = palabra.charAt(0).toLowerCase();
      resultado[primeraLetra] = (resultado[primeraLetra] || 0) + 1;
    });

    return resultado;
  }
}
