export interface Token {
  dateLastRequested: Date | null;
  token: string | null;
}

export interface LoginProps {
  id?: string;
  username: string;
  password: string;
}
