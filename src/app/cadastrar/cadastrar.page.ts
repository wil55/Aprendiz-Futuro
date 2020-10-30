import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Setor } from '../service/setor';



@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  setor: Setor;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private _firebase: FirebaseService,
    ) {
      this.setor = new Setor();
    }

  ngOnInit() {}
  cadastrar() {
    if (this.validar(this.setor.nome) && this.validar(this.setor.gestor)) {
      this._firebase.create(this.setor)
      .then((res) => {
        this.exibirAlert("Amigo (a)", "Sucesso", "Cadastro Efetuado com Sucesso!");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.exibirAlert("Amigo (a)", "Erro", "Erro ao Salvar no Banco!");
        console.log(error);
      })
    
} else {
      this.exibirAlert("Amigo (a)", "Erro", "Todos os campos são obrigatórios");
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
