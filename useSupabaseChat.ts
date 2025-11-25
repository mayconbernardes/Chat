import { useEffect, useState, useCallback } from 'react';
import { Message, Room, User } from './types';
import {
    sendRealtimeMessage,
    subscribeToMessages,
    createRealtimeRoom,
    subscribeToRooms,
    updateUserPresence,
    subscribeToPresence,
    loadMessages,
    loadRooms,
    clearUserPresence,
    isSupabaseConfigured
} from './supabase';

export const useSupabaseChat = (currentUser: User | null, activeRoomId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>({});
    const [isConnected, setIsConnected] = useState(false);
    const isConfigured = isSupabaseConfigured();

    // Carregar mensagens iniciais
    useEffect(() => {
        if (!activeRoomId || !isConfigured) return;

        const fetchMessages = async () => {
            const data = await loadMessages(activeRoomId);
            setMessages(data.map(msg => ({
                id: msg.id,
                roomId: msg.room_id,
                userId: msg.user_id,
                text: msg.text,
                timestamp: new Date(msg.created_at).getTime(),
                replyToMessageId: msg.reply_to_message_id
            })));
        };

        fetchMessages();
    }, [activeRoomId, isConfigured]);

    // Escutar novas mensagens em tempo real
    useEffect(() => {
        if (!activeRoomId || !isConfigured) return;

        const unsubscribe = subscribeToMessages(activeRoomId, (newMessage) => {
            setMessages(prev => {
                // Evitar duplicatas
                if (prev.some(m => m.id === newMessage.id)) return prev;

                return [...prev, {
                    id: newMessage.id,
                    roomId: newMessage.room_id,
                    userId: newMessage.user_id,
                    text: newMessage.text,
                    timestamp: new Date(newMessage.created_at).getTime(),
                    replyToMessageId: newMessage.reply_to_message_id
                }];
            });
        });

        setIsConnected(true);

        return () => {
            unsubscribe();
        };
    }, [activeRoomId, isConfigured]);

    // Carregar salas iniciais
    useEffect(() => {
        if (!isConfigured) return;

        const fetchRooms = async () => {
            const data = await loadRooms();
            setRooms(data.map(room => ({
                id: room.id,
                name: room.name,
                icon: room.icon,
                type: room.type as any,
                ownerId: room.owner_id,
                participantIds: []
            })));
        };

        fetchRooms();
    }, [isConfigured]);

    // Escutar novas salas em tempo real
    useEffect(() => {
        if (!isConfigured) return;

        const unsubscribe = subscribeToRooms((newRoom) => {
            setRooms(prev => {
                // Evitar duplicatas
                if (prev.some(r => r.id === newRoom.id)) return prev;

                return [...prev, {
                    id: newRoom.id,
                    name: newRoom.name,
                    icon: newRoom.icon,
                    type: newRoom.type as any,
                    ownerId: newRoom.owner_id,
                    participantIds: []
                }];
            });
        });

        return () => {
            unsubscribe();
        };
    }, [isConfigured]);

    // Atualizar presença do usuário
    useEffect(() => {
        if (!currentUser || !activeRoomId || !isConfigured) return;

        const updatePresence = () => {
            updateUserPresence({
                user_id: currentUser.id,
                username: currentUser.username,
                room_id: activeRoomId,
                avatar_color: currentUser.avatarColor,
                last_seen: new Date().toISOString()
            });
        };

        // Atualizar imediatamente
        updatePresence();

        // Atualizar a cada 30 segundos
        const interval = setInterval(updatePresence, 30000);

        // Limpar ao desmontar
        return () => {
            clearInterval(interval);
            if (currentUser) {
                clearUserPresence(currentUser.id);
            }
        };
    }, [currentUser, activeRoomId, isConfigured]);

    // Escutar presença de outros usuários
    useEffect(() => {
        if (!isConfigured) return;

        const unsubscribe = subscribeToPresence((users) => {
            const locations: Record<string, string> = {};
            users.forEach(user => {
                locations[user.user_id] = user.room_id;
            });
            setOnlineUsers(locations);
        });

        return () => {
            unsubscribe();
        };
    }, [isConfigured]);

    // Enviar mensagem
    const sendMessage = useCallback(async (text: string, replyToId?: string) => {
        if (!currentUser || !isConfigured) return;

        await sendRealtimeMessage({
            room_id: activeRoomId,
            user_id: currentUser.id,
            username: currentUser.username,
            text,
            avatar_color: currentUser.avatarColor,
            reply_to_message_id: replyToId
        });
    }, [currentUser, activeRoomId, isConfigured]);

    // Criar sala
    const createRoom = useCallback(async (roomData: any) => {
        if (!currentUser || !isConfigured) return null;

        const room = await createRealtimeRoom({
            name: roomData.name,
            icon: roomData.icon,
            type: roomData.type,
            owner_id: currentUser.id
        });

        return room?.id || null;
    }, [currentUser, isConfigured]);

    return {
        messages,
        rooms,
        userLocations: onlineUsers,
        sendMessage,
        createRoom,
        isConnected: isConnected && isConfigured,
        isConfigured
    };
};
