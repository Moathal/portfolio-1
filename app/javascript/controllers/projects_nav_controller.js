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
    sect.innerHTML = `<div class="container">
                        <div class="cancelling-bg" hx-on:click="document.querySelectorAll('.active').forEach(function(element) {
                           element.classList.remove('active');
                          })">
                        </div>
                        ${this.projectsList(projects)}
                      </div>`;
      htmx.process(sect);
  }

  projectsList = (projects) => {
    const projectsHtmlList = projects.map(project => {
      const card = document.createElement("div");
			card.id = `card-${project.id}`;
			card.className = "card";
			card.setAttribute("hx-on:click",`htmx.toggleClass('#card-${project.id}', 'active'); htmx.toggleClass('.cancelling-bg', 'active')`);
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
        <img id="img-${project.id}" class="ProjectIMG" src="${project.image}">
        <div class="description">${project.description}</div>
      </div>
      <div class="project-actions">
        <a id="cardFlip${project.id}" class="projectViewToggler" 
                                      data-controller="project-image-flipper"
                                      data-action="click->project-image-flipper#flipImage"
                                      hx-vals=${JSON.stringify([
																				project.image,
																				project.imageMin,
																			])}>
        </a>
        <div>
          <a class="goToGithub" href="${project.sourceLink}"></a>
          <a class="goToLive" href="${project.liveLink}"></a>
        </div>
      </div>`;
  }
  
  techStackList = (project) => {
    const tecklist = project.toolslist
			.map((tool) => `<li><img src="icons&imgs/${tool}.webp" alt"${tool}"></li>`)
			.join("");
    return tecklist;
  }
}
