import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../index";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);
        console.log(user)
    }

    return (
        <Container>
            <Grid container
                  height={"80vh"}
                  justifyContent={"center"}
                  alignItems={"center"}>
                <Grid>
                    <Box p={10}>
                        <Button onClick={login}
                            color={"warning"}
                            variant={"contained"}
                            style={{fontSize:"150%", padding:18}}
                            >
                            Войти с помощью Google
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;