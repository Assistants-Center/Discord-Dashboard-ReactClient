import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

import AuthPage from "./Pages/Auth";
import OptionsPage from "./Pages/Options";
import GuildsListPage from "./Pages/GuildsList";
import ManageGuildPage from "./Pages/ManageGuild";
import GridPage from "./Pages/Grid";
import HomePage from './Pages/Home';

const buildSettings = require('./buildSettings.json');

function App() {
    const navigate = useNavigate();
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

            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="grid" element={<GridPage/>}/>
                <Route path="*" element={
                    <>
                        {
                            User.id ? null : navigate('/auth')
                        }
                        <Routes>
                            <Route path="auth" element={<AuthPage/>}/>
                            <Route path="options" element={<OptionsPage/>}/>
                            <Route path="dashboard" element={<GuildsListPage/>}/>
                            <Route path="guild/:guild_id" element={<ManageGuildPage/>}/>
                            <Route path="*" element={<h1>That's 404</h1>}/>
                        </Routes>
                    </>
                }/>
            </Routes>
        </>
    );
}

export default App;
