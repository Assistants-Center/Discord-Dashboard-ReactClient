import * as React from "react";
import {Divider, ClickAwayListener} from '@mui/material';
import {Button, Collapse, Div} from "atomize";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const buildSettings = require('../../buildSettings.json');

export default function CollapseUser(props) {
    const wrapperRef = React.useRef(null);
    const navigate = useNavigate();

    const DestoryUser = async () => {
        window.location.href = buildSettings.settings.clientUrl;
        localStorage.removeItem('user');
        localStorage.removeItem('uuid');
        localStorage.removeItem('guilds');
    }

    const User = JSON.parse(localStorage.getItem('user') || '{}');
    const [showCollapse, setShowCollapse] = React.useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && showCollapse) {
                setTimeout(()=>{
                    setShowCollapse(false);
                }, 200);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, showCollapse]);

    return (
        <>
            {
                User.id ?
                    <>
                            <img src={User.avatarURL} width={'40rem'} height={'40rem'} style={{borderRadius: '20rem'}}
                                 onClick={() => showCollapse ? void(0) : setShowCollapse(true)}/>
                            <Collapse isOpen={showCollapse} pos="fixed" m={{t: '3rem'}}>
                                <Div
                                    bg="gray100"
                                    border="1px solid"
                                    borderColor="gray400"
                                    rounded="lg"
                                    align="flex-start"
                                    ref={wrapperRef}
                                >
                                    <Div
                                        p={{x: "1rem", y: "0.75rem"}}
                                        border={{b: "1px solid"}}
                                        borderColor="gray400"
                                        style={{minWidth: '10rem', color: 'black'}}
                                    >
                                        {User.id ? `${User.username}#${User.discriminator}` : 'Nie ma'}
                                    </Div>
                                    <Divider/>
                                    <Div
                                        p={{x: "1rem", y: "0.75rem"}}
                                        border={{b: "1px solid"}}
                                        borderColor="gray400"
                                        style={{minWidth: '10rem', color: 'black'}}
                                    >
                                        <a onClick={() => DestoryUser()}>Wyloguj się</a>
                                    </Div>
                                </Div>
                            </Collapse>
                    </>
                    :
                    <></>
            }
        </>
    );
}
