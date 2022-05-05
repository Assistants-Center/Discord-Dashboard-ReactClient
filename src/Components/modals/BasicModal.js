import React from 'react';
import {Button, Div, Icon, Modal, Text} from "atomize";
import './BasicModal.css';

const BasicModal = ({isOpen, onClose, text}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} align="center" rounded="md" style={{
            zIndex: 553535534,
            backgroundColor: '#202225'
        }} containerStyle={{backgroundColor: 'red'}} bg={"red"}>
            <Icon
                name="Cross"
                pos="absolute"
                top="1rem"
                right="1rem"
                size="16px"
                onClick={onClose}
                cursor="pointer"
            />
            <Div m={{b: "1rem"}}>
                <Div d="flex">
                    <Icon
                        name="AlertSolid"
                        color="warning700"
                        m={{t: "0.35rem", r: "0.5rem"}}
                    />
                    <Text p={{l: "0.5rem", t: "0.25rem"}} textWeight={'600'} textSize="subheader">
                        An error has occurred!
                    </Text>
                </Div>
                <Div>
                    <Text p={{l: "0.5rem", t: "1rem"}} textSize="paragraph">
                        {text}
                    </Text>
                </Div>
            </Div>
            <Div d="flex" justify="flex-end">
                <Button
                    onClick={onClose}
                    bg="gray200"
                    textColor="medium"
                    m={{r: "1rem"}}
                >
                    Okay
                </Button>
            </Div>
        </Modal>
    );
}

export default BasicModal;
