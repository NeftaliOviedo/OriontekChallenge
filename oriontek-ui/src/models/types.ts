export interface Address {
    _id?: string;
    street: string;
    city: string;
    state: string;
    client?: string;
  }
  
  // Client Interface
  export interface Client {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    addresses?: Address[];
  }
  