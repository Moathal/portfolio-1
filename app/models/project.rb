require 'securerandom'

class Project
  ATTRIBUTES = [:id, :title, :image, :imageMin, :description, :descriptionMin, :toolslist, :liveLink, :sourceLink, :type]

  ATTRIBUTES.each do |attr|
    define_method(attr) do
      instance_variable_get("@#{attr}")
    end
  end

  def initialize(attributes = {})
    ATTRIBUTES.each do |attr|
      instance_variable_set("@#{attr}", attributes[attr.to_s])
    end
  end
  
  def self.create(attributes = {})
    project = new(attributes)
    project.save
    project
  end

  def self.all
    projects_data['projects'].nil? ? [] : projects_data['projects'].map { |attributes| new(attributes) }
  end

  def self.find(index)
    new(projects_data['projects'][index.to_i])
  end

  def save
    attributes['id'] ||= generate_id
    projects_data['projects'] << attributes
    write_to_yaml_file
  end

  def update(attributes)
    ATTRIBUTES.each do |attr|
      instance_variable_set("@#{attr}", attributes[attr.to_s])
    end
    write_to_yaml_file
  end

  def destroy
    projects_data['projects'].delete(attributes)
    write_to_yaml_file
  end

  private

  def generate_id
    SecureRandom.uuid
  end
  
  def self.projects_data
    YAML.load_file("#{Rails.root}/app/data/projects.yml") || { 'projects' => [] }
  end

  def write_to_yaml_file
    File.open("#{Rails.root}/app/data/projects.yml", "w") { |file| file.write(projects_data.to_yaml) }
  end
end
