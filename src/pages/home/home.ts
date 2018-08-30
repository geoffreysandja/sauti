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
  all_items:any;
  stack_item:any;
  constructor(public navCtrl: NavController,public tts: TextToSpeech,public api:ApiProvider,public storage:Storage) {
    this.items=[];
    this.all_items=[];
    this.stack_item=[];
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
          this.all_items=data;
        }).catch(error=>console.log(error));
      }else{
        console.log('OLD');
        console.log(val);
        this.all_items=val;
      }
    }).catch((error)=>{
      console.log(error);
      this.api.getItems().then((data)=>{
        this.storage.set('items',data);
        console.log('NEW');
        console.log(data);
        this.all_items=data;
      }).catch(error=>console.log(error));
    });
   
  }
  populateGrid(item_name,screen_name,is_back){
    console.log('item name:'+item_name);
    for(var i=0;i<this.all_items.length;i++){
      if(this.all_items[i][item_name]){
        this.items=this.all_items[i][item_name];
        if(is_back==false){
          this.stack_item.push(screen_name);
        }
        console.log(this.all_items[i][item_name])
        break;
      }
    }
  }
  Back(){
    var screen_name=this.stack_item.pop();
    this.populateGrid(screen_name,"",true);
  }
  say(name,screen){
    this.tts.speak(name)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
    this.populateGrid(name,screen,false);
  }

}
