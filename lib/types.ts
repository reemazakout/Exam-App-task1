export interface CustomUser {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
  }
  
  declare module "next-auth" {
    interface Session {
      user: CustomUser & {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        role: string;
      };
    }
  }
  