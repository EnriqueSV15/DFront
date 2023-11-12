import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-prime-datatable',
  templateUrl: './generic-prime-datatable.component.html',
  styleUrls: ['./generic-prime-datatable.component.css']
})
export class GenericPrimeDatatableComponent implements OnInit {
  
  @Input() dataRows:any;
  @Input() sugerencias:any;
  @Input() columns: any[] = [];

  filter: any[] = [];

  @Input() paginator:any = false;
  @Input() searchPrimeNg:any = false;

  @Input() totalRecords: number = 0;
  //totalRecords: number = 0;

  @Input() actions?: {
    edit: boolean,
    select: boolean,
    custom?: { title: string, action: string, class: string, icon: string }[]
  };

  @Output() rowActionClick = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();

  @Output () displayValue = new EventEmitter<number>();
  @Output () searchValue = new EventEmitter<string>();
  @Output () paginatorValue = new EventEmitter<number>();

  dropdownList: any[] = [];

  listActions: { title: string, action: string, class: string, icon: string }[] = [];

  first = 0;
  rows = 5;

  scroll: string = "";

  valorSeleccionado: string = '';

  constructor() { }
  
  ngOnInit(): void {
    this.manageActions();

    //this.totalRecords = this.dataRows.length;
    console.log("PruebaES",this.totalRecords);
    for (let clave in this.columns){
      this.filter.push( {field: this.columns[clave].field });
    }

    this.dropdownList = this.getDropdown();
    this.displayValue.emit(this.rows);    

    if(this.paginator === true){
      this.scroll =  "";
    }else {
      this.scroll = "350px";
    }
  }

  prueba(){
    console.log("Entrooooo",this.totalRecords);
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.dataRows ? this.first === (this.dataRows.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.dataRows ? this.first === 0 : true;
  }

  keepOrder = (a:any, b:any) => {
    return a;
  }

  manageActions(){
    if (this.actions) {
      if (this.actions.edit) {
        this.listActions = this.listActions.concat(
          { title: 'global.edit', action: 'edit', class: 'p-button-rounded p-button-success mr-2', icon: 'pi pi-pencil' }
        );
      }
      if (this.actions.select) {
        this.listActions = this.listActions.concat(
         { title: 'global.select', action: 'select', class: 'p-button-rounded p-button-success', icon: 'pi pi-plus' }
        );
      }
    }else{
      this.listActions = [];
    }
  }

  onActionClick(action: string, row: any) {
     this.rowActionClick.emit({ action, row });
  }

 onRowClick(row: any) {
   
   if (this.actions && this.actions.select) {
     this.rowClick.emit({ action: 'select', row });
   }

   if(this.actions === undefined){
     this.rowClick.emit({ action: 'select', row });
   }
 }

 getDropdown(){
  return [
    {
      id: 5,
      name: 5
    },
    {
      id: 10,
      name: 10
    },
    {
      id: 50,
      name: 50
    }
  ];
 }
 
 onchange(event:any){
  this.rows = event.value;

  this.displayValue.emit(event.value);
}

onSearch(event:any){
  this.searchValue.emit(event);
}

paginate(event:any){
  this.paginatorValue.emit(event.page + 1);
}
}
