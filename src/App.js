import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory} from "react-router-dom";

import AuthPage from "./Pages/Auth";
import OptionsPage from "./Pages/Options";
import GuildsListPage from "./Pages/GuildsList";
import ManageGuildPage from "./Pages/ManageGuild";
import HomePage from './Pages/Home';

import Parent from './Pages/Test';

const buildSettings = require('./buildSettings.json');

function App() {
    const history = useHistory();
    const [serverError, setServerError] = useState(false);
    let User = JSON.parse(localStorage.getItem('user') || "{}");

    const Token = localStorage.getItem('uuid');

    const translations = require('./translations.default');
    const lang = localStorage.getItem('lang') || 'pl';

    useEffect(() => {
        const CheckIfServerIsOnline = async () => {
            try {
                const res = await fetch(`${buildSettings.settings.serverUrl}/api/alive`);
                if (res.status != 200) setServerError(true);
                else setServerError(false);
            } catch (err) {
                setServerError(true);
            }
        }
        CheckIfServerIsOnline();
        setInterval(() => CheckIfServerIsOnline(), 15000);

        /*
                FETCH TOKEN
                CHECK TOKEN LIFETIME
                IF TOKEN LIFETIME IS < HOUR:
                    DELETE USER
                    ASK TO DELETE ACCESS TOKEN FROM THE SERVER DB
         */
    }, []);

    return (
        <>
            {
                serverError
                    ?
                    <div style={{
                        zIndex: 100044343,
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'red',
                        color: 'white',
                        textAlign: 'center',
                        paddingTop: 5,
                        paddingBottom: 5
                    }}>
                      <span>
                          {translations.connection_error[lang]}
                      </span>
                    </div>
                    :
                    null
            }

            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route path="/auth">
                    <AuthPage/>
                </Route>
                <Route path="/options">
                    <OptionsPage/>
                </Route>
                <Route path="/dashboard">
                    <GuildsListPage/>
                </Route>
                <Route path="/guild/:guild_id">
                    <ManageGuildPage/>
                </Route>
                <Route path="/test">
                    <Parent/>
                </Route>
                <Route path="*">
                    <h1>That's 404</h1>
                </Route>
            </Switch>
        </>
    );
}

export default App;
