import React from 'react';
import {Div} from 'atomize';
import TextInput from '../Options/TextInput';

export default function OptionsCategory({category, guildSettings, setGuildSettings, guild_id}) {
    return (
        <Div>
            {
                category.options.map(option => {
                    if (option.optionType.type == 'TextInput') {
                        return (
                            <Div style={{width: '100%'}}>
                                <TextInput
                                    style={{width: '100%'}}
                                    category={category}
                                    option={option}
                                    guild_id={guild_id}
                                    guildSettings={guildSettings}
                                    setGuildSettings={setGuildSettings}
                                    clientValidate={eval(option.clientValidation)}
                                />
                            </Div>
                        );
                    }
                })
            }
        </Div>
    );
}
