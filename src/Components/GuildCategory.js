import React from 'react';
import TextInput from './Options/TextInput';
import EmojiPicker from './EmojiPicker';

export default function GuildCategory({guild, category}) {
    return (
        <>
            <p>
                <TextInput value={category.options[0].value} clientValidate={eval("()=>{}")}/>

                <EmojiPicker/>
            </p>
        </>
    )
}
