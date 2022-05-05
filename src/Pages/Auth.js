import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from 'axios';

const buildSettings = require('../buildSettings.json');
const translations = require('../translations.default');

const AuthPage = (props) => {
    const navigate = useNavigate();
    const lang = props.lang || 'pl';

    const redirectTo = useCallback((to) => navigate(to, {replace: true}), [navigate]);
    const [query] = useSearchParams();

    const [error, setError] = useState('');

    const [allowLoad, setAllowLoad] = useState(false);

    const DBD_AccessToken = query.get('uuid');

    const FetchUser = async (DBD_AccessToken) => {
        let errored = false;
        const res = await axios.post(`${buildSettings.settings.serverUrl}/api/@user`, {
            uuid: DBD_AccessToken,
        }, {headers: {"Content-Type": "application/json"}}).catch(err => {
            setError(translations.errors[err.response.data?.message]?.[lang] || translations.errors.UNKNOWN(err.response.data.message)?.[lang]);
            errored = true;
        });
        return res?.data;
    }


    const FetchGuilds = async (DBD_AccessToken) => {
        let errored = false;
        const res = await axios.post(`${buildSettings.settings.serverUrl}/api/@guilds`, {
            uuid: DBD_AccessToken,
        }, {headers: {"Content-Type": "application/json"}}).catch(err => {
            setError(translations.errors[err.response.data?.message]?.[lang] || translations.errors.UNKNOWN(err.response.data.message)?.[lang]);
            errored = true;
        });
        return res?.data;
    }

    useEffect(() => {
        if (!DBD_AccessToken) return window.location.href = `${buildSettings.settings.serverUrl}/api/auth/gen`;
        setAllowLoad(true);
        FetchUser(DBD_AccessToken).then(async User => {
            if (error) return;
            const UserGuilds = await FetchGuilds(DBD_AccessToken);
            await localStorage.setItem('guilds', JSON.stringify(UserGuilds.guilds));
            await localStorage.setItem('permissionsRequired', JSON.stringify(UserGuilds.permissionsRequired));
            await localStorage.setItem('uuid', DBD_AccessToken);
            await localStorage.setItem('user', JSON.stringify(User.user));
            redirectTo('/dashboard');
        });
    });

    return (
        allowLoad ?
            <>
                <a>{translations.fetching_user[lang]}...</a>
                <p>{error}</p>
            </>
            :
            <>
            </>
    );
};

export default AuthPage;
