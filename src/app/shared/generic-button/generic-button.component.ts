import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements OnInit {

  @Input() label: string = "";
  @Input() type = 'button';
  @Input() classes: string = "";
  @Input() icon: string = "";
  @Input() minWidth = 0;
  @Input() setelement = '0';
  @Input() disabled = false;

  buttonLabel = '';
  buttonType = 'button';
  buttonClasses = '';
  buttonIcon: string = "";

  ngOnInit(): void {
    this.createButton();
  }

  createButton() {
    let tempLabel = '';
    let tempClasses = '';
    let tempIcon = '';

    switch (this.type) {
      case 'search':
        this.buttonType = 'submit';
        tempLabel = 'global.search';
        tempClasses = 'btn btn-primary btn-sm';
        tempIcon = 'fas fa-search';
        break;
      case 'add':
        tempLabel = 'global.addNew';
        tempClasses = 'btn btn-success btn-sm';
        tempIcon = 'fas fa-plus-circle';
        break;
      case 'addCustomer':
        tempLabel = 'Add Customers';
        tempClasses = 'btn btn-success btn-sm';
        tempIcon = 'fas fa-plus-circle';
        break;
      case 'save':
        this.buttonType = 'submit';
        tempLabel = 'global.save';
        tempClasses = 'btn btn-primary btn-sm';
        tempIcon = 'far fa-save';
        break;
      case 'cancel':
        tempLabel = 'global.cancel';
        tempClasses = 'btn btn-default btn-sm';
        tempIcon = 'fas fa-ban';
        break;
      case 'back':
        tempLabel = 'global.back';
        tempClasses = 'btn btn-default btn-sm';
        tempIcon = 'fas fa-arrow-circle-left';
        break;
      case 'excel':
        tempLabel = 'global.expExcel';
        tempClasses = 'btn btn-success btn-sm';
        tempIcon = 'fa fa-file-excel';
        break;
      case 'refrescar':
        tempLabel = 'global.refresh';
        tempClasses = 'btn btn-primary btn-sm';
        tempIcon = 'fas fa-sync-alt';
        break;
      case 'manual':
        tempLabel = 'global.manual';
        tempClasses = 'btn btn-primary btn-sm';
        tempIcon = 'far fa-file-alt';
        break;
      case 'download':
        tempLabel = 'global.downloadCheque';
        tempClasses = 'btn btn-default btn-sm';
        tempIcon = 'fas fa-ban';
        break;
      default:
        tempLabel = 'Button';
        break;
    }

    this.buttonLabel = this.label || tempLabel;
    this.buttonClasses = tempClasses + ' ' + (this.classes || '');
    this.buttonIcon = this.icon || tempIcon;
  }
}
