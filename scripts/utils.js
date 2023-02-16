export const createElement = (tagName, tagClass, textContent) => {
  const element = document.createElement(tagName);
  element.classList.add(tagClass);
  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
