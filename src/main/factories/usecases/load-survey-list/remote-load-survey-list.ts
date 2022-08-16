import { RemoteLoadSurveyList } from "@/data/usecases";
import { LoadSurveyList } from "@/domain/usecases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl("/surveys"), makeAuthorizeHttpClientDecorator());
};
