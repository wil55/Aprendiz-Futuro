import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Setor } from '../service/setor.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  contato: Setor;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private _firebase: FirebaseService,
    ) {
      this.contato = new Setor();
    }

  ngOnInit() {}
  cadastrar() {
    if (this.validar(this.contato.nome) && this.validar(this.contato.gestor)) {
      this._firebase.create(this.contato)
      .then((res) => {
        this.exibirAlert("Agenda", "Sucesso", "Cadastro Efetuado com Sucesso!");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.exibirAlert("Agenda", "Erro", "Erro ao Salvar no Banco!");
        console.log(error);
      })
    
} else {
      this.exibirAlert("Agenda", "Erro", "Todos os campos são obrigatórios");
    }
  }

  validar(campo: any): boolean {
    if (campo != null) {
      return true;
    } else {
      return false;
    }
  }

  async exibirAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

}
