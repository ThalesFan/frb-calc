/// <reference types="Cypress" />
import { Calculator } from "../../page-objects/calculator.page";

describe("Calculator", () => {
  let calc = new Calculator();

  before(() => {
    calc.visit();
  });

  it("Should add", () => {
    calc.enter(["1", "+", "4", "="]);

    calc.display().should("have.value", "5");
  });

  it("Should subtract", () => {
    calc.enter(["12", "-", "6", "="]);
    calc.display().should("have.value", "6");
  });

  it("Should follow order of operations", () => {
    calc.enter(["(", "14", "-", "2", ")", "*", "2", "="]);

    calc.display().should("not.have.value", "20");
  });

  it("Should solve trigonometric functions", () => {
    calc.enter([
      //sin automatically adds left paranthesis
      "sin",
      "30",
      ")",
      "=",
    ]);

    calc.display().should("have.value", 0.5);
  });

  it("Should record correct history", () => {
    calc.history().should("have.length", "4");

    const correctHistory = ["5", "6", "24", "0.5"];

    correctHistory.reverse().forEach((value, line) => {
      calc.history().eq(line).find("p.r").should("have.attr", "title", value);
    });
  });

  afterEach(() => {
    calc.clear();
  });
});
