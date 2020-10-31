import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Key } from 'protractor';
import { FirebaseService } from '../service/firebase.service';
import { Setor } from '../service/setor';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  setores: any[];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private _firebase : FirebaseService
  ) {
    let setoresLista = this._firebase.getAll();
    setoresLista.snapshotChanges().subscribe((res) => {
      this.setores = [];
      res.forEach((item) => {
        let c = item.payload.toJSON();
        c["key"] = item.key;
        this.setores.push(c as Setor);
      })
    });
  }

  irParaCadastrar() {
    this.router.navigate(["/cadastrar"]);
  }

  editar(key: any) {
    this.router.navigate(["/editar", key]);
  }
  
  deletar(setor: any) { 
    this.exibirAlert(
    "Amigo", 
    "Confirmação",
    "Deseja mesmo remover o setor?", 
    setor
    );
  }

  async exibirAlert(
    header: string,
    subHeader: string,
    message: string,
   setor: any
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: "Cancelar",
          role: "cancelar",
          cssClass: "secondary",
          handler: (nada) => {},
        },
        {
          text: "Confirmar",
          handler: () => {
            this._firebase.delete(setor);
},
        },
      ],
    });
    await alert.present();
  }

}
