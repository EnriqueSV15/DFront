import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { formatISODate } from 'src/app/functions/global';

@Injectable({
  providedIn: 'root'
})

export class QueryBuilderService {
  private prod = environment.production;
  private apiUrl = environment.urlAdministrationApi;

  constructor(private http: HttpClient) { }
  
  sendGet(method: string, params?: any) {
    const url = `${this.apiUrl}${method}${params}`;

    if (!this.prod) {
      console.log('sendGet', url);
    }
    return this.http.get(url);
  }

  /**
   * Send GET method with parameters on the url
   *
   * @param method API method
   */
   sendGet_SinParam(method: string) {    
    const url = `${this.apiUrl}${method}`;

    if (!this.prod) {
      console.log('sendGet', url);
    }
    return this.http.get(url);
  }

  /**
   * Send POST method
   *
   * @param method API method
   * @param params Parameters to send
   */
  sendPost(method: string, params: any) {
    const url = `${this.apiUrl}${method}`;
    console.log("aaaa",url);
    const paramsWithAudit = this.addAuditFields(params);

    if (!this.prod) {
      console.log('sendPost', url);
      console.log('sendPost data', paramsWithAudit);
    }

    return this.http.post(url, paramsWithAudit);
  }

  /**
   * Send PUT method
   *
   * @param method API method
   * @param params Parameters to send
   */
  sendPut(method: string, params: any) {
    const url = `${this.apiUrl}${method}`;

    const paramsWithAudit = this.addAuditFields(params);

    if (!this.prod) {
      console.log('sendPut', url);
      console.log('sendPut data', params);
    }

    return this.http.put(url, params);
  }

  /**
   * Send DELETE method
   *
   * @param method API method
   * @param params Parameters to send
   */
  sendDelete(method: string, params: any) {
    const user = 'ADMIN';
    const date = new Date().toISOString();
    /*
    let toSend = params.concat(`&usuarioInserta=${user}`);
    toSend = toSend.concat(`&fechaInserta=${date}`);
    toSend = toSend.concat(`&usuarioModifica=${user}`);
    toSend = toSend.concat(`&fechaModifica=${date}`);
    const url = `${this.apiUrl}${method}${toSend}`;
    */
    const url = `${this.apiUrl}${method}${params}`;
    console.log('url deletee -------- ',url);

    if (!this.prod) {
      console.log('sendDelete', url);
    }

    return this.http.delete(url);
  }

  addAuditFields(params: any) {
    const paramsWithAudit = {
      ...params,
      usuarioInserta: 'ADMIN',
      fechaInserta: formatISODate(new Date()),
      usuarioModifica: 'ADMIN',
      fechaModifica: formatISODate(new Date())
    };

    return paramsWithAudit;
  }

    /**
   * Envía un método POST
   *
   * @param method Método del api.
   * @param data Campos del formulario a enviar.
   */
     sendPostFormData(method: string, data: FormData) {
      const url = `${this.apiUrl}${method}`;  
      return this.http.post(url, data);
    }

    sendPatch(method: string, params: any) {
      const url = `${this.apiUrl}${method}`;
  
      // const paramsWithAudit = this.addAuditFields(params);
  
      if (!this.prod) {
        console.log('sendPatch ------------ ', url);
        console.log('params ---------------', params);
        // console.log('sendPatch data', paramsWithAudit);
      }
  
      return this.http.patch(url, params);
    }

    
    sendPatchSinParam(method: string) {
      const url = `${this.apiUrl}${method}`;
  
      // const paramsWithAudit = this.addAuditFields(params);
  
      if (!this.prod) {
        console.log('sendPatch ------------ ', url);
        
        // console.log('sendPatch data', paramsWithAudit);
      }
  
      return this.http.patch(url,null);
    }
  
}