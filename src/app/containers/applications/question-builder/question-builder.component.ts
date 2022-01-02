import { Component, OnInit, Input } from '@angular/core';
import { IQuestion } from 'src/app/views/app/applications/survey/survey.service';

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styles: []
})
export class QuestionBuilderComponent implements OnInit {
  @Input() question: IQuestion;
  @Input() sort = 99;

  mode = 'preview';
  showDetail = false;
  answerTypes = [
    { label: 'Text Input', value: 0, options: false },
    { label: 'Single Select', value: 1, options: true },
    { label: 'Multiple Select', value: 2, options: true },
    { label: 'Checkbox', value: 3, options: true },
    { label: 'Radiobutton', value: 4, options: true }
  ];

  constructor() { }

  ngOnInit() { }

  changeMode(mode: string) {
    this.mode = mode;
    this.showDetail = true;
  }
  collapseToggle() {
    this.showDetail = !this.showDetail;
  }
  addAnswer() {
    this.question.answers.push({
      value: this.question.answers.length + 1,
      label: ''
    });
  }
  deleteAnswer(value: number) {
    this.question.answers = this.question.answers.filter(
      x => x.value !== value
    );
  }
}
