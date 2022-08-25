import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { MessageContext } from '../context/message.context';
import Button from '../UI/button.component';
import './typing-area.style.scss';

const TypingArea = () => {
    const [isMessageBlank, setIsMessageBlank] = useState(false);

    const { currentMessage, setDisplayMessage, onChangeMessageHandler, setReplyClickHandler } =
        useContext(MessageContext);

    // 記使用者目前輸入的文字
    const setChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeMessageHandler(e.target.value);
    };

    // 使用者按下送出後記下留言
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 藉由清除 replyClick 來清除回覆區的 input
        setReplyClickHandler(null);

        // 判斷使用者有沒有輸入留言
        if (!currentMessage || currentMessage.trim().length === 0) {
            setIsMessageBlank(true);
            return;
        }

        setDisplayMessage(currentMessage);
        onChangeMessageHandler('');
        setIsMessageBlank(false);
    };

    return (
        <div className="typing-area-container">
            <form onSubmit={submitHandler} className="typing-area-form">
                <input
                    type="text"
                    id="message-input"
                    name="message-input"
                    placeholder={isMessageBlank ? '不可為空白或空白鍵' : '請輸入留言'}
                    onChange={setChangeMessage}
                    value={currentMessage}
                    className="message-input"
                />
                <Button className="typing-area-button">送出留言</Button>
            </form>
        </div>
    );
};

export default TypingArea;
