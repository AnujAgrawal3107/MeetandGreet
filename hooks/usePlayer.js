
import cloneDeep from 'lodash/cloneDeep';
import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'; // Import useEffect from React

const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const [players, setPlayers] = useState({});
  const router = useRouter();
  const playersCopy = cloneDeep(players);

  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy;

  const leaveRoom = () => {
    socket.emit('user-leave', myId, roomId);
    console.log('leaving room', roomId);
    peer?.disconnect();
    router.push('/');
  };

  const toggleAudio = () => {
    console.log('I toggled my audio');
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy[myId]) {
        copy[myId].muted = !copy[myId].muted;
      }
      return { ...copy };
    });
    socket.emit('user-toggle-audio', myId, roomId);
  };

  const toggleVideo = () => {
    console.log('I toggled my video');
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      if (copy[myId]) {
        copy[myId].playing = !copy[myId].playing;
      }
      return { ...copy };
    });
    socket.emit('user-toggle-video', myId, roomId);
  };

  // Ensure myId is added to players state when stream is set
  useEffect(() => {
    if (!myId) return;
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: null,
        muted: true,
        playing: true,
      },
    }));
  }, [myId]);

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  };
};

export default usePlayer;
