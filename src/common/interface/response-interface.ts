export interface IResponse {
  data: Partial<IData>;
}

export interface IData {
  status: boolean;
  statusText: string;
  message: string;
  jwt: string;
  user: Record<string, unknown> & { metadata: { categories: string[] } };
  refresh_token?: string;
}
