import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  formCadastrar: FormGroup;
  email: AbstractControl;
  senha: AbstractControl;
  setor: AbstractControl;
  confSenha: AbstractControl;

  constructor(private formBilder: FormBuilder,
    private alerController: AlertController,
    private router: Router,
    private _auth: AuthService
    ) {}


    ngOnInit() {
      this.formCadastrar = this.formBilder.group({
        email: ["", [Validators.required, Validators.email]],
        setor: ["", [Validators.required, Validators.minLength(5)]],
        senha: ["", [Validators.required, Validators.minLength(6)]],
        confSenha: ["", [Validators.required, Validators.minLength(6)]],
      });
      this.email = this.formCadastrar.controls["email"];
      this.setor = this.formCadastrar.controls["setor"];
      this.senha = this.formCadastrar.controls["senha"];
      this.confSenha = this.formCadastrar.controls["confSenha"];
    }

  submitFormCadastrar() {
    if (!this.formCadastrar.valid) {
      this.exibirAlert("Amigo", "Erro", "Formato de Email Inválido ou Campos Vazios!");
    } else if (this.senha.value != this.confSenha.value) {
      this.exibirAlert("Amigo", "Erro", "As senhas não conferem!");
    } else {
      this._auth
        .registerWithEmail(this.email.value, this.senha.value)
        .then((user) => {
          this.exibirAlert("Amigo", "Sucesso", "Usuário Cadastrado!");
          this.router.navigate(["/login"]);
        })
        .catch((error) => {
          this.exibirAlert("Amigo","Erro","Usuário já cadastrado!");
        });
    }
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
