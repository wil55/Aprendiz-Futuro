import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  email: AbstractControl;
  senha: AbstractControl;

  constructor(private formBilder: FormBuilder,
    private alerController: AlertController,
    private router: Router,
    private _auth: AuthService
    ) {}

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
      this.exibirAlert("Amigo", "Erro", "Campos Vazios!");
    } else {
      this._auth
        .logInWithEmail(this.email.value, this.senha.value)
        .then((user) => {
          this.exibirAlert("Amigo", "Sucesso", "Seja bem vindo!");
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

}
