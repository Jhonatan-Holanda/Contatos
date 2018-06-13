import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Contatos } from '../../model/contatos';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the DetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {
  public id;
  public obg: any;
  public contatos: Contatos;
  public data:any;

  getEpisodeById(id: number) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http
        .get(`http://localhost:3000/contatos/${id}`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController) {
    this.id = navParams.get("id");
    this.contatos = new Contatos();
    console.log(this.id);
    this.getEpisodeById(this.id).then(data => {
      this.obg = data;
      this.contatos.id = this.obg.id;
      this.contatos.nome = this.obg.nome;
      this.contatos.lugar = this.obg.lugar;
      this.contatos.foto = this.obg.foto;
      this.contatos.email = this.obg.email;
      this.contatos.telefone = this.obg.telefone;
      console.log(this.contatos);
    });
  }

  getId(id:number){
    this.navCtrl.push("EditarPage", {
      id: id
    })
  }
  
  excluir(id:number){

    id = this.navParams.get("id");

    this.http.delete(`http://localhost:3000/contatos/${id}`)
    .map(res => res.json())
    .subscribe(data => {let toast = this.toastCtrl.create({
        message: 'Deletar Com Sucesso',
        duration: 1000
    });
    toast.present();
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 1000
    });
    loader.present();
    this.navCtrl.setRoot(HomePage);
  });
  }
}
