class ProjectsController < ApplicationController
  def index
    @projects = Project.all
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
      filepath = Rails.root.join('public', 'portfolioImgs', filename)
      File.open(filepath, 'wb') { |file| file.write(photo.read) }
      project.update(photo_path: "/uploads/portfolioImgs/#{filename}")
      flash[:success] = 'Photo uploaded successfully.'
    else
      flash[:error] = 'No photo uploaded.'
    end
    redirect_to projects_path
  end


  private

  def project_params
    params.require(:project).permit(:project_name, :project_type, :tech_stack, :description, :mobile_view_img, :desktop_view_img, :link_to_github, :link_to_live_preview)
  end
end
