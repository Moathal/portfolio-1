import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  flipImage(event) {
    event.stopPropagation();
		let id = this.element.id.slice(8);
		let project = JSON.parse(this.element.getAttribute("hx-vals"));
		let isMobile = this.element.classList.toggle("mobile");
		this.changeProjectView(id, isMobile, project);
	}

	changeProjectView = (id, isMobile, project) => {
		let projectImg = document.getElementById(`img-${id}`);
		projectImg.classList.toggle("mobile", isMobile);
		projectImg.src = isMobile ? project[1] : project[0];
	};
}
