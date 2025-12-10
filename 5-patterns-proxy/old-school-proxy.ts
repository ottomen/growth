// Common interface needed
interface IStorage {
  getData(role: ERole): Map<string, any> | null;
  setData(key: string, value: any, role: ERole): void;
}

enum ERole {
  Admin = 'Admin',
  User = 'User'
}

// Subject
class SessionStorage implements IStorage {
  private data: Map<string, any>;

  constructor() {
    this.data = new Map();
  }

  public getData(): Map<string, any> {
    return this.data;
  }

  public setData(key: string, value: any): void {
    this.data.set(key, value);
  }
}

// In the classical Proxy design pattern, the Proxy object must follow the same shape (interface)
// Protection Proxy
class SessionStorageProxy implements IStorage {
  constructor(private storage: SessionStorage = storage) { }

  private checkAccess(role: ERole) {
    return role === ERole.Admin;
  }

  public getData(role: ERole) {
    if (this.checkAccess(role)) {
      return this.storage.getData();
    } else {
      console.log('Access denied.');
      return null;
    }
  }

  public setData(key: string, value: [], role: ERole) {
    if (this.checkAccess(role)) {
      this.storage.setData(key, value);
    } else {
      console.log('Access denied.');
    }
  }
}

const session = new SessionStorage();
const sessionProxy = new SessionStorageProxy(session);

session.setData(crypto.randomUUID(), {
  createdAt: new Date().toISOString()
})

// Denied
console.log(sessionProxy.getData(ERole.User));
// Allowed
console.log(sessionProxy.getData(ERole.Admin));

