import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, FormsModule, MatDialogClose],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent {
  constructor(public dialogRef:MatDialogRef<EntradaComponent>, @Inject(MAT_DIALOG_DATA) public data: any){

  }

  onNoClick(){
    this.dialogRef.close();
  }


}
