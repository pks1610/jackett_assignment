import { Component, HostListener } from '@angular/core';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showResource: boolean = true;
  public innerWidth: any =  window.innerWidth;

  constructor(private queServ: QuestionService){
    queServ.showRes.subscribe(resp => {
      this.showResource = resp;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;

    if(innerWidth <= 1024){
      this.showResource = false;
    }else{
      this.showResource = true;
    }
  }

}
