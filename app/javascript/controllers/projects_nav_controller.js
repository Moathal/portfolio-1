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
    sect.innerHTML = `<div class="container"><div class="cancelling-bg"></div>
      ${this.projectsList(projects)}
    </div>`;
      htmx.process(sect);
  }

  projectsList = (projects) => {
    const projectsHtmlList = projects.map(project => {
      const card = document.createElement("div");
			card.id = `card-${project.id}`;
			card.className = "card";
			card.setAttribute(
				"hx-on:click",
				`htmx.toggleClass('#card-${project.id}', 'active'); 
        htmx.toggleClass('.cancelling-bg', 'active')`
			);
      card.innerHTML = this.cardElements(project);
			
      return card.outerHTML;
      }).join('');
    return projectsHtmlList;
  }

  cardElements = (project) => {
    return `
      <div class="card__head"><h4>${project.title}</h4></div>
      <div class="projectSpec">
      <ul class="tech-stack">${this.techStackList(project)}</ul>
        <img class="ProjectIMG" src="${project.image}">
        <div class="description">${project.description}</div>
      </div>
      <div class="project-actions">
        <div>
        <a></a>
        <a><img class="viewToggler" src="icons&imgs/ProjectMobileView.svg"><a>
        </div>
        <div>
          <a>2</a>
          <a>3</a>
        </div>
      </div>`;
  }
  
  techStackList = (project) => {
    const tecklist = project.toolslist
			.map((tool) => `<li><img src="icons&imgs/${tool}.webp"></img></li>`)
			.join("");
    console.log('toolslist:', tecklist);
    return tecklist;
  }
}
