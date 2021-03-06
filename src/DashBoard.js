import React, { useEffect } from 'react';
import { sendAuthorizationRequest, sendTokenRequest, sendAuthorizationRequestWithOTP } from "./actions/sign-in";
import { dispatchLogout } from "./actions/sign-out";
import { sendRegistration } from "./actions/register";
import {
    isValidSession,
    getAllSessionParameters,
    decodeIdToken,
    getUserRole
} from "./actions/session";
import { BrowserRouter } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Container } from "@mui/material";
import Button from '@mui/material/Button';
import Consumer from './Consumer/Consumer';
import './DashBoard/Dashboard.css';
import RoleConstant from './Config/RoleConstant';
import { Grid } from "@mui/material";
import TrainSchedule from './TrainSchedule/TrainSchedule';
import Marketing from './Marketing/Marketing';
import Footer from './Marketing/Footer';
import TopMenu from './Components/TopMenu';

function loginClick() {
    sendAuthorizationRequest();
}

function loginWithOTPClick() {
    sendAuthorizationRequestWithOTP();
}

function logOutClick() {
    dispatchLogout();
}

function registerClick() {
    sendRegistration();
}
const drawerWidth = 240;

const MainDashBoard = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [idToken, setIdToken] = React.useState({});
    const [tokenResponse, setTokenResponse] = React.useState({});

    useEffect(() => {
        if (isValidSession()) {
            const session = getAllSessionParameters();
            const _tokenResponse = {
                access_token: session.ACCESS_TOKEN,
                refresh_token: session.REFRESH_TOKEN,
                scope: session.SCOPE,
                id_token: session.ID_TOKEN,
                token_type: session.TOKEN_TYPE,
                expires_in: parseInt(session.EXPIRES_IN),
            };
            setTokenResponse(_tokenResponse);
            setIdToken(decodeIdToken(session.ID_TOKEN));
            setIsLoggedIn(true);
            return;
        }

        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            sendTokenRequest(code)
                .then(response => {
                    console.log("TOKEN REQUEST SUCCESS", response);
                    setTokenResponse(response[0]);
                    setIdToken(response[1]);
                    setIsLoggedIn(true);
                    // initAuthenticatedRoles(response[1].groups);
                    var jsonData = {
                        "id": "",
                        "username": response[1].sub,
                    };
                    // axiosConfig.get(process.env.REACT_APP_APIM_USERS_PREFIX + process.env.REACT_APP_API_PREFIX + '/users', {params: {username: jsonData.username}})
                    //     .then(function (response) {
                    //         localStorage.setItem('username', response.data.username);
                    //         initAuthenticatedUserSession(response.data);
                    //         window.location.replace('/');
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error);
                    //     });

                })
                .catch((error => {
                    console.log("TOKEN REQUEST ERROR", error);
                    setIsLoggedIn(false);
                }));
        }
    }, []);

    let role = getUserRole();
    let userInLocalStore = localStorage.getItem("username");

    let form = false;
    if (isLoggedIn) {
        if (role === RoleConstant.consumer) {
            form = true;
        } else {
            form = false;
        }
    }

    return (
        <BrowserRouter><Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="static"
                style={{ background: 'url(/header.jpg)', backgroundSize: 'contain', height: 265 }}
            >
                <Toolbar>
                    <Box
                        background='#fff4'
                        flex={1}
                        mt={5}
                    ><img src='/logo.svg' width={500} /></Box>
                    <Box background='#fff4'>
                        {isLoggedIn ? <>
                            <Button style={{ color: '#fff' }} onClick={() => {
                                logOutClick();
                            }}>Logout</Button>
                        </> : <><Button style={{ color: '#fff' }} onClick={() => {
                            loginClick();
                        }}>Login</Button>
                            <Button style={{ color: '#fff' }} onClick={() => {
                                registerClick();
                            }}>Register</Button></>}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box><Container maxWidth="lg">
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                    }}
                >
                    <Grid container spacing={3}>
                        {isLoggedIn && <Grid item xs={12}>
                            <TopMenu />
                        </Grid>}
                        <Marketing />
                        <Footer />
                    </Grid>
                    {form ? <>
                        <Consumer />
                    </> : <></>}
                </Box>
            </Container></BrowserRouter>

    );
}

export default MainDashBoard;