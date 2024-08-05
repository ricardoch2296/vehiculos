import { width, height } from './../../node_modules/@mui/system/index.d';
import { ModalComponentsPropsOverrides } from './../../node_modules/@mui/material/Modal/Modal.d';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './list/list.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EntradaComponent } from './entrada/entrada.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DataService, Vehiculo } from './data.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, ListComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vehiculos';
  vehiculos: Vehiculo[] = [];

  constructor(public dialog: MatDialog, public dataService: DataService) {}

  openDialog() {
    const dialogRef = this.dialog.open(EntradaComponent, {
      width: '300px',
      height: "180px",
      data: { },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.addVehiculo(result).subscribe(response => {
          console.log('Vehículo añadido:', response);
          this.loadVehiculos();
        }, error => {
          console.error('Error al añadir el vehículo:', error);
        });
    }});
  }

  loadVehiculos(){
    this.dataService.getVehiculos().subscribe((data:Vehiculo[]) => {
      this.vehiculos = data;
    })
  }

}
