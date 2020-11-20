import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from '../service/firebase.service';
import { Setor } from '../service/setor';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  setores: any[];
  shownGroup = null;
  userData: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private _firebase : FirebaseService,
    public ngFireAuth: AngularFireAuth,
    public navCtrl: NavController,
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

    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user.email;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  
  irParaCadastrar() {
    this.router.navigate(["/cadastrar"]);
  }

  editar(key: any) {
    this.router.navigate(["/editar", key]);
  }
  
  deletar(setor: any,nome: any) { 
    this.exibirAlert(
    "Amigo", 
    "Confirmação",
    "Deseja mesmo remover o setor '" + nome + "' ?", 
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

  sair() { 
    this.navCtrl.navigateRoot('/login')
  }

}
