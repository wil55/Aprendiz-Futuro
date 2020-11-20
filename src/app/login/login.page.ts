import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  email: AbstractControl;
  senha: AbstractControl;
  userData: any;

  constructor(private formBilder: FormBuilder,
    private alerController: AlertController,
    private router: Router,
    private _auth: AuthService,
    public loadingController: LoadingController,
    public ngFireAuth: AngularFireAuth,
    public toastCtrl: ToastController, 
    ) {
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

  ngOnInit() {
    this.formLogin = this.formBilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", Validators.required],
    });
    this.email = this.formLogin.controls["email"];
    this.senha = this.formLogin.controls["senha"];
  }

  submitFormLogin() {
    if (!this.formLogin.valid) {
      this.exibirAlert("Amigo", "Erro", "Formato de Email Inválido ou Campos Vazios!");
    } else {
      this._auth
        .logInWithEmail(this.email.value, this.senha.value)
        .then((user) => {
          this.exibirAlert2(this.userData, "Seja bem vindo!");
          this.router.navigate(["/home"]);
        })
        .catch((error) => {
          this.exibirAlert(
            "Amigo",
            "Erro",
            "Login/Senha Inválidos! Tente novamente!"
            );
          });
      }
    }

  irParaRegistrar(){
    this.router.navigate(["/registrar"]);
  }

  async exibirAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alerController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async exibirAlert2(header: string, message: string) {
    const toast = await this.toastCtrl.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      duration: 2000
    });
    await toast.present();
  }

}
