import React, {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {ChatMessageAPIType} from "../../api/chat-api";
import {RootState} from "../../redux/store";

import styles from './Chat.module.css'
import {Button} from "antd";

const Chat: FC = () => {

    const dispatch = useAppDispatch()


    const status = useAppSelector((state: RootState) => state.chat.status)


    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div className={styles.messagesWrapper}>
        {status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>
    </div>
}

const Messages: FC<{}> = ({}) => {
    const messages = useAppSelector((state: RootState) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div className={styles.messages} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}


const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo( ({message}) => {
    const {autorizedId} = useAppSelector((state: RootState) => state.auth)
    console.log(Number(message.userId))
    return <div className={Number(message.userId) === Number(autorizedId) ? styles.message + ' ' + styles.messageMe : styles.message}>
        <img src={message.photo} className={styles.userAvatar} alt='avatar'/>
        <div className={styles.messageBody}>
            <b>{message.userName}</b>
            {message.message}
        </div>

    </div>
})


const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()

    const status = useAppSelector((state: RootState) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div className={styles.addMessage}>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <Button type='primary' size='large' disabled={status !== 'ready'} onClick={sendMessageHandler}>Отправить</Button>
        </div>
    </div>
}

export default Chat