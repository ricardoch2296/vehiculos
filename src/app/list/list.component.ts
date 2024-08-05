import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { DataService, Vehiculo } from '../data.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, MatButtonModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(public dataService: DataService) {}
  @Input() vehiculos!: Vehiculo[];

  ngOnInit() {
    this.loadVehicules()
  }

  loadVehicules (){
    this.dataService.getVehiculos().subscribe((data: Vehiculo[]) => {
      this.vehiculos = data;
    });
  }

  checkout(e: any, vehiculo: Vehiculo) {
    console.log(vehiculo);
    const recaudo = this.recaudo(vehiculo);
    this.dataService
      .checkout(vehiculo.id, recaudo.recaudo, recaudo.ahoraDate)
      .subscribe((data: any) => {
        this.loadVehicules();
      });
  }

  recaudo(vehiculo: Vehiculo) {
    const tarifa = 1;
    const entradaDate = new Date(vehiculo.entrada);
    const ahoraDate = new Date();
    const cincoHorasAntes = new Date(ahoraDate.getTime() - 5 * 60 * 60 * 1000);
    const diferencia = cincoHorasAntes.getTime() - entradaDate.getTime();

    const recaudo = Math.ceil(diferencia / (1000 * 60 * 60)) * tarifa;

    console.log(recaudo);

    console.log(recaudo);
    const hora = { ahoraDate: cincoHorasAntes, recaudo: recaudo };

    return hora;
  }
}
