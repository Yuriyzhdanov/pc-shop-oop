function h(tagName, attrs, text, children, listener) {
  const el = document.createElement(tagName)
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
  el.textContent = text
  if (children) {
    children.forEach(child => el.appendChild(child))
  }
  el.onclick = listener
  return el
}

export default h
