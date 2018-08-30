import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public tts: TextToSpeech) {

  }
  say(name){
    this.tts.speak(name)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

}
