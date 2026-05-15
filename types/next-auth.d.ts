import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    isAdmin: boolean;
    isUser: boolean;
    whatsapp?: string;
  }
  interface Session {
    user: User & {
      id?: string;
      isAdmin?: boolean;
      isUser?: boolean;
      whatsapp?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    isUser?: boolean;
    whatsapp?: string;
  }
}
