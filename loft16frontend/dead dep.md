Dead But usefull 

    npm i react-google-one-tap-login

    problem : cant verify jwt on backend :(
```jsx


/* G One Tap */
    import GoogleOneTapLogin from 'react-google-one-tap-login';

    const GOneSuccess = (res) => {
    console.log("ONE TAP",res)
    }

    <GoogleOneTapLogin onError={(error) => console.log(error)} onSuccess={GOneSuccess} googleAccountConfigs={{ client_id:CLID }} />
```


salmaankhaan
