import { Component, OnInit } from '@angular/core';
import { ClienteSrvService } from '../services/cliente-srv.service';
import { ClienteMsgDto } from '../models/clienteMsgDto';

@Component({
  selector: 'app-proyeccion',
  templateUrl: './proyeccion.component.html',
  styleUrls: ['./proyeccion.component.css']
})
export class ProyeccionComponent implements OnInit {

  datosProyeccion: Number[] = [];
  datosVentasEfectuadas: Number[] = [];
  listClientes: ClienteMsgDto[] = [];

  nombre: String;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.datosProyeccion, label: 'Proyección de ventas'},
    {data: this.datosVentasEfectuadas, label: 'Ventas efectuadas'}
  ];

  constructor(private clienteSrv: ClienteSrvService) { }

  ngOnInit() {
    this.listarClientes();
  }

  generarDataProyeccion(){
    this.datosProyeccion=[];
    for (let index = 0; index < 12; index++) {
      this.datosProyeccion.push(randomIntFromInterval(1,10000));
    }
    console.log(this.datosProyeccion);
    
  }

  generarDataVentasEfectuadas(){
    this.datosVentasEfectuadas = [];
    const fechaActual = new Date();
    const n = fechaActual.getMonth();
    for (let index = 0; index < n; index++) {
      this.datosVentasEfectuadas.push(randomIntFromInterval(1,10000));
    }
  }

  listarClientes(){
    this.clienteSrv.listarCliente().subscribe((resp)=>{
      this.listClientes = resp as ClienteMsgDto[];
    })
  }

  calcularProyeccion(nombre: String){
    console.log(nombre);
    
    this.generarDataProyeccion();
    this.generarDataVentasEfectuadas();
    this.barChartData = [
      {data: this.datosProyeccion, label: 'Proyección de ventas'},
      {data: this.datosVentasEfectuadas, label: 'Ventas efectuadas'}
    ];

    this.nombre = nombre;
  }
  
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}