import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { SocketId } from "../helpers/socketId";

const useVideo = (info) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);
  const roomID = info.roomID;

  useEffect(() => {
    socketRef.current = SocketId[info.mode];
    navigator.mediaDevices
      .getUserMedia({
        video: { width: " 354.82px", height: "231.89px" },
        audio: true,
      })
      .then((stream) => {
        socketRef.current.emit("joinRtcRoom", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
    socketRef.current.on("delete-user", (outUser) => {
      setPeers((prev) => {
        const result = prev.filter((p) => {
          const deletePeer = peersRef.current.find((p) => p.peerID === outUser);
          return p._id !== deletePeer.peer._id;
        });
        return result;
      });
    });
    return () => {
      socketRef.current.emit("disconnect-signal");
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
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
      socketRef.current.emit("returning signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  }

  return peers;
};

export default useVideo;
