import { AddAccount } from "@/domain/usecases";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl("/signup"), makeAxiosHttpClient());
};
