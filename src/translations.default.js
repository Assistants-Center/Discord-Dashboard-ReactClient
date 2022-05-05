const errors = {
    UNKNOWN: (str) => {
        return {
            en: `An unexpected error has occurred. Please try again later. (Error: ${str})`,
            pl: `Wystąpił nieoczekiwany błąd. Proszę, spróbuj ponownie później. (Błąd: ${str})`,
        }
    },
    ERROR_NO_TOKEN: {
        en: "No saved token on server-side found. Please try authenticating again.",
        pl: "Nie znaleziono zapisanego tokena po stronie serwera. Proszę, spróbuj zaautoryzować się ponownie.",
    }
}

const permissions = {
    0x8: {
        en: "Administrator",
        pl: "Administrator",
    }
}

module.exports = {
    errors,
    permissions,
    refreshing_guilds: {
        en: "Refreshing Guilds list...",
        pl: "Odświeżanie listy serwerów...",
    },
    connection_error: {
        en: "Seems like the server if offline or you don't have internet connection... We will try to reconnect you every 15 seconds.",
        pl: "Wygląda na to, że serwer jest w trybie offline lub nie masz połączenia z Internetem... Co 15 sekund będziemy próbować ponownie nawiązać połączenie."
    },
    fetching_user: {
        en: "Fetching User",
        pl: "Pobieranie użytkownika"
    },
    assistants_motto: {
        en: "Do better, be better. And we will help you with this.",
        pl: "Zrób lepiej, bądź lepszy. A my Ci w tym pomożemy.",
    },
    home: {
        en: "Home",
        pl: "Strona główna",
    },
    submit: {
        en: "Submit",
        pl: "Prześlij",
    },
    guild: {
        plural: {
            en: "Guilds",
            pl: "Serwery",
            manage: {
                en: "Manage Guilds",
                pl: "Zarządzaj serwerami",
            }
        },
        singular: {
            en: "Guild",
            pl: "Serwer",
            manage: {
                en: "Manage Guild",
                pl: "Zarządzaj serwerem",
            }
        },
    },
    options_generator: {
        generate_submit: {
            en: "Generate",
            pl: "Wygeneruj",
        },
        title: {
            en: 'Discord-Dashboard Options Generator',
            pl: 'Options Generator dla Discord-Dashboard'
        },
        description: {
            en: [
                "Options Generator built into Discord-Dashboard is the perfect way to create a folder of options through the UI.",
                "You don't need to create 100 files individually, just use this tool.",
                "Best of all, you can set the 'optionsOptions' in the Discord-Dashboard config to e.g. a database as a specific variable and then use it here! Seriously, then you won't have to dig around in options files 😎👌"
            ],
            pl: [
                "Options Generator wbudowany w Discord-Dashboard to idealny sposób na utworzenie folderu z opcjami poprzez interfejs UI.",
                "Nie masz potrzeby tworzyć 100 plików zamodzielnie, wystarczy że skorzystasz z tego narzędzia.",
                "Co najlepsze, możesz ustalić w 'optionsOptions' w config Discord-Dashboard np. bazę danych jako konkretną zmienną, a potem jej tu użyć! Serio, wtedy nie będziesz musiał grzebać w plikach options 😎👌"
            ]
        }
    }
};
