import React from 'react';
import GridPage from "./Grid";
import {Col, Div, Row} from "atomize";
import axios from "axios";
import buildSettings from "../buildSettings.json";
import {withRouter} from "react-router";
import CategoriesList from "../Components/Guild/CategoriesList";
import OptionsCategory from "../Components/Guild/OptionsCategory";

class ManageGuild extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            guildOptions: null,
            updatedSettings: null,
            guilds: JSON.parse(localStorage.getItem('guilds') || "[]"),
            uuid: localStorage.getItem('uuid'),
            guild_id: this.props.match.params.guild_id,
            guild: {},
            actualCategory: null,
            guildSettings: {},
            showSubmit: false,
        }
    }

    setActualCategory = (c) => this.setState({actualCategory: c});

    setGuildSettings = (s) => this.setState({guildSettings: s});

    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.match.params.guild_id == this.state.guild_id)return false;
        return true;
    }*/

    componentDidMount() {
        this.state.guild = this.state.guilds.find(g => g.id == this.state.guild_id);
        this.FetchGuildOptions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.guild_id != this.props.match.params.guild_id) {
            this.setState({
                guild_id: this.props.match.params.guild_id,
                guildOptions: null,
                updatedSettings: null,
                guildSettings: {},
                showSubmit: false
            });
            this.state.guild = this.state.guilds.find(g => g.id == this.state.guild_id);
            this.FetchGuildOptions();
        }

        if (Object.values(this.state.guildSettings)[0] && prevState.showSubmit != true) {
            this.setState({showSubmit: true});
        }

        console.log(this.state);
    }

    FetchGuildOptions = async () => {
        const res = await axios.post(`${buildSettings.settings.serverUrl}/api/@guild`, {
            uuid: this.state.uuid,
            guild_id: this.props.match.params.guild_id
        });
        this.setState({guildOptions: res.data.options});
        return res;
    }

    render() {
        return (
            <GridPage active={this.state.guild_id}>
                <Div>
                    <Row>
                        <Col size={{
                            xs: '12',
                            sm: '12',
                            md: '12',
                            lg: '3',
                            xl: '3'
                        }} style={{paddingTop: '2rem', paddingRight: '1.5rem', paddingLeft: '1.5rem'}}>
                            <Div style={{
                                padding: '1rem',
                                display: 'absolute',
                                backgroundColor: '#2f3136',
                                borderRadius: '20px',
                                boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.09)'
                            }}>
                                {
                                    this.state.guildOptions ?
                                        <CategoriesList guild={this.state.guild} categories={this.state.guildOptions}
                                                        guild_id={this.state.guild_id}
                                                        actualCategory={this.state.actualCategory}
                                                        setActualCategory={this.setActualCategory}/>
                                        :
                                        null
                                }
                            </Div>
                        </Col>
                        <Col size={{
                            xs: '12',
                            sm: '12',
                            md: '12',
                            lg: '9',
                            xl: '9'
                        }}>
                            <Div p="1rem" style={{paddingTop: '2rem'}}>
                                <h1>Manage {this.state.guild.name}.</h1>
                                <div>
                                    {
                                        this.state.actualCategory && this.state.guildOptions && this.state.guild ?
                                            <OptionsCategory guild={this.state.guild} guild_id={this.state.guild_id}
                                                             key={this.state.actualCategory}
                                                             category={this.state.guildOptions.find(c => c.id == this.state.actualCategory)}
                                                             guildSettings={this.state.guildSettings}
                                                             setGuildSettings={this.setGuildSettings}/>
                                            :
                                            <a>Loading...</a>
                                    }
                                </div>
                                <div>
                                    JSON with only to update:
                                    {' '}
                                    {
                                        JSON.stringify(this.state.guildSettings, null, 3)
                                    }
                                </div>
                                <div>
                                    Show submit?
                                    {' '}
                                    {
                                        this.state.showSubmit.toString()
                                    }
                                </div>
                            </Div>
                        </Col>
                    </Row>
                </Div>
            </GridPage>
        )
    }
}

export default withRouter(ManageGuild);
