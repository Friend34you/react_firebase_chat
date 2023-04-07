import React, {useContext, useEffect, useRef, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import {Context} from "../index";
import {Button, Container, Grid, TextField} from "@mui/material";
import Message from "./Message";

const Chat = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");
    const [messagesData, setMessagesData] = useState([]);
    const textRef = useRef()
    const scrollRef = useRef()

    function onChange(e) {
        setValue(e.target.value)
    }

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "messages"), {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: serverTimestamp(),
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setValue("");
    };

    const getMessages = async () => {
        const q = query(collection(firestore, "messages"), orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            setMessagesData([]);

            querySnapshot.docs.map((doc) => {
                setMessagesData((prevState) => {
                    return [...prevState, doc.data()];
                });
            });
        });
    };


    useEffect(() => {
        let node = textRef.current;
        const onKeyDown = e => {
            if (e.keyCode === 13) {
                sendMessage();
                scrollRef.current.scrollIntoView({block: "end", inline: "nearest" });
            }
        }

        node.addEventListener('keydown', onKeyDown);
        return function () {
            node.removeEventListener('keydown', onKeyDown);
        };
    }, [value, setValue]);

    useEffect(() => {
        getMessages();
    }, [messagesData, setMessagesData]);

    return (
        <Container>
            <Grid container
                  height={"90vh"}
                  justifyContent={"center"}
                  alignItems={"center"}
            >
                <div style={{
                    width: "80%",
                    height: "70vh",
                    overflowY: "auto",
                    border: "2px solid grey",
                    borderRadius: 8
                }}>
                    {messagesData.map((message, index) =>
                        <Message
                            innerRef={index === messagesData.length - 1 ? scrollRef : null }
                            key={message.createdAt}
                            user={user}
                            message={message}
                        />
                    )}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    width={"80%"}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={2}
                        value={value}
                        ref={textRef}
                        onChange={onChange}/>
                    <Button onClick={sendMessage} type={"submit"}>Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;