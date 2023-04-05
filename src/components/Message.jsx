import React from 'react';
import {Avatar, Grid} from "@mui/material";

const Message = ({message, user}) => {
    return (
        <div
            style={{
                margin: 20,
                padding: 8,
                border: user.uid === message.uid
                    ? "2px solid green"
                    : "2px solid black",
                borderRadius: 5,
                marginLeft: user.uid === message.uid
                    ? "auto"
                    : "10px",
                width: "fit-content",
                maxWidth: "50%",
            }}>
            <Grid
                container
                alignItems={"center"}>
                <Avatar src={message.photoURL}/>
                <div>{message.displayName}</div>
            </Grid>
            <div style={{padding: 4, whiteSpace: "pre-wrap", overflowWrap: "break-word"}}>
                {message.text}
            </div>
        </div>
    );
};

export default Message;