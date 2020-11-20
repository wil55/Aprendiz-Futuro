import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    ) {
      this.setor = new Setor();
    }

  ngOnInit() {}
  cadastrar() {
    if (this.validar(this.setor.nome) && this.validar(this.setor.gestor) && this.validar(this.setor.funcoes) && this.validar(this.setor.funcoes_ap) && this.validar(this.setor.procedimentos)) {
      this._firebase.create(this.setor)
      .then((res) => {
        this.exibirAlert("Amigo (a)", "Setor Cadastrado com Sucesso!");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.exibirAlert("Amigo (a)", "Erro ao Salvar no Banco!");
        console.log(error);
      })
    
} else {
      this.exibirAlert("Amigo (a)", "Todos os campos são obrigatórios");
    }
  }

  validar(campo: any): boolean {
    if (campo != null) {
      if(!campo.match(/^(\s)+$/)){
        return true;
      }
     
    } else {
      return false;
    }
  }

  async exibirAlert(header: string, message: string) {
    const toast = await this.toastCtrl.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      duration: 2000
    });
    await toast.present();
  }

  cancelar(){
    this.navCtrl.pop();
  }
}
