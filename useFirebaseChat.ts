import { useEffect, useState, useCallback } from 'react';
import { Message, Room, User } from './types';
import {
    authenticateUser,
    sendMessage as firebaseSendMessage,
    listenToMessages,
    listenToRooms,
    listenToUserLocations,
    updateUserLocation,
    registerUser,
    setUserOffline,
    createRoom as firebaseCreateRoom
} from './firebase';

export const useFirebaseChat = (currentUser: User | null, activeRoomId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [userLocations, setUserLocations] = useState<Record<string, string>>({});
    const [firebaseUserId, setFirebaseUserId] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    // Autenticar usuário ao montar
    useEffect(() => {
        const authenticate = async () => {
            const uid = await authenticateUser();
            if (uid) {
                setFirebaseUserId(uid);
                setIsConnected(true);
            }
        };
        authenticate();
    }, []);

    // Registrar usuário no Firebase quando autenticado
    useEffect(() => {
        if (firebaseUserId && currentUser) {
            registerUser(firebaseUserId, {
                username: currentUser.username,
                country: currentUser.country,
                avatarColor: currentUser.avatarColor,
                status: currentUser.status
            });

            // Marcar como offline ao sair
            return () => {
                setUserOffline(firebaseUserId);
            };
        }
    }, [firebaseUserId, currentUser]);

    // Escutar mensagens da sala ativa
    useEffect(() => {
        if (!activeRoomId || !isConnected) return;

        const unsubscribe = listenToMessages(activeRoomId, (firebaseMessages) => {
            setMessages(firebaseMessages);
        });

        return () => unsubscribe();
    }, [activeRoomId, isConnected]);

    // Escutar salas criadas
    useEffect(() => {
        if (!isConnected) return;

        const unsubscribe = listenToRooms((firebaseRooms) => {
            setRooms(firebaseRooms);
        });

        return () => unsubscribe();
    }, [isConnected]);

    // Escutar localizações de usuários
    useEffect(() => {
        if (!isConnected) return;

        const unsubscribe = listenToUserLocations((locations) => {
            setUserLocations(locations);
        });

        return () => unsubscribe();
    }, [isConnected]);

    // Atualizar localização do usuário quando mudar de sala
    useEffect(() => {
        if (firebaseUserId && activeRoomId && isConnected) {
            updateUserLocation(firebaseUserId, activeRoomId);
        }
    }, [firebaseUserId, activeRoomId, isConnected]);

    // Enviar mensagem
    const sendMessage = useCallback(async (text: string, replyToId?: string) => {
        if (!currentUser || !firebaseUserId || !isConnected) return;

        const message = {
            userId: currentUser.id,
            text,
            replyToMessageId: replyToId,
            username: currentUser.username,
            avatarColor: currentUser.avatarColor
        };

        await firebaseSendMessage(activeRoomId, message);
    }, [currentUser, firebaseUserId, activeRoomId, isConnected]);

    // Criar sala
    const createRoom = useCallback(async (roomData: any) => {
        if (!currentUser || !firebaseUserId || !isConnected) return null;

        const room = {
            ...roomData,
            ownerId: currentUser.id,
            createdAt: Date.now()
        };

        const roomId = await firebaseCreateRoom(room);
        return roomId;
    }, [currentUser, firebaseUserId, isConnected]);

    return {
        messages,
        rooms,
        userLocations,
        sendMessage,
        createRoom,
        isConnected,
        firebaseUserId
    };
};
