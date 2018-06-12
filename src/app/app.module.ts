import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { SearchPipe } from '../pipes/search/search';
import { InserirPage } from '../pages/inserir/inserir';
import { EditarPage } from '../pages/editar/editar';
import  { ImagePicker } from '@ionic-native/image-picker';

// var config = {
//   apiKey: "AIzaSyAr477BdWyckl4O5onkXn61t5h3SWTSFco",
//   authDomain: "contatos-1698.firebaseapp.com",
//   databaseURL: "https://contatos-1698.firebaseio.com",
//   projectId: "contatos-1698",
//   storageBucket: "contatos-1698.appspot.com",
//   messagingSenderId: "509407246693"
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InserirPage,
    SearchPipe,
    EditarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InserirPage,
    EditarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker
  ]
})
export class AppModule {}
