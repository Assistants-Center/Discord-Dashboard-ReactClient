import React from 'react';
import {Button, Div, Icon, Input} from 'atomize';
import './TextInput.css';

import EmojiPicker from '../EmojiPicker';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            clientValidationError: false,
            value: props.option.value,
            displayEmojiPicker: false,
        };

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.displayEmojiPicker) {
            this.setState({displayEmojiPicker: false});
        }
    }

    getOptionData = () => {
        return {
            value: this.state.value,
            type: 'TextInput'
        };
    }

    addEmoji = (a) => {
        const newValue = (this.state.value || '') + (a.detail.emoji.url ? `<${a.detail.emoji.animated ? 'a' : ''}:${a.detail.emoji.name}:${a.detail.emoji.id}>` : a.detail.emoji.unicode);

        let guildSettings = this.props.guildSettings;
        if (!guildSettings[this.props.category.id]) guildSettings[this.props.category.id] = {};
        guildSettings[this.props.category.id][this.props.option.id] = newValue;
        this.props.setGuildSettings(guildSettings);

        this.setState({value: newValue});
    }

    onChange = (event, clientValidate, setClientValidationError, setOptionValue) => {
        const value = event.target.value;
        setClientValidationError(false);
        if (clientValidate) {
            const validation = clientValidate(value);
            if (validation.validated == false) {
                return setClientValidationError(validation.error);
            }
        }

        let guildSettings = this.props.guildSettings;
        if (!guildSettings[this.props.category.id]) guildSettings[this.props.category.id] = {};
        guildSettings[this.props.category.id][this.props.option.id] = value;
        this.props.setGuildSettings(guildSettings);

        setOptionValue(value);
    }

    render() {
        const useEmojiPicker = this.props.option.optionType?.useEmojiPicker;
        const guildEmojisList = this.props.option.additionalSettings?.guildEmojisList;


        const {clientValidate} = this.props;
        const setClientValidationError = (e) => this.setState({clientValidationError: e});
        const setOptionValue = (t) => this.setState({value: t});

        return (
            <Div style={{width: '100%'}}>
                <h1>This is TextInput.</h1>
                <Div ref={this.wrapperRef}>
                    <Input
                        ref={this.wrapperRef}
                        placeholder="Basic Input"
                        textColor={'#000000'}
                        onChange={(e) => this.onChange(e, clientValidate, setClientValidationError, setOptionValue)}
                        value={this.props.guildSettings[this.props.category.id]?.[this.props.option.id] || this.state.value}
                        style={{width: '100%', borderRadius: '20px'}}
                        p={{l: "3.3rem"}}
                        prefix={
                            <Button
                                pos="absolute"
                                onClick={() => {
                                    console.log('a')
                                    this.setState({displayEmojiPicker: !this.state.displayEmojiPicker})
                                }}
                                bg="info700"
                                hoverBg="info800"
                                w="3rem"
                                top="0"
                                left="0rem"
                                style={{
                                    borderTopLeftRadius: '20px',
                                    borderBottomLeftRadius: '20px',
                                    borderTopRightRadius: '0px',
                                    borderBottomRightRadius: '0px'
                                }}
                            >
                                <Icon
                                    name="Search"
                                    size="20px"
                                    color="white"
                                    cursor="pointer"
                                />
                            </Button>
                        }
                    />
                    <a>{this.state.clientValidationError}</a>

                    <Div>
                        {useEmojiPicker ? <EmojiPicker display={this.state.displayEmojiPicker} addEmoji={this.addEmoji}
                                                       guildEmojisList={guildEmojisList}/> : null}
                    </Div>
                </Div>
            </Div>
        );
    }
}
