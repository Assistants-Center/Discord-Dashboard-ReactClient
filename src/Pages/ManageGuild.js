import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import './ManageGuild.css';
import TextInput from "../Components/Options/TextInput";
import {Icon, Notification} from "atomize";
import BasicModal from '../Components/modals/BasicModal';
import GridPage from "./Grid";
import EmojiPicker from "../Components/EmojiPicker";
import {Div} from 'atomize';


const buildSettings = require('../buildSettings.json');

const ManageGuildPage = (props) => {
    const [first, setFirst] = useState(true);
    const navigate = useNavigate();
    const {guild_id} = useParams();
    const [guildId, setGuildId] = useState(null);
    const Guilds = JSON.parse(localStorage.getItem('guilds') || "[]");
    const Guild = Guilds.find(g => g.id == guild_id);

    const [showNotification, setNotification] = useState(false);
    const [notificationText, setNotificationText] = useState(null);
    const [notificationType, setNotificationType] = useState('success700');

    const [showModal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');


    const [GuildOptions, SetGuildOptions] = useState(null);
    let refs = {};

    const uuid = localStorage.getItem('uuid');

    const FetchGuildOptions = async () => {
        SetGuildOptions(null);
        const res = await axios.post(`${buildSettings.settings.serverUrl}/api/@guild`, {uuid, guild_id});
        SetGuildOptions(res.data.options);
        return res;
    }

    useEffect(() => {
        FetchGuildOptions();
    }, [guild_id]);

    const doRefs = async () => {
        let returnJson = {};
        for (const category of GuildOptions) {
            returnJson[category.id] = {};
            for (const option of category.options) {
                const optionRef = refs[guild_id][category.id]?.[option.id];
                if (optionRef) {
                    returnJson[category.id][option.id] = optionRef();
                }
            }
        }

        const res = await axios.post(`${buildSettings.settings.serverUrl}/api/@update`, {
            uuid,
            guild_id,
            options: returnJson
        });

        setModal(true);
        setModalText('hello world!');

        if (res.data.success) {
            setNotification(true);
            setNotificationType('success700');
            setNotificationText('Pomyślnie zaaktualizowano ustawienia.');
        } else {
            setNotification(true);
            setNotificationType('warning700');
            setNotificationText(res.data.message);
        }
    }

    return (
        <GridPage active={Guild.id}>
            <h1>Manage {Guild.name}.</h1>
            <div>
                {
                    GuildOptions ?
                        GuildOptions.map(category => {
                            if (!refs[guild_id]) refs[guild_id] = {};
                            refs[guild_id][category.id] = {};
                            return (
                                <div key={Guild.id}>
                                    <p>{Guild.name}</p>
                                    <h1>{category.name} ({category.id})</h1>
                                    {
                                        category.options.map(option => {

                                            if (option.optionType.type == 'TextInput') {
                                                return (
                                                    <Div style={{width:'100%'}}>
                                                        <TextInput
                                                            style={{width:'100%'}}
                                                            option={option}
                                                            ref={(r) => {
                                                                refs[guild_id][category.id][option.id] = r?.getOptionData;
                                                            }}
                                                            clientValidate={eval(option.clientValidation)}
                                                        />
                                                    </Div>
                                                );
                                            }


                                        })
                                    }
                                </div>
                            )
                        }) : null
                }
            </div>
            <div>
                <button onClick={() => doRefs()}>Click</button>
            </div>


            <>
                <Notification
                    bg={notificationType}
                    isOpen={showNotification}
                    onClose={notificationType.startsWith('warning') ? null : () => setNotification(false)}
                    suffix={
                        notificationType.startsWith('warning') ?
                            <Icon
                                name="Cross"
                                pos="absolute"
                                top="1rem"
                                right="0.5rem"
                                color="white"
                                size="18px"
                                cursor="pointer"
                                m={{r: "0.5rem"}}
                                onClick={() => setNotification(false)}
                            />
                            :
                            null
                    }
                    prefix={
                        <Icon
                            name="Success"
                            color="white"
                            size="18px"
                            m={{r: "0.5rem"}}
                        />
                    }
                    style={{
                        zIndex: 593554345
                    }}
                >
                    {notificationText}
                </Notification>
            </>
            <div style={{zIndex: 5523235232}}>
                <BasicModal
                    isOpen={showModal}
                    onClose={() => setModal(false)}
                    text={modalText}
                />
            </div>
        </GridPage>
    )
}

export default ManageGuildPage;
