// custom.d.ts
declare module JSX {
  interface IntrinsicElements {
    'appkit-button': any; // You can replace 'any' with more specific props if you know them
  }
}