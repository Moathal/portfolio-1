require 'yaml'
require_relative "#{Rails.root}/app/incription/crypto_helper"

class PasswordManager
  PASSWORD_FILE_PATH = "#{Rails.root}/app/data/projects.yml"

  def self.ensure_password_exists
    return if password_exists?

    encrypted_password = CryptoHelper.encrypt(Rails.application.credentials.PASSWORD)

    data = YAML.load_file(PASSWORD_FILE_PATH) || {}
    data['password'] = encrypted_password

    File.open(PASSWORD_FILE_PATH, 'w') { |file| file.write(data.to_yaml) }
  end

  def self.password_exists?
    return false unless File.exist?(PASSWORD_FILE_PATH)

    password_data = YAML.load_file(PASSWORD_FILE_PATH)
    password_data && password_data['password'].present?
  end

  def self.load_encrypted_password
    return unless password_exists?

    password_data = YAML.load_file(PASSWORD_FILE_PATH)
    password_data['password']
  end
end

PasswordManager.ensure_password_exists
