import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  //it's for resetting the display after using a oneNbOperation
  //and inputting a number  
  oneNbOperationDisplayed = false;
  isRadianMode = true;


  constructor() { }

  ngOnInit(): void {
  }

  public getNumber(v: string)
  {
    console.log(v)
    if (this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }
    else if (this.oneNbOperationDisplayed) {
      this.currentNumber = v;
      this.oneNbOperationDisplayed = false;
      this.firstOperand = null;
    }
    else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  getDecimal()
  {
    if (!this.currentNumber.includes('.'))
    {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op:string, secondOp)
  {
    switch (op){
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '!':
        return this.firstOperand = factorial(this.firstOperand); 
      case '=':
        return secondOp;
    }
  }

  public getOperation(op: string)
  {
    console.log(op);
    
    if (this.firstOperand === null)
    {
      this.firstOperand = Number(this.currentNumber);
    }
    else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
  }

  public getOneNbOperation(op: string)
  {
    console.log(op);
    if (this.firstOperand === null)
    {
      this.firstOperand = Number(this.currentNumber);
    }
    if (op === '!') {
      const result = factorial(this.firstOperand);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    else if (op === 'log2') {
      const result = Math.log2(this.firstOperand);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    else if (op === 'ln') {
      const result = Math.log(this.firstOperand);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    else if (op === 'sqrt') {
      const result = Math.sqrt(this.firstOperand);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    else if (op === 'cos') {
      let result;
      if (this.isRadianMode)
      {
        result = Math.cos(this.firstOperand);
      }
      else {
        result = Math.cos(this.firstOperand * Math.PI / 180);
      }
      console.log(`the result is: ${result}`);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    else if (op === 'sin') {
      let result;
      if (this.isRadianMode)
      {
        result = Math.sin(this.firstOperand);
      }
      else {
        result = Math.sin(this.firstOperand * Math.PI / 180);
      }
      console.log(`the result is: ${result}`);
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.oneNbOperationDisplayed = true;
  }

  public clear()
  {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }


  colourButtonRad = 'primary';
  colourButtonDeg = 'basic';
  public setRadMode(bool:boolean)
  {
    console.log(bool);
    this.isRadianMode = bool;
    console.log(this.isRadianMode);

    //changes the colours of the buttons
    if (bool) 
    {
      this.colourButtonRad = 'primary';
      this.colourButtonDeg = 'basic';
    }
    else {
      this.colourButtonRad = 'basic';
      this.colourButtonDeg = 'primary';
    }
  }

}

function factorial(nb:number): number {return nb > 1 ? nb * factorial(nb-1) : 1}

