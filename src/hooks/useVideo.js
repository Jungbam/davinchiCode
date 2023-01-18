import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { socket } from "../helpers/socket";
import Chat from "../pages/game/ele/chat/Chat";

const useVideo = (roomID) => {
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: " 354.82px", height: "231.89px" },
        audio: true,
      })
      .then((stream) => {
        socket.emit("joinRtcRoom", roomID);
        socket.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socket.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socket.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socket.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
    socket.on("delete-user", (outUser) => {
      setPeers((prev) => {
        const result = prev.filter((p) => {
          const deletePeer = peersRef.current.find((p) => p.peerID === outUser);
          return p._id !== deletePeer.peer._id;
        });
        return result;
      });
    });
    return () => {
      socket.emit("disconnect-signal");
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  }

  return [peers, Chat];
};

export default useVideo;
