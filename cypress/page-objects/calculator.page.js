/// <reference types = "Cypress"/>
export class Calculator {
  visit() {
    cy.visit("https://web2.0calc.com/");
  }

  /**
   * Enters expression to the calculator
   * The expression is an array of terms which will be entered to the calculator.
   *
   * Every term must be separated, with the exception of number which can be joined together
   * as such: "123" (instead of ["1","2","3"])
   *
   * NOTE: to calculate the expression: add "=" as the final term
   * @param {string[]} expression
   */
  enter(expression) {
    for (let term of expression) {
      term = term.toLowerCase();

      if (!isNaN(term) && term.toString().length > 1) {
        for (const digit of term) this.getEl(digit).click();
        continue;
      }

      this.getEl(term).click();
    }
  }

  /**
   *
   * @returns The DOM elements rows of the history panel
   */
  history() {
    let hist = cy.get("#histframe");
    hist.invoke("hasClass", "open").then((open) => {
      if (!open) cy.get("#hist").click();
    });

    return cy.get("#histframe ul>li");
  }

  /**
   * Get the displayed number on the calculator
   */
  display() {
    return cy.get("#input");
  }

  /**
   * Clears the calculator display
   */
  clear() {
    this.getEl("c").click();
  }


  /**
   * Get DOM element that matches given string
   *
   * @param {string} identity string matching the DOM element
   * @returns DOM element
   *
   * @example
   *  calc.getEl("+")
   *  calc.getEl("8")
   *  calc.getEl("(")
   */
  getEl(identity) {
    //Digits
    if (!isNaN(identity) && identity.toString().length == 1)
      return cy.get("#Btn" + identity);

    switch (identity) {
      //Simple operators
      case "+":
        return cy.get("#BtnPlus");
      case "-":
        return cy.get("#BtnMinus");
      case "*":
        return cy.get("#BtnMult");
      case "/":
        return cy.get("#BtnDiv");

      //Function keys
      case "(":
        return cy.get("#BtnParanL");
      case ",":
        return cy.get("BtnColon");
      case ")":
        return cy.get("#BtnParanR");

      case "sin":
        return cy.get("#BtnSin");
      case "cos":
        return cy.get("#BtnCos");
      case "tan":
        return cy.get("#BtnTan");
      case "ncr":
        return cy.get("#BtnNcR");
      case "sin":
        return cy.get("#BtnSinh");
      case "cosh":
        return cy.get("#BtnCosh");
      case "tanh":
        return cy.get("#BtnTanh");

      //More buttons should be located.

      case "c":
        return cy.get("#BtnClear");

      case "=":
        return cy.get("#BtnCalc");
    }
  }
}
