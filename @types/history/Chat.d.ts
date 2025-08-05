import Transaction from "./Transaction";

type ChatMessage = {
    message: string;
    timestamp: Date;
    transactionId: Transaction['id'];
}

export default ChatMessage;