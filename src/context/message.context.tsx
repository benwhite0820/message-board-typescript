import { createContext, useReducer } from 'react';

enum MESSAGE_ACTION_TYPE {
    SET_CURRENT_MESSAGE = 'SET_CURRENT_VALUE',
    SET_DISPLAY_MESSAGE = 'SET_DISPLAY_MESSAGE',
    SET_REPLY_CLICK = 'SET_REPLY_CLICK',
    SET_REPLY_MESSAGE = 'SET_REPLY_MESSAGE',
    SET_REPLY_ARRAY_PUSH = 'SET_REPLY_ARRAY_PUSH',
}

const INITIAL_VALUE: MessageState = {
    currentMessage: '',
    displayMessage: [],
    replyClick: null,
    replyMessage: '',
};

export type DisplayMessageType = {
    message: string;
    reply: Array<string>;
};

type MessageState = {
    currentMessage: any;
    displayMessage: any;
    replyClick: any;
    replyMessage: any;
};

type MessageAction = {
    type: string;
    payload: string | number | Array<DisplayMessageType> | null;
};

const messageReducer = (state: MessageState, action: MessageAction) => {
    const { displayMessage } = state;

    const { type, payload } = action;

    switch (type) {
        case 'SET_CURRENT_VALUE':
            return {
                ...state,
                currentMessage: payload,
            };
        case 'SET_DISPLAY_MESSAGE':
            return {
                ...state,
                displayMessage: [{ message: payload, reply: [] }, ...displayMessage],
            };
        case 'SET_REPLY_CLICK':
            return {
                ...state,
                replyClick: payload,
            };
        case 'SET_REPLY_MESSAGE':
            return {
                ...state,
                replyMessage: payload,
            };
        case 'SET_REPLY_ARRAY_PUSH':
            return {
                ...state,
                payload,
            };
        default:
            return state;
    }
};

export const MessageContext = createContext({
    currentMessage: '',
    displayMessage: [],
    replyClick: null,
    replyMessage: '',
    onChangeMessageHandler: (message: string) => {},
    setDisplayMessage: (message: string) => {},
    setReplyClickHandler: (index: number | null) => {},
    setReplyMessage: (message: string) => {},
    replyPushHandler: (index: any, message: string) => {},
});

export type PropsChildren = {
    children: React.ReactNode;
};

export const MessageProvider = ({ children }: PropsChildren) => {
    const [state, dispatch] = useReducer(messageReducer, INITIAL_VALUE);

    const { currentMessage, displayMessage, replyClick, replyMessage } = state;

    // 記使用者目前輸入的文字
    const onChangeMessageHandler = (message: string): void => {
        dispatch({
            type: MESSAGE_ACTION_TYPE.SET_CURRENT_MESSAGE,
            payload: message,
        });
    };

    // 使用者按下送出後記下留言
    const setDisplayMessage = (message: string): void => {
        dispatch({
            type: MESSAGE_ACTION_TYPE.SET_DISPLAY_MESSAGE,
            payload: message,
        });
    };

    // 利用 index 搭配按鈕判斷在哪一個留言 ( for 訊息回覆功能)
    const setReplyClickHandler = (index: number | null): void => {
        dispatch({
            type: MESSAGE_ACTION_TYPE.SET_REPLY_CLICK,
            payload: index,
        });
    };

    // 記下使用者目前針對留言的回覆
    const setReplyMessage = (message: string): void => {
        dispatch({
            type: MESSAGE_ACTION_TYPE.SET_REPLY_MESSAGE,
            payload: message,
        });
    };

    // 使用者按下送出回覆後，利用 index 判斷在哪個留言，把留言推進該陣列
    const replyPushHandler = (index: number, message: string): void => {
        displayMessage[index].reply.unshift(message);
        dispatch({
            type: MESSAGE_ACTION_TYPE.SET_REPLY_ARRAY_PUSH,
            payload: displayMessage,
        });
    };

    const value = {
        currentMessage,
        displayMessage,
        replyClick,
        replyMessage,
        onChangeMessageHandler,
        setDisplayMessage,
        setReplyClickHandler,
        setReplyMessage,
        replyPushHandler,
    };

    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};
