import './EmojiPicker.css';
import {Div} from 'atomize';
import React from "react";


const PickerComponent = ({customEmoji, addEmoji}) => {
    const ref = React.useRef(null)

    React.useEffect(() => {
        ref.current.addEventListener('emoji-click', event => {
            addEmoji(event);
        })
        ref.current.customEmoji = customEmoji || [];
    }, []);

    return React.createElement('emoji-picker', {ref})
}

export default class EmojiPicker extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            clientValidationError: false,
            value: props.value,
        };
    }

    getOptionData = () => {
        return {
            value: this.state.value,
            type: 'EmojiPicker'
        };
    }

    render() {
        return (
            <Div style={{display: this.props.display ? 'block' : 'none', position: 'fixed'}}>
                <Div style={{maxWidth: '100%'}}>
                    <PickerComponent addEmoji={this.props.addEmoji} customEmoji={this.props.guildEmojisList}/>
                </Div>
            </Div>
        )
    }
};
