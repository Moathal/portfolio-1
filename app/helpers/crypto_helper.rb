class CryptoHelper
  ALGORITHM = 'AES-256-CBC'.freeze

  def self.encrypt(password)
    cipher = OpenSSL::Cipher.new(ALGORITHM)
    cipher.encrypt
    cipher.key = Digest::SHA256.digest(Rails.application.credentials.ENCRYPTION_KEY)
    iv = cipher.random_iv
    encrypted = cipher.update(password) + cipher.final
    Base64.strict_encode64(iv + encrypted)
  end

  def self.decrypt(encrypted_password)
    encrypted_data = Base64.strict_decode64(encrypted_password)
    cipher = OpenSSL::Cipher.new(ALGORITHM)
    cipher.decrypt
    cipher.key = Digest::SHA256.digest(Rails.application.credentials.ENCRYPTION_KEY)
    iv = encrypted_data.slice!(0, cipher.iv_len)
    cipher.iv = iv
    decrypted = cipher.update(encrypted_data) + cipher.final
    decrypted
  end
end
