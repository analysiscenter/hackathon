import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useContext } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import "@fontsource/roboto/latin-100.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/material-icons";


import { ChooseTask } from './components/ChooseTask';
import { TaskPage } from './components/TaskPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { AppContext, AppContextProvider } from './AppContext';


function TaskRoutes() : JSX.Element {
    const context = useContext(AppContext);

    return (
        <>
        {Object.keys(context.store.tasks).map(id =>
            <Route key={id} exact path={context.store.tasks[id].link} render={() => <TaskPage task={id} />} />)}
        </>
    )
}

class App extends React.Component {
    render() {
        return (
        <>
        <CssBaseline />

        <AppContextProvider>
        <MemoryRouter>
            <Route exact path="/" component={ChooseTask} />

            <TaskRoutes />

            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            {/* <Route exact path="/profile" component={Profile} /> */}
        </MemoryRouter>
        </AppContextProvider>
        </>
        );
    }
}

export default function render() : void {
    ReactDOM.render(<App />, document.querySelector('#app'));
}
