import React from 'react';
import {Div} from 'atomize';
import TextInput from '../Options/TextInput';

export default function OptionsCategory({category, guildSettings, setGuildSettings, guild_id, erroredOptions}) {
    console.log(erroredOptions)
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
                                    isErrored={erroredOptions.find(o=>o.option_id==option.id&&o.category_id==category.id)}
                                />
                            </Div>
                        );
                    }
                })
            }
        </Div>
    );
}
