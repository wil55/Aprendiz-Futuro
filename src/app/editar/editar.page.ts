import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Setor } from '../service/setor';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  setor : Setor
  key: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private _firebase: FirebaseService
    ) {
      this.setor = new Setor();
    }
    ngOnInit() {  
      this.route.params.subscribe((parametros) => {
        if (parametros["key"]) {
          this.key = parametros["key"];
          this._firebase.get(this.key).valueChanges().subscribe((item)=>{
           this.setor.gestor = item[0];
            this.setor.nome = item[1];
           
          }); 
        }
      });
    }
    salvar() {
      if (this.validar(this.setor.nome) && this.validar(this.setor.gestor)) {
        this._firebase.update(this.setor, this.key)
        .then((res) => {
          this.exibirAlert("Amigo (a)", "Sucesso", "Edição Efetuada com Sucesso!");
          this.router.navigate(["/home"]);
        })
        .catch((error) =>{
          this.exibirAlert("Amigo (a)", "Erro", "Erro ao Editar Setor!");
          console.log(error);
        })
  
      } else {
        this.exibirAlert("Amigo (a)", "Erro", "Todos os campos são obrigatórios!");
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
  