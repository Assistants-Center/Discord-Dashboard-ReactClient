import React from 'react';
import axios from "axios";
import buildSettings from "../buildSettings.json";
import translations from "../translations.default";
import {Link} from "react-router-dom";

import GridPage from "./Grid";

export default class GuildsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            lang: localStorage.getItem('lang') || 'en',
            guilds: JSON.parse(localStorage.getItem('guilds') || "[]"),
            refreshing: false,
            permissionsRequired: JSON.parse(localStorage.getItem('permissionsRequired') || "[]"),
        }
    }

    FetchGuilds = async () => {
        this.setState({refreshing: true});
        const DBD_AccessToken = localStorage.getItem('uuid');
        let res;
        try {
            res = await axios.post(`${buildSettings.settings.serverUrl}/api/@guilds`, {
                uuid: DBD_AccessToken,
            }, {headers: {"Content-Type": "application/json"}});
        } catch (err) {
            if (err.response.data.error == true) {
                alert(err.response.data.message);
                this.setState({refreshing: false});
                return false;
            }
        }
        localStorage.setItem('guilds', JSON.stringify(res.data.guilds));
        localStorage.setItem('permissionsRequired', JSON.stringify(res.data.permissionsRequired))
        this.setState({guilds: res.data.guilds, refreshing: false, permissionsRequired: res.data.permissionsRequired});
        return res?.data;
    }

    render() {
        const lang = this.state.lang;
        return (
            <GridPage active={'dashboard'}>
                {
                    this.state.refreshing ?
                        <h1>{translations.refreshing_guilds[lang]}</h1>
                        :
                        this.state.guilds.map(guild => {
                            if ((guild.permissions & this.state.permissionsRequired[0]) != this.state.permissionsRequired[0])
                                return null;
                            return <p><Link to={`/guild/${guild.id}`}>{guild.name}</Link></p>;
                        })
                }
                <h4>Nie widzisz swojego guild? Wymagane uprawnienia to: {
                    this.state.permissionsRequired.map(perm => {
                        return <>{translations.permissions[perm][this.state.lang]}</>;
                    })
                }</h4>
                <button onClick={() => this.FetchGuilds()}>Refresh</button>
            </GridPage>
        );
    }
}
