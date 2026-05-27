import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "../../src/assets/style.css"
import Cartdrawer from "./Cartdrawer.jsx";
const socket = io("http://localhost:3000");

function Chatpage() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {

        const data = {
            text: message,
            time: new Date().toLocaleTimeString()
        };

        socket.emit("send_message", data);

        setMessage("");
    };
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    return (
        <>
            <Cartdrawer open={true} onClose={() => {}} />

            <div className="errorsSide">
            </div>

            <div className="shareLink">
                <div className="welcomeMess" style={{ marginTop: 0 }}>
                    <div className="img"><video src="https://res.cloudinary.com/duw2s4w0s/video/upload/v1620962563/HO%20TV%20assets/ezgif-6-38fc0e6aefa8_owq33f.mp4" alt="brainstorm video" autoplay muted></video></div>
                    <h1 className="roomTitle">Vikas Prasad</h1>
                    <p id="copyLinker2" className="copyLinker2">#4987720</p>
                </div>
                <input id="copyvalue" type="text" value="#4987720" />
                <button id="copyLinker">Copy Code</button>
            </div>

            <div className="nameAlert"><h1>Enter your Name</h1><input id="name" type="text" placeholder="Enter your Name" /></div>

            <div className="mainChater">
                <div className="headerDet">
                    <div className="chatDety">
                        <div className="img"><video src="https://res.cloudinary.com/duw2s4w0s/video/upload/v1620962563/HO%20TV%20assets/ezgif-6-38fc0e6aefa8_owq33f.mp4" alt="brainstorm video" autoplay muted></video></div>
                        <div className="nameC">
                            <p className="roomTitle" id='titleFirst'>Vikas Prasad</p>
                            <input type="text" name="room name" id="roomNameInput" className="roomTitle" value="Its BrainStorming" />
                        </div>
                    </div>

                    <div className="tools">
                        <button id="groupEdit" tooltip="Google Meet" flow="left"><span className="material-icons blueClick">mode_edit</span></button>
                        <button id="settings" tooltip="Room Settings" flow="left"><span className="material-icons blueClick">settings</span></button>
                    </div>
                </div>

                <div className="blackout"></div>

                <div className="chatArea changeW">
                    <div className="chatMessages">

                        <div className="welcomeMess">
                            <div className="img"><video src="https://res.cloudinary.com/duw2s4w0s/video/upload/v1620962563/HO%20TV%20assets/ezgif-6-38fc0e6aefa8_owq33f.mp4" alt="brainstorm video" autoplay></video></div>
                            <h1 className="roomTitle">Vikas Prasad</h1>
                            <p id="copyLinker2" className="copyLinker2"></p>
                        </div>

                        <div className="message">
                            <div className="prof"><p></p></div>
                            <div className="messArea">
                                <p id="sname">Lance Francisco | Team Poster</p>
                                <div className="textM">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quasi quas aliquam commodi quaerat sit reiciendis dignissimos quam totam nemo.</div>
                                </div>
                        </div>

                        <div className="message mMess 1122334" data-number="1122334">
                            <div className="messArea">
                                <p id="sname">James Ericson</p>
                                <div className="textM">Lorem ipsum dolor sit, amet consectetur adipisicing elit. https://mi.com. Dignissimos omnis illum voluptates sed provident saepe?.</div></div>
                            <div className="prof" style={{ backgroundColor: '#ff7b54' }}><p>J</p></div>
                        </div>

                        {messages.map((chatMessage, index) => (
                            <div className="message mMess" key={`${chatMessage.time}-${index}`}>
                                <div className="messArea">
                                    <p id="sname">Live Message</p>
                                    <div className="textM">{chatMessage.text}</div>
                                </div>
                                <div className="prof" style={{ backgroundColor: '#ff7b54' }}>
                                    <p>{chatMessage.text?.[0]?.toUpperCase() || "M"}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="messageBox">
                        <button id="genMeetLink" className=" button-s1" tooltip="Google Docs" flow="right"><a href="https://docs.google.com/document/u/0/create" target="blank"><span className="material-icons">description</span></a></button>
                        <button id="genMeetLink" className=" button-s1" tooltip="Google Meet" flow="right"><a href="https://meet.google.com/new" target="blank"><span className="material-icons">video_call</span></a></button>
                        <button id="linkCopy" className="button-s1" tooltip="Copy Link" flow="up"><span className="material-icons">link</span></button>
                        <div className="textA">
                            <textarea
                                id="message"
                                name="message"
                                rows="1"
                                cols="30"
                                placeholder="Type your message here"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                            ></textarea>
                        </div>
                        <button
                            id="send"
                            className="button-s1"
                            tooltip="Send"
                            flow="left"
                            onClick={sendMessage}
                        >
                            <span className="material-icons headerIcon">send</span>
                        </button>
                    </div>
                    <div id="goToDown" className="downDowny"><span className="material-icons" >arrow_downward</span></div>
                </div>

                <div className="settingsBar">

                    <div className="headerSet">
                        <div className="welcomeMess">
                            <div className="img"><video src="https://res.cloudinary.com/duw2s4w0s/video/upload/v1620962563/HO%20TV%20assets/ezgif-6-38fc0e6aefa8_owq33f.mp4" alt="brainstorm video" alt="brainstorm video" autoplay></video></div>
                            <h1 className="roomTitle">Vikas Prasad</h1>
                            <p id="copyLinker2">#4987720</p>
                        </div>
                    </div>

                    <div className="membersSec">
                        <h1>Members</h1>
                        <ul id="membersList">
                            <li className="membersCont"><div className="prof" style={{ backgroundColor: '#ffb26b' }}><p>A</p></div></li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Chatpage;
