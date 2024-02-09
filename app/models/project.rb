class Project
  attr_accessor :project_name, :project_type, :tech_stack, :description, :mobile_view_img, :desktop_view_img, :link_to_github, :link_to_live_preview

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end
end