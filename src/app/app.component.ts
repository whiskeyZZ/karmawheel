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
  rebirth: string = '';
  rebirth_text: string = '';
  rebirth_image: string = '';
  choosed_answers: number[] = [];

  @ViewChild('img_rotate') rotate!: ElementRef<HTMLImageElement>;
  @ViewChild('fade') fade!: ElementRef<HTMLParagraphElement>;
  @ViewChild('fade_answer', { static: true })
  fade_answer!: ElementRef<HTMLDivElement>;
  @ViewChild('fade_rebirth') rebirth_div!: ElementRef<HTMLDivElement>;

  constructor() {
    this.question = texts['welcome'];
  }

  start() {
    this.welcome = false;

    if (this.rotate) {
      this.rotate.nativeElement.style.transform = 'rotate(360deg)';
    }
    this.nextQuestion(0);
  }

  nextQuestion(choose: number) {
    if (choose != 0) {
      this.choosed_answers.push(choose);
    }
    if (this.i != 12) {
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
    } else {
      this.calcRebirth();
    }
  }

  calcRebirth() {
    console.log(this.rotate);
    this.rotate.nativeElement.style.transform = 'rotate(0deg)';

    this.fade_answer.nativeElement.remove();
    this.fade.nativeElement.remove();
    setTimeout(() => {
      this.question = 'Du erreichst';
      this.rebirth = 'Nirwana';
      this.rebirth_text = texts['Nirwana'];
      this.rebirth_image = 'assets/nirvana.jpeg';
      this.rebirth_div.nativeElement.classList.add('show');
    }, 750);
  }
}
