import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import {
    AppBar,
    Box,
    createTheme,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ThemeProvider,
    Toolbar,
    Typography,
    Tooltip
} from '@mui/material';

import {useNavigate} from 'react-router-dom';
import {Div} from 'atomize';

import CollapseUser from '../Components/collapse/CollapseUser';

const theme = createTheme({
    typography: {
        allVariants: {
            color: 'white'
        },
        fontFamily: [
            'Public Sans',
        ].join(','),
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#202225",
                    color: "white",
                    borderRight: '1px solid',
                    borderColor: 'rgba(255,255,255,0.22)'
                },
            }
        }
    },
});

const drawerWidth = 84;

export default function GridPage(props) {
    const navigate = useNavigate();
    const {window, active} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const Guilds = JSON.parse(localStorage.getItem('guilds') || "[]");
    const PermissionsRequired = 0x8;

    const drawer = (
        <div style={{paddingTop: '0.8rem',}}>
            <Div h="5rem" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center',
                paddingLeft: '1rem'
            }}>
                <Tooltip title={"Home"} placement="right" arrow>
                <a><img className={'onHoverBigger'} src={require('./../icons/homeicon.png')} width={'50rem'} height={'50rem'}
                        style={{borderRadius: '3rem'}} onClick={() => navigate('/')}/></a>
                </Tooltip>
            </Div>

            <Div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '0.4rem'}}>
                <Div style={{width: '70%', height: '0.5px', backgroundColor: 'rgba(141,141,141,0.38)'}}/>
            </Div>

            <List sx={{
                // selected and (selected + hover) states
                '&&.MuiListItem-root, && .MuiListItem-root:hover': {
                    bgcolor: 'none',
                    '&, & .MuiListItemIcon-root': {
                        color: 'none',
                    },
                },
                // hover states
                '&&.MuiListItem-root, && .Mui-selected': {
                    bgcolor: 'yellow',
                    '&, & .MuiListItemIcon-root': {
                        color: 'yellow',
                    },
                },
            }}>
                {Guilds.map((guild, index) => {
                    return (guild.permissions & PermissionsRequired) == PermissionsRequired ?
                        <Div>
                            <ListItem selected={false} button key={guild.id} style={{
                                borderRadius: "0.9em",
                                height: guild.icon ? '4rem' : '5rem',
                                "&,&:focus": {
                                    backgroundColor: "#F6F6E8",
                                    textDecoration: "line-through"
                                },
                                "&:hover": {
                                    textDecoration: "line-through",
                                    backgroundColor: 'red'
                                },
                                display: 'flex',
                                flexDirection: 'column'
                            }} onClick={() => navigate(`/guild/${guild.id}`)}>
                                <Tooltip title={guild.name} placement="right" arrow>
                                    <img
                                        className={'onHover'}
                                        src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "https://cdn.discordapp.com/embed/avatars/1.png"}
                                        width={'50rem'} height={'50rem'} style={{
                                        borderRadius: '50rem',
                                        border: active == guild.id ? '3px solid gray' : ''
                                    }}/>
                                </Tooltip>
                                {guild.icon ? null : guild.name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')}
                            </ListItem>
                        </Div>
                        : null;
                })}

                {<Div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '0.7rem',
                    paddingBottom: '0.6rem'
                }}>
                    <Div style={{width: '70%', height: '0.5px', backgroundColor: 'rgba(141,141,141,0.38)'}}/>
                </Div>}

                <Div>
                    <ListItem selected={false} button key={'guild_add'} style={{
                        borderRadius: "0.9em",
                        height: '4rem',
                        "&,&:focus": {
                            backgroundColor: "#F6F6E8",
                            textDecoration: "line-through"
                        },
                        "&:hover": {
                            textDecoration: "line-through",
                            backgroundColor: 'red'
                        }
                    }} onClick={() => navigate(`/guild/`)}>
                        <Tooltip title={"Add to server"} placement="right" arrow>
                        <img className={'onHoverBigger'} src={require('./../icons/discord_plus_icon.png')}
                             width={'50rem'} height={'50rem'} style={{borderRadius: '50rem'}}/>
                        </Tooltip>
                    </ListItem>
                </Div>


                <Div>
                    <ListItem selected={false} button key={'guild_add'} style={{
                        borderRadius: "0.9em",
                        height: '4rem',
                        "&,&:focus": {
                            backgroundColor: "#F6F6E8",
                            textDecoration: "line-through"
                        },
                        "&:hover": {
                            textDecoration: "line-through",
                            backgroundColor: 'red'
                        }
                    }} onClick={() => navigate(`/guild/`)}>
                        <Tooltip title={"Privacy Policy"} placement="right" arrow>
                            <img className={'onHoverBigger'} src={require('./../icons/discord_plus_icon.png')}
                                 width={'50rem'} height={'50rem'} style={{borderRadius: '50rem'}}/>
                        </Tooltip>
                    </ListItem>
                </Div>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    style={{
                        background: 'rgba(33,34,37,0.71)',
                        backdropFilter: 'blur(4px)',
                        borderColor: 'red'
                    }}
                    sx={{
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        ml: {sm: `${drawerWidth}px`},
                        boxShadow: '1px 1px 4px rgba(203,203,203,0.13)',
                    }}
                >
                    <Toolbar sx={{
                        height: '6rem'
                    }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="h6" noWrap component="div" sx={{
                                display: 'block'
                            }}>
                                Discord-Dashboard v3
                            </Typography>
                            <Typography sx={{
                                pr: {
                                    xs: '50px !important',
                                    sm: '0px !important',
                                    md: '0px !important',
                                    lg: '0px !important',
                                    xl: '0px !important'
                                },
                                display: {
                                    xs: 'flex',
                                    sm: 'flex',
                                    md: 'flex',
                                    lg: 'flex',
                                    xl: 'flex'
                                }
                            }} style={{width: '200px', justifyContent: 'flex-end'}}>
                                <CollapseUser/>
                            </Typography>
                        </Div>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}, borderColor: 'red'}}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            borderColor: 'red'
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', sm: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
                >
                    <Toolbar style={{height: '90px'}}/>
                    <Div>
                        {
                            props.children
                        }
                    </Div>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
