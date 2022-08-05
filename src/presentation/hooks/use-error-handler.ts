import { AccessDeniedError } from "@/domain/errors";
import { useLogout } from "@/presentation/hooks";

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const handleLogout = useLogout();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      handleLogout();
    } else {
      callback(error);
    }
  };
}
