export const debugDOM = () => {
  console.log('Document body:', document.body.innerHTML);
  console.log('Available test IDs:', 
    Array.from(document.querySelectorAll('[data-testid]'))
      .map(el => ({
        id: el.getAttribute('data-testid'),
        text: el.textContent
      }))
  );
};