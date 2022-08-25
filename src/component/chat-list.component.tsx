import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { MessageContext } from '../context/message.context';
import './chat-list.style.scss';
import { DisplayMessageType } from '../context/message.context';
import Button from '../UI/button.component';

type Props = {
    item: DisplayMessageType;
    index: number;
};

const ChatList = ({ item, index }: Props) => {
    const {
        displayMessage,
        replyClick,
        replyMessage,
        setReplyMessage,
        setReplyClickHandler,
        replyPushHandler,
    } = useContext(MessageContext);

    const [isMessageBlank, setIsMessageBlank] = useState(false);

    // 利用 index 搭配回覆留言按鈕判斷在哪一個留言 ( for 訊息回覆功能)
    const replayCheckHandler = (index: number) => {
        setReplyClickHandler(index);
    };

    // 記下使用者目前針對留言的回覆
    const replayMessageHander = (e: ChangeEvent<HTMLInputElement>) => {
        setReplyMessage(e.target.value);
    };

    // 使用者按下送出回覆後，利用 index 判斷在哪個留言，把留言推進該陣列
    const replyPushToDisplayMessageHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!replyMessage || replyMessage.trim().length === 0) {
            setIsMessageBlank(true);
            return;
        }

        replyPushHandler(replyClick, replyMessage);
        setReplyMessage('');
        setIsMessageBlank(false);
    };

    return (
        <div className="chat-list-container">
            <h1 className="message">
                {`${displayMessage.length - index - 1 + 1}. ${item.message}`}
            </h1>

            {item.reply.map((reply: String, index: number) => {
                return (
                    <p className="reply-message" key={index}>
                        {reply}
                    </p>
                );
            })}

            <Button
                style={{ display: replyClick === index ? 'none' : '' }}
                onClick={() => replayCheckHandler(index)}
                className="haha"
            >
                點擊回覆留言
            </Button>

            {replyClick === index && (
                <form onSubmit={replyPushToDisplayMessageHandler} className="reply-message-form">
                    <input
                        type="text"
                        id="reply-message"
                        name="reply-message"
                        placeholder={isMessageBlank ? '不可為空白或空白鍵' : '請輸入回覆'}
                        onChange={replayMessageHander}
                        value={replyMessage}
                        className="reply-message-input"
                    />
                    <Button>送出留言</Button>
                </form>
            )}
        </div>
    );
};

export default ChatList;
