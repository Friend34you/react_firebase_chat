import React, {useContext} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

function MenuIcon() {
    return null;
}

const Navbar = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth)

    const signOut = () => auth.signOut();

    return (
        <AppBar color={"secondary"} position="static">
            <Toolbar variant="dense">
                <Grid container justifyContent={"flex-end"}>
                    {user
                        ?
                        <Button onClick={signOut}
                                variant={"outlined"}
                                color={'warning'}>
                            Logout
                        </Button>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={"outlined"} color={'warning'}>Login</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;