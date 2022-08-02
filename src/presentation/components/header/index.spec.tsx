import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";

import { Header } from "@/presentation/components";
import { ApiContext } from "@/presentation/contexts"
import { AccountModel } from "@/domain/models";
import { mockAccount } from "@/domain/test";

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (account = mockAccount()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"]});
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => account,
    }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  );

  return {
    history,
    setCurrentAccountMock,
  };
};

describe('Header Component', () => {
  test('Should call setCurrentAccount with undefined', () => {
    const { history, setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId("logout"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe("/login");
  });

  test('Should render username correctly', () => {
    const account = mockAccount();
    makeSut(account);
    expect(screen.getByTestId("username")).toHaveTextContent(account.name);
  });
});
