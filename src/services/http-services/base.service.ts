import { httpService } from "./http.service";

export abstract class BaseService {
  protected http = httpService;
  protected baseEndpoint: string;

  constructor(endpoint: string) {
    this.baseEndpoint = endpoint;
  }

  withBaseURL(newBaseURL: string) {
    this.http = httpService.withBaseURL(newBaseURL);
    return this;
  }
}
