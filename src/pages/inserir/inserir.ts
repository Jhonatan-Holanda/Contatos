import { Component, ViewChild } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController,ToastController } from 'ionic-angular';
import {HomePage}  from '../home/home';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the InserirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inserir',
  templateUrl: 'inserir.html',
})
export class InserirPage {
  private url:string = "http://localhost:3000/contatos";
  @ViewChild('foto') img;
  public cadastra = {
        nome: "",  
				lugar: "",  
				foto:"",
				email:"",  
				telefone:""
  }
  Cadastro(cadastra){
     if(this.img.value == ""){
       this.cadastra.foto = "../assets/imgs/logo.png"
       console.log(this.cadastra.foto)
     }
    

     let headers = new Headers();
     headers.append('Content-type','application/json');

    let options = new RequestOptions({ headers: headers});
    this.http.post(this.url, cadastra, options)
    .map(res => res.json())
    .subscribe(data => {let toast = this.toastCtrl.create({
        message: 'Salvo Com Sucesso',
        duration: 1000
    });
    toast.present();
    cadastra.curso = "",
    cadastra.tipo = "",
    cadastra.foto = "",
    cadastra.ministrante = "",
    cadastra.horario = "",
    cadastra.local = "",
    cadastra.data = ""

    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 1000
    });
    loader.present();
    this.navCtrl.setRoot(HomePage);
  });
    
  }

  constructor(public navCtrl: NavController,public http:Http,public toastCtrl:ToastController,public loadingCtrl:LoadingController) {
  }

}
