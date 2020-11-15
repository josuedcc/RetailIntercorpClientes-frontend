import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isUndefined } from 'util';
import { ClienteDto } from '../models/clienteDto';
import * as moment from 'moment';
import { ClienteMsgDto } from '../models/clienteMsgDto';
import { ClienteSrvService } from '../services/cliente-srv.service';
import { fadeInItems } from '@angular/material';
import { concatAll } from 'rxjs/operators';
import { KpiMsgDto } from '../models/kpiMsgDto';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  registrarClienteForm;
  model: NgbDateStruct;
  edadActual: Number;
  kpiDto: KpiMsgDto;
  listClientes: ClienteMsgDto[] = [];

  constructor(private formBuilder: FormBuilder,private clienteSrv: ClienteSrvService) {

  }

  ngOnInit() {

    this.registrarClienteForm=new FormGroup({ 
      nombres:new FormControl(''), 
      apellidos:new FormControl(''), 
      edad:new FormControl(''), 
      fecNacimiento:new FormControl(''), 
    }) 

    this.registrarClienteForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      fecNacimiento: ['', Validators.required],
    });

    this.listarClientes()
  }

  get f() { return this.registrarClienteForm.controls; }

  onSubmit() {
    if (this.registrarClienteForm.invalid) {
      return;
    }
    console.log(this.registrarClienteForm);
    let cliDto = new ClienteDto();
    cliDto.nombre = this.registrarClienteForm["value"]["nombres"];
    cliDto.apellido = this.registrarClienteForm["value"]["apellidos"];
    cliDto.edad = this.registrarClienteForm["value"]["edad"];
    let fechaString = this.model["year"] + "-" + this.model["month"] + "-" + this.model["day"];
    let fechaInputDate = new Date(fechaString);
    let formattedDate = (moment(fechaInputDate)).format('yyyy-MMM-dd');
    cliDto.fecNacomiento = fechaInputDate;
    cliDto.edad = this.edadActual;

    this.clienteSrv.registrarCliente(cliDto).subscribe(resp=>{
      console.log(resp);
      this.listarClientes();
      this.registrarClienteForm.reset();
    })
  }

  listarClientes(){
    this.clienteSrv.listarCliente().subscribe((resp)=>{
    
      this.listClientes = resp as ClienteMsgDto[];
      console.log(this.listClientes);
      this.getKpiClientes();
    })
  }

  calcularEdad() {
    if (!isUndefined(this.model)) {
      let fechaString = this.model["year"] + "-" + this.model["month"] + "-" + this.model["day"];
      let fechaInputDate = new Date(fechaString);
      if (fechaInputDate) {
        let timeDiff = Math.abs(Date.now() - <any>fechaInputDate);
        this.edadActual = moment().diff(fechaInputDate, 'years');
      } else {
        this.edadActual = 1;
      }
    }
  }

  getKpiClientes(){
    this.clienteSrv.getKpideclientes().subscribe((resp)=>{
      this.kpiDto = resp as KpiMsgDto;
    })
  }

}
