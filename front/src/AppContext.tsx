/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useState } from 'react';
import { ScoreStore } from './stores/scores';


export interface AppContextType {
    store: ScoreStore;

    isAuthenticated : () => boolean;
}

export const AppContext = React.createContext({} as AppContextType);


interface NoProps { }

export const AppContextProvider : React.FunctionComponent = (props: React.PropsWithChildren<NoProps>) => {

    // ===================
    //        Store
    // ===================
    const data = {
        store: new ScoreStore(),
    }

    const other = {
        isAuthenticated : data.store.isAuthenticated,
    }

    // ===================
    //       Context
    // ===================
    const state = {
        ...data,
        ...other,
    }

    return (
      <AppContext.Provider value={state}>
        {props.children}
      </AppContext.Provider>
    )
}
