import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items:any;
  constructor(public navCtrl: NavController,public tts: TextToSpeech,public api:ApiProvider,public storage:Storage) {
    this.items=[];
    this.api.getItemsByScreen('First').then((val)=>{
      console.log('first');
      console.log(val);
      this.items=val;
    }).catch((error)=>{
      console.log(error);
    });
    this.storage.get('items').then((val)=>{
      if(val==null){
        this.api.getItems().then((data)=>{
          this.storage.set('items',data);
          console.log('NEW');
          console.log(data);
        }).catch(error=>console.log(error));
      }else{
        console.log('OLD');
        console.log(val);
      }
    }).catch((error)=>{
      console.log(error);
      this.api.getItems().then((data)=>{
        this.storage.set('items',data);
        console.log('NEW');
        console.log(data);
      }).catch(error=>console.log(error));
    });
   
  }
  say(name){
    this.tts.speak(name)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

}
