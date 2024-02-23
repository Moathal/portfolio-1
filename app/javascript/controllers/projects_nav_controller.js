import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="projects-nav"
export default class extends Controller {
  switch() {
    this.element.addEventListener('htmx:afterOnLoad', this.handleLoad);
  }

  handleLoad = (e) => {
    let currentType = document.querySelector('.type.selected').id;
    let nav_bttn = e.element;
    let newtype = nav_bttn.id;
    let sect = document.querySelector('#projects');
    let projects = JSON.parse(nav_bttn.getAttribute('hx-vals'));
    sect.innerHTML = `<div class="container">${projectsList(projects)}</div>`

  }

  projectsList = (projects) => {
    return projects.forEach(project => {
      ` <img src="${project.desc_image}">
        <div class="card__head">${project.name}</div>`
    });
  }
}
