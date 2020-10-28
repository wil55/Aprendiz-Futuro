import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/database";
import { Setor } from './setor.service';


@Injectable({
  providedIn: 'root'

})
export class FirebaseService {
  listaSetorRef: AngularFireList<any>;
  setorRef: AngularFireObject<any>;
  path: string;
  constructor(private _database: AngularFireDatabase) {
    this.path = "setores/";
   }


  create(setor: Setor){
    return this._database.list("setores").push(setor);
  }

  update(setor: Setor, key: any){
    return this._database.list(this.path).push(setor);
  }

  delete(key: any){
    return this._database.object(this.path+key).remove();
  }

  getAll(){
    return this.listaSetorRef = this._database.list(this.path);

  }

  get(key: any){
    return this.listaSetorRef = this._database.list(this.path+key);
  }
}
