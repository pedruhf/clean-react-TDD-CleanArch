import { Authentication } from "@/domain/usecases";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemotheAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl("/login"), makeAxiosHttpClient());
};
