import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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
    private _firebase: FirebaseService,
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    ) {
      this.setor = new Setor();
    }
    ngOnInit() {  
      this.route.params.subscribe((parametros) => {
        if (parametros["key"]) {
          this.key = parametros["key"];
          this._firebase.get(this.key).valueChanges().subscribe((item)=>{
           this.setor.gestor = item[2];
            this.setor.nome = item[3];
            this.setor.funcoes = item[0];
            this.setor.funcoes_ap = item[1];
            this.setor.procedimentos = item[4];
           
          }); 
        }
      });
    }
    salvar() {
      if (this.validar(this.setor.nome) && this.validar(this.setor.gestor)) {
        this._firebase.update(this.setor, this.key)
        .then((res) => {
          this.exibirAlert("Amigo (a)", "Edição Efetuada com Sucesso!");
          this.router.navigate(["/home"]);
        })
        .catch((error) =>{
          this.exibirAlert("Amigo (a)","Erro ao Editar Setor!");
          console.log(error);
        })
  
      } else {
        this.exibirAlert("Amigo (a)", "Todos os campos são obrigatórios!");
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
  