import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="projects-nav"
export default class extends Controller {
   connect(e) {
    if (this.element.classList.contains('.selected')) {
      this.handleLoad(e);
    }
  }

  
  switch(e) {
    this.element.addEventListener('htmx:afterOnLoad', this.handleLoad(e));
  }
  
  
  handleLoad = (e) => {
    let currentType = document.querySelector('.projectsNav.selected').id;
    let nav_bttn = e.target;
    let newtype = nav_bttn.id;
    let sect = document.querySelector('#projects');
    let projects = JSON.parse(nav_bttn.getAttribute('data-hx-vals'));
    console.log('Hi this is your object:', projects);
    sect.innerHTML = `<div class="container">${this.projectsList(projects)}</div>`

  }

  projectsList = (projects) => {
    const projectsHtmlList = projects.map(project => {
      return `<div hx-on:click="htmx.toggleClass('#${project.id}-card', 'active')" id="${project.id}-card" class="card">
        <img src="${project.image}">
          <div class="card__head">${project.title}</div>
          <div class="description">${project.description}</div>
      </div>`;
    }).join('');
    return projectsHtmlList;
  }
  
  techStackList = (project) => {
    const tecklist = project.toolslist
			.map((tool) => `<li>${tool}</li>`)
			.join("");
    console.log('toolslist:', tecklist);
    return tecklist;
  }
}
