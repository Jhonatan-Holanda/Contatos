import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Contatos } from '../../model/contatos';
import { LoadingController } from 'ionic-angular';
import { Http, RequestOptions,Headers } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  public id;
  public obg: any;
  public contatos: Contatos;
  public data:any;
  public lugar:string;
  public foto:string;

  @ViewChild('nome') nome;
  @ViewChild('telefone') telefone;
  @ViewChild('email') email;


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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl:LoadingController,public toastCtrl:ToastController,) {
    this.id = navParams.get("id");
    this.contatos = new Contatos();
    this.getEpisodeById(this.id).then(data => {
      this.obg = data;
      this.contatos.id = this.obg.id;
      this.contatos.nome = this.obg.nome;
      this.contatos.lugar = this.obg.lugar;
      this.contatos.foto = this.obg.foto;
      this.contatos.email = this.obg.email;
      this.contatos.telefone = this.obg.telefone;

      
      this.cadastra.lugar =  this.obg.lugar;
      this.cadastra.foto =  this.obg.foto;

      if(this.nome.value == ""){
        this.cadastra.nome = this.obg.nome;
      }
      if(this.telefone.value == ""){
        this.cadastra.telefone = this.obg.telefone;
      }
      if(this.email.value == ""){
        this.cadastra.email = this.obg.email;
      }

      console.log(this.contatos);
    });
  
  }

public cadastra = {
    nome: "",  
    email:"",  
    telefone:"",
    lugar:"",
    foto:""
}
Editar(cadastra){
 
 let headers = new Headers();
 headers.append('Content-type','application/json');

let options = new RequestOptions({ headers: headers});

this.http.put(`http://localhost:3000/contatos/${this.id}`, cadastra, options)
.map(res => res.json())
.subscribe(data => {let toast = this.toastCtrl.create({
    message: 'Salvo Com Sucesso',
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

ionViewDidLoad() {
  console.log('ionViewDidLoad EditarPage');
}

}
