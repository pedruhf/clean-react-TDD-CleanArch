import { SurveyModel } from "@/domain/models";

export interface LoadSurveyList {
  loadAll: () => Promise<void>;
}
