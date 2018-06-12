import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { InserirPage } from '../inserir/inserir';
import "rxjs/add/operator/map"; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private url:string = "http://localhost:3000/contatos";
  public dados: Array<{}>;

  constructor(public navCtrl: NavController,public http:Http) {
    this.getAll();
  }
  getAll(){
      this.http.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
        this.dados = data;
      });
    }

  getId(id:number){
    this.navCtrl.push("DetalhesPage", {
      id: id
    })
  }
  Inserir(){
    this.navCtrl.push(InserirPage);
  }

} 
