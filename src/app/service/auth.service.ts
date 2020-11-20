import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _angularFire: AngularFireAuth) { }

  logInWithEmail(
    email: string,
    senha: string,
    
  ): Promise<firebase.auth.UserCredential> {
    return this._angularFire.signInWithEmailAndPassword(email,senha);
  }

  registerWithEmail(
    email: string,
    senha: string,
  ): Promise<firebase.auth.UserCredential> {
    return this._angularFire.createUserWithEmailAndPassword(email, senha);
  }
}