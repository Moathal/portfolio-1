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
			return `
      <div hx-on:click="htmx.toggleClass('#${
				project.id
			}-card', 'active')" id="${project.id}-card" class="card">
      <div class="card__head"><h4>${
				project.title
			}</h4> <img class="viewToggler" src="icons&imgs/ProjectMobileView.svg"></img></div>
      <div class="projectSpec">
      <ul class="tech-stack">${this.techStackList(project)}</ul>
        <img class="ProjectIMG" src="${project.image}">
        <div class="description">${project.description}</div>
      </div>
      <div class="project-actions"><button>1</button><button>2</button><button>3</button></div>
      </div>`;
		}).join('');
    return projectsHtmlList;
  }
  
  techStackList = (project) => {
    const tecklist = project.toolslist
			.map((tool) => `<li><img src="icons&imgs/${tool}.webp"></img></li>`)
			.join("");
    console.log('toolslist:', tecklist);
    return tecklist;
  }
}
