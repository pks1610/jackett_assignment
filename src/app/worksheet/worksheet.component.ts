import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../question.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent implements OnInit {
  questions = [];
  addedQues = [];
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(private queServ: QuestionService) { 
    this.addedQues = JSON.parse(localStorage.getItem("que"));
    this.setQuestions(this.addedQues);
    queServ.questionList.subscribe(resp => {
      if(resp){
        this.addedQues = resp;
        this.setQuestions(this.addedQues);
      }
    }) 
  }

  ngOnInit(): void {
  }

  setQuestions(ques){
    this.questions = ques?.filter(item => {
      if(item.isAdded == true){
        return item;
      }
    })
  }

  removeQues(id){
    let arr = [];
    arr = this.addedQues.map(item => {
      if(item.id == id){
        return item.isAdded = false;
      }
    });
    localStorage.setItem("que", JSON.stringify(this.addedQues));
    this.queServ.questionList.next(this.addedQues)
  }
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }

}
