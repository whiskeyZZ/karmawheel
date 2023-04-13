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
  answers: number[] = [];
  intro_text: string = '';

  @ViewChild('img_rotate') rotate!: ElementRef<HTMLImageElement>;
  @ViewChild('fade') fade!: ElementRef<HTMLParagraphElement>;
  @ViewChild('fade_answer', { static: true })
  fade_answer!: ElementRef<HTMLDivElement>;
  @ViewChild('fade_rebirth') rebirth_div!: ElementRef<HTMLDivElement>;
  @ViewChild('info_rebirth') info_rebirth!: ElementRef<HTMLDivElement>;

  constructor() {
    this.question = texts['welcome'];
  }

  start() {
    this.welcome = false;

    if (this.rotate) {
      this.rotate.nativeElement.style.transform = 'rotate(720deg)';
    }
    this.nextQuestion(0);
  }

  nextQuestion(choose: number) {
    if (choose != 0) {
      this.answers.push(choose);
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
      this.setRebirth();
    }
  }

  setRebirth() {
    this.rotate.nativeElement.style.transform = 'rotate(1080deg)';

    this.fade_answer.nativeElement.remove();
    this.fade.nativeElement.remove();
    this.intro_text = 'Deine Wiedergeburt ist...';
    setTimeout(() => {
      this.calcRebirth();
      this.rebirth_div.nativeElement.classList.add('show');
    }, 750);
  }

  calcRebirth() {
    if (this.answers[1] == 1 && this.answers[2] == 4 && this.answers[10] == 1) {
      this.rebirth = 'Cholera Bakterie';
      this.rebirth_text = texts['Cholera'];
    } else if (
      this.answers[1] == 1 ||
      this.answers[2] == 4 ||
      this.answers[10] == 1
    ) {
      this.rebirth = 'Höllenwesen';
      this.rebirth_text = texts['Höllenwesen'];
    } else if (this.answers[1] == 2 && this.answers[2] == 1) {
      this.rebirth = 'Ochse';
      this.rebirth_text = texts['Ochse'];
    } else if (
      (this.answers[1] == 2 &&
        (this.answers[2] == 2 || this.answers[2] == 3)) ||
      this.answers[6] == 2
    ) {
      this.rebirth = 'Mensch';
      this.rebirth_text = texts['Mensch'];
    } else if (this.answers[6] == 1) {
      this.rebirth = 'Oktopus';
      this.rebirth_text = texts['Oktopus'];
    } else if (this.answers[6] == 4) {
      this.rebirth = 'Tukan';
      this.rebirth_text = texts['Tukan'];
    } else if (this.answers[6] == 3) {
      this.rebirth = 'Katze';
      this.rebirth_text = texts['Katze'];
    }
    if (
      (this.answers[0] == 3 || this.answers[0] == 4) &&
      this.answers[1] == 4 &&
      this.answers[5] == 4
    ) {
      this.rebirth = 'Nirwana';
      this.rebirth_text = texts['Nirwana'];
    }
  }
}
