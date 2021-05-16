import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../question.service'

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  questions= [];
  allQues;
  isAdded: boolean = false;
  @ViewChild('closebutton') closebutton;
  @ViewChild('ques') ques;
  showClose: boolean = true;
  public innerWidth: any = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;

    if(innerWidth <= 1024){
      this.showClose = false;
    }else{
      this.showClose = true;
    }
  }

  constructor(private queServ: QuestionService) { }

  ngOnInit(): void {
    this.getQues();
  }

  getQues(){
    let ques = localStorage.getItem("que");
    this.allQues = JSON.parse(ques);
    this.queServ.questionList.subscribe(resp => {
      if(resp){
        this.allQues = resp;
      }
    }) 
  }
  
  saveQues(que){
    const newQue = {
      id: this.allQues?.length + 1 || 1,
      ques: que,
      isAdded: this.isAdded
    }
    if (this.allQues){
      this.questions = this.allQues;
    }
    this.questions.push(newQue);
    localStorage.setItem("que", JSON.stringify(this.questions));
    this.closebutton.nativeElement.click();
    this.ques.nativeElement.value = "";
    this.getQues();
  }

  addToWorkSheet(id){
    let arr = [];
    arr = this.allQues.map(item => {
      if(item.id == id){
        return item.isAdded = true;
      }
    });
    localStorage.setItem("que", JSON.stringify(this.allQues));
    this.queServ.questionList.next(this.allQues)
  }

  closeRes(){
    this.queServ.showRes.emit(false);
  }
}
