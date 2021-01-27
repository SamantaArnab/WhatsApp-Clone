import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import db from "./firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot(snapshot => setRoomName(snapshot.data().name));
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot =>
        setMessages(snapshot.docs.map(doc => doc.data()))
      );
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {" "}{new Date((messages.length && messages[messages.length - 1].timestamp)? messages[messages.length - 1].timestamp.toDate():null).toUTCString()}</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map(message => (
          <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{new Date(message.timestamp && message.timestamp.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={input}
            placeholder="Type a message"
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
