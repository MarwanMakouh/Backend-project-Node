/**
 * User Model Schema
 * Represents a user in the system
 */
export class User {
  constructor({ id, username, email, password, role, created_at }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.created_at = created_at;
  }

  /**
   * Convert user object to safe format (without password)
   */
  toSafeObject() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      created_at: this.created_at
    };
  }

  /**
   * Convert user object to JSON
   */
  toJSON() {
    return this.toSafeObject();
  }
}
