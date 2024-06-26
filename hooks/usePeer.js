import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';

const usePeer = () => {
  const socket = useSocket();
  const { query: { roomId } } = useRouter();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState('');
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;

    const initPeer = async () => {
      try {
        const { default: Peer } = await import('peerjs');
        const myPeer = new Peer();
        setPeer(myPeer);

        myPeer.on('open', (id) => {
          console.log(`Your peer id is ${id}`);
          setMyId(id);
          socket?.emit('join-room', roomId, id);
        });
      } catch (error) {
        console.error('Failed to initialize Peer:', error);
      }
    };

    initPeer();
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
