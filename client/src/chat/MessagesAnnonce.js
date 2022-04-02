import React, { useState, useEffect } from "react";
import { Paper, List, ListItem, ListItemText, FormControl, TextField, IconButton, Container, Typography, CircularProgress } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import { Box } from "@mui/system"
import { useRef } from "react";
import { ChatMessageDto } from './model/ChatMessageDto'
import { useSelector } from 'react-redux';
import { Button, OutlinedInput, InputAdornment } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import Style from './Chat.module.scss';
import * as Yup from 'yup';
/* 
import PriceAnnonceMessage from './model/PriceAnnonceMessage';
*/

const MessagesAnnonce = () => {

    const urlMessage = "http://localhost:5000/message";
    const urlAnnonce = "http://localhost:5000/annonces/price";
    const urlGetMessageBdd = "http://localhost:5000/message";

    /* -------------------------------------------------------------------------- */
    /*                                    REDUX                                   */
    /* -------------------------------------------------------------------------- */

    /* Recuperation des data du store */
    const { user } = useSelector(state => state.app)
    const { loading, error, data, selected } = useSelector(state => state.annonces);

    /* -------------------------------------------------------------------------- */
    /*                                     YUP                                    */
    /* -------------------------------------------------------------------------- */
    /* Yup permet de vérifier les données et envoyer un message d'erreur à l'utilisateur */
    const userSchema = Yup.object().shape({
        int: Yup.number()
        .typeError('')
        .positive('')
        .required('')
        .max(99999, '')
        .min(10, '')
    })

    /* -------------------------------------------------------------------------- */
    /*                                    Input                                   */
    /* -------------------------------------------------------------------------- */
    /* On custom l'input price, cela permet aussi de rendre le code moins verbeux */
    const inputPrice = ({ field, form, ...props }) => {
        return (
            <>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="int"
                    className={ Style.inputPrice }
                    startAdornment={<InputAdornment position="start" className='sizeEuros' >€</InputAdornment>}
                    label="Montant"
                    { ...field }
                />
                <div className={ Style.divError }>
                    <ErrorMessage name='int' component={ CustomError } />
                </div>
            </>
        )
    }

    /* -------------------------------------------------------------------------- */
    /*                                    Error                                   */
    /* -------------------------------------------------------------------------- */
    /* On custom l'input Erorr pour afficher les erreur que YUP a détecté */
    const CustomError = (props) => {
        return (
            <span>{ props.children }</span>
        )
    }

    /* -------------------------------------------------------------------------- */
    /*                                Submit Price                                */
    /* -------------------------------------------------------------------------- */

    const submit = (values, actions) => {
        /* Création de l'object pour envois en bdd */
        const price = { 
            priceAnnonceMessage: values.int, 
            usersMessage: 'Pour votre l\'object que vous recherchez dans votre annonce, je vous le vend pour ' + values.int + ' euros', 
            idUsersMessage: user.userId, 
            idAnnonceSend: data[selected].id,
            idUsersSend: data[selected].annonceUser,
        }

        
        /* Insertion de la demmande de prix dans la base de données */
        fetch(urlAnnonce,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(price)
        }
        ).then(() =>{
            console.log('Demmande de prix envoyé !')
            actions.resetForm()
            actions.setSubmitting(false)

            /* Création de l'envois du message */
            webSocket.current.onmessage = (e) => {
                const chatMessagesDto = JSON.parse(e.data);
                console.log('Message: ', chatMessagesDto);
                setChatMessages([
                    ...chatMessages, {
                        user: chatMessagesDto.user,
                        message: chatMessagesDto.message
                    }
                ])
            }

            if(userState && values.int) {
                /* Envois du message */
                console.log("SEND !")
                webSocket.current.send(
                    JSON.stringify(new ChatMessageDto(userState, 'Pour votre l\'object que vous recherchez dans votre annonce, je vous le vend pour ' + values.int + ' euros'))
                );
            }
        })
        
    }

    /* -------------------------------------------------------------------------- */
    /*                                 WEB SOCKET                                 */
    /* -------------------------------------------------------------------------- */
    /* On déclare les useState pour l'envois des message avec websocket */
    const webSocket = useRef(null)
    const [chatMessages, setChatMessages] = useState([]);
    const [userState, setUserState] = useState(user.userId);
    const [message, setMessage] = useState('');

    
    useEffect(() => {
        console.log('Opening Websocket')
        webSocket.current = new WebSocket('ws://127.0.0.1:8000')
        webSocket.current.onopen = (event) => {
            console.log('Open:', event);
        }
        webSocket.current.onclose = (event) => {
            console.log('Close:', event);
        }
        return() => {
            console.log('Closing Websocket')
            webSocket.current.close()
        }
    }, []);

    useEffect(() => {
        webSocket.current.onmessage = (e) => {
            const chatMessagesDto = JSON.parse(e.data);
            console.log('Message: ', chatMessagesDto);
            setChatMessages([
                ...chatMessages, {
                    user: chatMessagesDto.user,
                    message: chatMessagesDto.message
                }
            ])
        }
    }, [chatMessages]);
    
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        /* On prepare l'object pour l'envoyé au back end */
        const messageBdd = { 
            usersMessage: message, 
            idUsersMessage: user.userId, 
            idUsersSend: data[selected].annonceUser,
            idAnnonceSend: data[selected].id
        }

        if(userState && message) {
            console.log("SEND !")
            webSocket.current.send(
                JSON.stringify(new ChatMessageDto(userState, message))
            );
            setMessage('');
        }

        fetch(urlMessage,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(messageBdd)
        }
        ).then(() =>{
            console.log('message envoyé en bdd !')
        })
    }

    /* -------------------------------------------------------------------------- */
    /*                Récupération des données du chat dans la bdd                */
    /* -------------------------------------------------------------------------- */
    const [chatMessagesBdd, setChatMessagesBdd] = useState([]);

    useEffect(() => {
        fetch(urlGetMessageBdd,
            {
                method: 'GET',
                headers: { 'idUsersMessage': user.userId, 'idSendMessage': data[selected].annonceUser, 'idAnnonceSend': data[selected].id, 'Content-Type': 'application/json'},
            }
            )
            .then(res => res.json())
            .then(messageSendBdd => {
                console.log('Message Bdd de la conversation')
                if (messageSendBdd.success === true) {
                    setChatMessagesBdd(messageSendBdd.result)
                }
            })
    }, []);


    ///////////////////////////////////////////////////////////////////////////////
    /* List des message du chat */
    /* Message récupéré depuis la BDD */

    const listChatMeassagesBdd = chatMessagesBdd.map((message, index) => 
        <ListItem key={ index } className={ Style.listItemsChat } >
            <ListItemText 
                primary={`${message.usersMessage}`} 
                className={ Style.chat } 
                style={{ 
                    justifyContent: userState === message.idUsersMessage ? 'flex-end' : 'flex-start', 
                    margin: userState === message.idUsersMessage ? '4px 0px 4px 40px' : '4px 40px 4px 0px' 
                }} 
            />
        </ListItem>
    )

    /* Message envoyé depuis l'input */ 
    const listChatMeassages = chatMessages.map((chatMessagesDto, index) => 
        <ListItem key={ index } className={ Style.listItemsChat } >
            <ListItemText 
                primary={`${chatMessagesDto.message}`} 
                className={ Style.chat } 
                style={{ 
                    justifyContent: userState === chatMessagesDto.user ? 'flex-end' : 'flex-start', 
                    margin: userState === chatMessagesDto.user ? '4px 0px 4px 40px' : '4px 40px 4px 0px' 
                }} 
            />
        </ListItem>
    )

    return (
        <>
            <Container className={ Style.containerChat } >
                <Paper elevation={0}>
                {data.length ? (
                    <>
                        <div className={ Style.containerHeadChat }>
                            <div className={ Style.headChatColumn}>
                                <div className={ Style.headChat }>
                                    <img width="35" height="35" src={ data[selected].annonceImage } alt="imageannonce"/>
                                    <div className={ Style.personDescription }>
                                        <span className= { Style.userNameDescription }>{ data[selected].annonceName }</span>
                                        <h5>{ data[selected].annonceCategory }</h5>
                                    </div>
                                </div>
                                <Typography variant="h4" gutterBottom className={ Style.titleDescription }>
                                    { data[selected].annonceTitle }
                                </Typography>
                            </div>
                            <div className={ Style.formPriceAnnonceContainer }>
                                <div>
                                    <Formik
                                        onSubmit={submit}
                                        initialValues={{ int: ''}}
                                        validationSchema={ userSchema }
                                        validateOnBlur={ false }
                                    >{ ({
                                        handleSubmit,
                                        isSubmitting
                                    }) => (
                                        <form onSubmit={ handleSubmit } className={ Style.formControl } >

                                            {/* Montant */}
                                            <div className={ Style.containerInput }>
                                                <Field name='int' component={ inputPrice } />
                                            </div>
                                            <Button type="submit" variant="contained" size='small' disabled={ isSubmitting } disableElevation>Faire une offre</Button>
                                        </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <Box p={3} className={ Style.boxChat } >
                            <div className={ Style.containerItemsChat }>
                                <div className={ Style.containerListChat } >
                                    <List id={ Style.chatWindowMessages }>
                                        {listChatMeassagesBdd}
                                        {listChatMeassages}
                                    </List>
                                </div>
                                <div className={ Style.containerSendChat } >
                                    <div className={ Style.messageChat }>
                                        <FormControl fullWidth>
                                            <TextField 
                                                onChange={handleMessageChange}
                                                value={message}
                                                label="Entrer votre message"
                                                variant="outlined"
                                                size="Normal"
                                                onKeyPress={(event) => { if(event.key === 'Enter') {
                                                    sendMessage()
                                                }}}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className={ Style.buttonSendChat}>
                                        <IconButton onClick={ sendMessage } aria-label="send" className={ Style.buttonIcon }>
                                            <SendIcon className={ Style.buttonSend } />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </>
                ) : 
                (
                    <div className={ Style.loadingContainerDescriptionChat }>
                        <CircularProgress />
                    </div>
                )}
                </Paper>
            </Container>
        </>
    );
}

export default MessagesAnnonce;





