import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";
import { styled } from "styled-components";
import axios from "axios";
import url from "../../apis/url";
import { io } from "socket.io-client";

function Messege() {
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;

  let myId = localStorage.getItem("userId");
  let myMail = localStorage.getItem("user");
  const socket = useRef();
  const bottomRef = useRef(null);
  let [recId, setRecId] = useState();
  let [isChats, setisChats] = useState(false);
  let [getConvesation, setConversation] = useState([]);
  let [currentConvesation, setCurrentConversation] = useState([]);
  let [olderchat, setOlderChat] = useState([]);
  let [chatSession, setChatSession] = useState([]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConvesation]);
  useEffect(() => {
    // socket.current = io("ws://localhost:4000");
    socket.current = io("ws://backend-insta-socket.vercel.app/");
  }, []);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log("data", data);
      console.log("currentConvesation", currentConvesation);
      let dataToAdd = {
        conversationId: "1234567890-",
        sender: data.senderId,
        text: data.text,
      };
      setChatSession((prev) => [...prev, dataToAdd]);
      console.log(chatSession);
    });
  }, [chatSession]);
  useEffect(() => {
    socket.current.emit("addUser", myId);
  }, []);
  useEffect(() => {
    let id = myId;
    axios.get(url.chat_getConversation + id).then((myChats) => {
      if (myChats.data.length == 0) {
      }
      setisChats(true);
      setConversation(myChats.data);
    });
  }, []);
  // useEffect(() => {
  //   console.log(scrollRef.current.height)
  // }, [chatSession]);
  function handleGetChat(data) {
    let { _id, members } = data;
    console.log("first", data);
    let rId = members[0] == myId ? members[1] : members[0];
    setRecId(rId);
    setCurrentConversation(_id);
    axios.get(url.chat_getMsg + _id).then((data) => {
      console.log(data.data);
      setOlderChat(data.data);
    });
  }
  let [newMsg, setNewMsg] = useState("");
  function postMsg() {
    if (!newMsg) return alert("Empty");
    let dataToPost = {
      conversationId: currentConvesation,
      sender: myId,
      text: newMsg,
    };
    axios.post(url.chat_postMsg, dataToPost).then((res) => {
      let data = res.data;
      console.log(data);
      setNewMsg("");

      socket.current.emit("sendMessage", {
        senderId: myId,
        receiverId: recId,
        text: newMsg,
      });
      console.log(recId);
      let tempArray = chatSession;
      tempArray.push(dataToPost);
      setChatSession(tempArray);
      console.log(tempArray);
    });
  }
  return (
    <StyledContainer className="page">
      <div className="section-conversations">
        <h3>Conversation</h3>
        {getConvesation.map((conversation, i) => {
          let chatMail =
            conversation.membersMail[0] == myMail
              ? conversation.membersMail[1]
              : conversation.membersMail[0];
          return (
            <div key={i} onClick={() => handleGetChat(conversation)}>
              {chatMail}
            </div>
          );
        })}
      </div>
      {isChats && (
        <div className="section-chats">
          <div className="top" ref={bottomRef}>
            <h2>chats</h2>
            <p>Your new chat will apperar on top</p>
            <hr />
            <br />
            <div className="section-older-chat">
              {olderchat.map((msg, i) => {
                let isMe = msg.sender == myId ? "myChat" : "otherChat";
                return (
                  <div key={i} className={`chat ${isMe}`}>
                    <p className={``}>{msg.text}</p>
                  </div>
                );
              })}
              {chatSession.map((msg, i) => {
                console.log("I am rendering");
                let isMe = msg.sender == myId ? "myChat" : "otherChat";
                return (
                  <div key={i} className={`chat ${isMe}`}>
                    <p className={``}>{msg.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="Enter our Messeg"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <button onClick={postMsg}>Send</button>
          </div>
        </div>
      )}
      {!isChats && (
        <div>
          <h3>Go to user any profile and start chating</h3>
          <p>You have no conversations till now</p>
        </div>
      )}
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  flex: 1;
  text-align: center;
  display: flex;
  padding: 0px 0px;
  .section-conversations {
    min-width: 160px;
    max-width: 125px;
    overflow: hidden;
    padding: 50px 0;
    border-right: 1px solid lightgray;
  }
  .section-chats {
    position: relative;
    flex: 1;
    .top {
      overflow: scroll;
      max-height: 100vh;
      .section-older-chat {
        display: flex;
        flex-direction: column-reverse;
      }
    }
    .chat {
      display: flex;
      margin: 0 10px;
      p {
        padding: 3px 30px;
        margin: 1px;
        border-radius: 20px;
      }
    }
    .otherChat {
      justify-content: start;
      p {
        background-color: lightgray;
        border: 1px solid lightgray;
      }
    }
    .myChat {
      justify-content: end;
      p {
        border: 1px solid whitesmoke;
        background-color: whitesmoke;
      }
    }
    .bottom {
      width: 100%;
      position: absolute;
      bottom: 0px;
      height: 50px;
      background-color: aliceblue;
      padding:10px;
      input,button{
        height: 25px;
        padding: 4px 10px;
        margin: 5px;
      }
    }
  }
`;
export default Messege;
