// import ChatList from "../component/chat-list.component";
import TypingArea from '../component/typing-area.component';
import './message-board.style.scss';
import ChatList from '../component/chat-list.component';
import { MessageContext } from '../context/message.context';
import { useContext } from 'react';
import { DisplayMessageType } from '../context/message.context';

const MessageBoard = () => {
    const { displayMessage } = useContext(MessageContext);

    return (
        <div className="message-container">
            <TypingArea />
            <div className="chat-list-scroll">
                {displayMessage &&
                    displayMessage.map((item: DisplayMessageType, index: number) => {
                        return <ChatList item={item} index={index} key={index} />;
                    })}
            </div>
        </div>
    );
};

export default MessageBoard;
