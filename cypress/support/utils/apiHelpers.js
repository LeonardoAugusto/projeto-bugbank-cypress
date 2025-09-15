export class ApiHelpers {
  static createUserViaAPI(userData) {
    return cy.request({
      method: 'POST',
      url: '/api/users',
      body: userData,
      failOnStatusCode: false
    });
  }

  static deleteUserViaAPI(userId) {
    return cy.request({
      method: 'DELETE',
      url: `/api/users/${userId}`,
      failOnStatusCode: false
    });
  }

  static getUserBalance(userId) {
    return cy.request({
      method: 'GET',
      url: `/api/users/${userId}/balance`,
      failOnStatusCode: false
    });
  }

  static cleanDatabase() {
    return cy.request({
      method: 'DELETE',
      url: '/api/test-data/cleanup',
      failOnStatusCode: false
    });
  }
}