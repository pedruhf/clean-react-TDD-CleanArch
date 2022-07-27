import { RemoteLoadSurveyList } from "@/data/usecases";
import { LoadSurveyList } from "@/domain/usecases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpGetClientDecorator } from "@/main/factories/decorators";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl("/surveys"), makeAuthorizeHttpGetClientDecorator());
};
