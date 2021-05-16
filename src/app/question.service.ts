import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionList = new EventEmitter();
  showRes = new EventEmitter();

  constructor() { }


}
