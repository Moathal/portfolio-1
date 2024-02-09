class ProjectsController < ApplicationController
  
  def index
    @projects = YAML.load_file("#{Rails.root}/data/projects.yml")
  end

  def show
  end
  
  def new
    @project = Project.new
  end

  def create
    projects_data = YAML.load_file("#{Rails.root}/data/projects.yml") || []

    project_params = params.require(:project).permit(:project_name, :project_type, :tech_stack, :description, :mobile_view_img, :desktop_view_img, :link_to_github, :link_to_live_preview)
    new_project = Project.new(project_params)
    projects_data << new_project

    File.open("#{Rails.root}/data/projects.yml", "w") { |file| file.write(projects_data.to_yaml) }

    redirect_to projects_path
  end
end
