import { Component, ElementRef, ViewChild } from '@angular/core';
import texts from './texts.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'karma_wheel';
  question: string = '';
  welcome: boolean = true;
  i: number = 0;
  first_answer: string = '';
  second_answer: string = '';
  third_answer: string = '';
  fourth_answer: string = '';

  @ViewChild('img_rotate') rotate!: ElementRef<HTMLImageElement>;
  @ViewChild('fade') fade!: ElementRef<HTMLParagraphElement>;
  @ViewChild('fade_answer', { static: true })
  fade_answer!: ElementRef<HTMLDivElement>;

  constructor() {
    this.question = texts['welcome'];
  }

  start() {
    this.welcome = false;

    if (this.rotate) {
      this.rotate.nativeElement.style.transform = 'rotate(360deg)';
    }
    this.nextQuestion();
  }

  nextQuestion() {
    console.log(this.i);
    this.fade.nativeElement.classList.remove('show');
    this.fade.nativeElement.classList.add('hide');
    this.fade_answer.nativeElement.classList.remove('show');
    this.fade_answer.nativeElement.classList.add('hide');
    setTimeout(() => {
      this.question = texts['questions'][this.i]['question'];
      this.first_answer = texts['questions'][this.i]['answer'][0];
      this.second_answer = texts['questions'][this.i]['answer'][1];
      this.third_answer = texts['questions'][this.i]['answer'][2];
      this.fourth_answer = texts['questions'][this.i]['answer'][3];
      this.fade.nativeElement.classList.remove('hide');
      this.fade.nativeElement.classList.add('show');
      this.fade_answer.nativeElement.classList.remove('hide');
      this.fade_answer.nativeElement.classList.add('show');
      this.i++;
    }, 500);
  }
}
