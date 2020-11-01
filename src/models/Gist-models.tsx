export interface GistType {
  owner: {
    avatar_url: string;
  };
  id: string;
  files: {
    [key: string]: {
      filename: string;
    };
  };
}

export interface ActiveGist {
  id: string;
  avatarUrl: string;
}