import { JSDOM } from "jsdom";

type MockFn = {
  (...args: any[]): any;
  calls: any[][];
  returnValue: any;
  mockImplementation: (implementation: () => any) => MockFn;
};

export const createMockFn = (): MockFn => {
  const fn: any = (...args: any[]) => {
    fn.calls.push(args);
    return fn.returnValue;
  };
  fn.calls = [];
  fn.returnValue = undefined;
  fn.mockImplementation = (implementation: () => any) => {
    fn.returnValue = implementation();
    return fn;
  };
  return fn as MockFn;
};
const jsdom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
  runScripts: "dangerously",
});

const { window } = jsdom;
const { document } = window;

declare global {
  namespace NodeJS {
    interface Global {
      window: Window & typeof globalThis;
      document: Document;
      navigator: Navigator;
      HTMLElement: typeof HTMLElement;
      Element: typeof Element;
      Node: typeof Node;
      MouseEvent: typeof MouseEvent;
      getComputedStyle: typeof getComputedStyle;
      requestAnimationFrame: typeof requestAnimationFrame;
      cancelAnimationFrame: typeof cancelAnimationFrame;
    }
  }
}

Object.defineProperties(globalThis, {
  window: {
    value: window,
    writable: true,
  },
  document: {
    value: document,
    writable: true,
  },
  navigator: {
    value: window.navigator,
    writable: true,
  },
});

// Add other required globals
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
global.getComputedStyle = window.getComputedStyle;
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Create Mock Media Query List
interface MockMediaQueryList {
  matches: boolean;
  media: string;
  onchange: null | ((this: MediaQueryList, ev: MediaQueryListEvent) => any);
  addListener: (
    callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  removeListener: (
    callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
  dispatchEvent: (event: Event) => boolean;
}

const createMockMediaQueryList = (): MockMediaQueryList => ({
  matches: false,
  media: "",
  onchange: null,
  addListener: createMockFn(),
  removeListener: createMockFn(),
  addEventListener: createMockFn(),
  removeEventListener: createMockFn(),
  dispatchEvent: createMockFn(),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: createMockFn().mockImplementation(() => createMockMediaQueryList()),
});

export { jsdom, document, window };
