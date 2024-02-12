require 'securerandom'

class Project
  attr_reader :attributes

  def initialize(attributes = {})
    @attributes = attributes
  end
  
  def self.create(attributes = {})
    project = new(attributes)
    project.save
    project
  end

  def self.all
    projects_data['projects'].map { |attributes| new(attributes) }
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
    @attributes.merge!(attributes)
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
    YAML.load_file("#{Rails.root}/data/projects.yml") || { 'projects' => [] }
  end

  def write_to_yaml_file
    File.open("#{Rails.root}/data/projects.yml", "w") { |file| file.write(projects_data.to_yaml) }
  end
end
