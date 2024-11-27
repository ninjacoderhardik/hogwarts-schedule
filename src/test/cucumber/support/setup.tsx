import { Before, After } from "@cucumber/cucumber";
import { cleanup, configure } from "@testing-library/react";
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  runScripts: 'dangerously'
});

// Cast window to fix type error
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// These are needed for React Testing Library
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.MouseEvent = dom.window.MouseEvent;
global.getComputedStyle = dom.window.getComputedStyle;

Before(function () {
  configure({ testIdAttribute: "data-testid" });
});

After(function () {
  cleanup();
  // Clean up document body between tests
  document.body.innerHTML = "";
});

module.exports = { dom };
