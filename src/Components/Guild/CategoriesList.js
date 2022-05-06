import React from 'react';
import {Div, Text} from 'atomize';
import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import './CategoriesList.css';

export default function CategoriesList({guild, categories, guild_id, actualCategory, setActualCategory}) {
    if (!actualCategory) setActualCategory(categories[0].id);
    console.log(actualCategory);

    return (
        <Div key={guild_id} style={{display: 'block'}}>
            <List
                sx={{
                    width: '100%', bgcolor: 'none',
                    '&&.MuiListItem-root, && .Mui-selected': {
                        bgcolor: 'rgba(44,44,49,0.73)',
                        '&, & .MuiListItemIcon-root': {
                            color: 'rgba(44,44,49,0.73)',
                        },
                    },
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItem selected={false} p={'0'} style={{
                    borderRadius: "0.9rem",
                }} className={'MuiListItem-root-np'}>
                    <Div style={{
                        paddingBottom: "1rem",
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <img width={'80rem'} height={'80rem'}
                             src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "https://cdn.discordapp.com/embed/avatars/1.png"}/>

                        <Text style={{textAlign: 'center', paddingTop: '0.6rem', paddingBottom: '0.7rem'}}
                              textSize={'title'}
                              textWeight={500}
                        >
                            {guild.name}
                        </Text>

                        <Div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                            alignContent: 'center'
                        }}>
                            <span
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                                <img width={'27rem'} height={'30rem'}
                                     src="https://adn.siondevelopment.xyz/dbd-dark/src/images/people_white_24dp.svg"/>
                                <Text>{guild.onGuild.memberCount || '?'} Users</Text>
                            </span>

                            <span
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                                <img width={'27rem'} height={'30rem'}
                                     src="https://raw.githubusercontent.com/Mattlau04/Discord-SVG-badges/40bb00680293c884c6b101fcdf1e194425e4bc9c/SVG/boost15month.svg"/>
                               <Text>{guild.onGuild.premiumSubscriptionCount || 'No'} Boosts</Text>
                            </span>

                            <span
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                                <img width={'27rem'} height={'30rem'}
                                     src="https://adn.siondevelopment.xyz/dbd-dark/src/images/security_white_24dp.svg"/>
                                <Text>{(guild.onGuild.verificationLevel?.charAt(0)?.toUpperCase() + guild.onGuild.verificationLevel?.slice(1)?.toLowerCase()) || 'No data'}</Text>
                            </span>
                        </Div>
                        {
                            console.log(guild)
                        }
                    </Div>
                </ListItem>
                <Div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '1rem'}}>
                    <Div style={{width: '90%', height: '0.5px', backgroundColor: 'rgba(141,141,141,0.38)'}}/>
                </Div>
                {categories.map(category => {
                    return (
                        <ListItem selected={category.id == actualCategory} p={'0'} style={{
                            borderRadius: "0.9rem",
                        }} className={'MuiListItem-root-np'}>
                            <ListItemButton onClick={() => setActualCategory(category.id)}>
                                <ListItemText style={{paddingLeft: '0.4rem'}} primary={category.name}/>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Div>
    );
}
