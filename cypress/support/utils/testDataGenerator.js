export class TestDataGenerator {
  static generateRandomUser() {
    const timestamp = Date.now();
    return {
      email: `user${timestamp}@teste.com`,
      name: `Usuario Teste ${timestamp}`,
      password: 'Teste123!',
      confirmPassword: 'Teste123!'
    };
  }

  static generateRandomTransfer() {
    return {
      accountNumber: Math.floor(Math.random() * 99999).toString(),
      digit: Math.floor(Math.random() * 9).toString(),
      value: Math.floor(Math.random() * 500) + 50, // Entre 50 e 550
      description: `Transfer ${Date.now()}`
    };
  }

  static generateInvalidEmails() {
    return [
      'email-sem-arroba.com',
      '@dominio.com',
      'email@',
      'email@.com',
      'email..duplo@teste.com',
      'email com espaço@teste.com'
    ];
  }

  static generateWeakPasswords() {
    return [
      '123',        // Muito curta
      '12345678',   // Sem caracteres especiais
      'password',   // Muito comum
      'SENHA',      // Só maiúsculas
      'senha'       // Só minúsculas
    ];
  }
}