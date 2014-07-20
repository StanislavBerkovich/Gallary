class Picture < ActiveRecord::Base
  has_attached_file :image,
                    :storage => :dropbox,
                    :dropbox_credentials => "#{Rails.root}/config/dropbox_config.yml",
                    :dropbox_options => {
                        :path => proc { |style| "#{style}/#{id}_#{image.original_filename}" },
                        :unique_filename => true
                    },
                    :styles => {:medium => "300x300>", :thumb => "100x100>"}
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end
