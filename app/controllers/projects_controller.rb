class ProjectsController < ApplicationController
  def index
    @projects = Project.all
    @frontend_projects = @projects.select { |project| project.type == 'front-end' }
    @fullstack_projects = @projects.select { |project| project.type == 'full-stack' }
    @backend_projects = @projects.select { |project| project.type == 'back-end' }
  end


  def show
    @project = Project.find(params[:id])
  end
  
  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      flash[:success] = "Project was added successfully!"
      redirect_to projects_path
    else
      flash[:error] = "Something went wrong"
      render :new
    end
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      flash[:success] = "Project was updated successfully!"
      redirect_to projects_path
    else
      flash[:error] = "Something went wrong"
      render :edit
    end
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      flash[:notice] = "Project was deleted successfully"
    else
      flash[:error] = "Something went wrong"
    end
    redirect_to projects_path
  end

  def upload_photo
    project = find_project(params[:id])
    photo = params[:photo]
    photo_type = params[:photo_type]
    if photo
      filename = "#{project.name}_#{project.id}_#{photo_type}"
      filepath = Rails.root.join('public', 'icons&Imgs', filename)
      File.open(filepath, 'wb') { |file| file.write(photo.read) }
      project.update(photo_path: "/uploads/icons&Imgs/#{filename}")
      flash[:success] = 'Photo uploaded successfully.'
    else
      flash[:error] = 'No photo uploaded.'
    end
    redirect_to projects_path
  end


  private

  def project_params
    params.require(:project).permit(:title, :type, :toolslist, :description, :descriptionMin, :image, :imageMin, :sourceLink, :liveLink)
  end
end
