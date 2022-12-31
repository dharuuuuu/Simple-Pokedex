/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */
class title extends HTMLElement {
  connectedCallback() {
    this.render();
  }
   
  // eslint-disable-next-line require-jsdoc
  render() {
    this.innerHTML = `<h1><img src="https://www.freepnglogos.com/download/1428" alt="title"></h1>`;
  }
}
   
customElements.define('title-image', title);
