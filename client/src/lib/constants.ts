export type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  updatedAt: Date;
  createdAt: Date;
  authorEmail: string;
};

export type Auth = {
  name: string;
  email: string;
  accessToken: string;
};
