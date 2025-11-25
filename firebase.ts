// Firebase configuration
// IMPORTANTE: Você precisa criar um projeto no Firebase Console (https://console.firebase.google.com)
// e substituir estas configurações pelas suas próprias

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue, update, remove, serverTimestamp } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

// SUBSTITUA ESTAS CONFIGURAÇÕES PELAS SUAS DO FIREBASE
// Vá em: Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Autenticar anonimamente (cada usuário terá um ID único)
export const authenticateUser = async () => {
    try {
        const result = await signInAnonymously(auth);
        return result.user.uid;
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return null;
    }
};

// Referências do banco de dados
export const messagesRef = (roomId: string) => ref(database, `messages/${roomId}`);
export const roomsRef = () => ref(database, 'rooms');
export const usersRef = () => ref(database, 'users');
export const userLocationRef = (userId: string) => ref(database, `userLocations/${userId}`);

// Funções de mensagens
export const sendMessage = async (roomId: string, message: any) => {
    const messageRef = push(messagesRef(roomId));
    await set(messageRef, {
        ...message,
        timestamp: serverTimestamp()
    });
};

export const listenToMessages = (roomId: string, callback: (messages: any[]) => void) => {
    const unsubscribe = onValue(messagesRef(roomId), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const messagesArray = Object.entries(data).map(([id, msg]) => ({
                id,
                ...(msg as any)
            }));
            callback(messagesArray);
        } else {
            callback([]);
        }
    });
    return unsubscribe;
};

// Funções de salas
export const createRoom = async (room: any) => {
    const roomRef = push(roomsRef());
    await set(roomRef, room);
    return roomRef.key;
};

export const listenToRooms = (callback: (rooms: any[]) => void) => {
    const unsubscribe = onValue(roomsRef(), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const roomsArray = Object.entries(data).map(([id, room]) => ({
                id,
                ...(room as any)
            }));
            callback(roomsArray);
        } else {
            callback([]);
        }
    });
    return unsubscribe;
};

// Funções de usuários
export const updateUserLocation = async (userId: string, roomId: string) => {
    await set(userLocationRef(userId), {
        roomId,
        lastSeen: serverTimestamp()
    });
};

export const listenToUserLocations = (callback: (locations: Record<string, string>) => void) => {
    const unsubscribe = onValue(ref(database, 'userLocations'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const locations: Record<string, string> = {};
            Object.entries(data).forEach(([userId, location]: [string, any]) => {
                locations[userId] = location.roomId;
            });
            callback(locations);
        } else {
            callback({});
        }
    });
    return unsubscribe;
};

// Registrar usuário online
export const registerUser = async (userId: string, userData: any) => {
    await set(ref(database, `users/${userId}`), {
        ...userData,
        online: true,
        lastSeen: serverTimestamp()
    });
};

// Marcar usuário como offline ao sair
export const setUserOffline = async (userId: string) => {
    await update(ref(database, `users/${userId}`), {
        online: false,
        lastSeen: serverTimestamp()
    });
};

// Adicionar reação a mensagem
export const addReaction = async (roomId: string, messageId: string, emoji: string, userId: string) => {
    const reactionRef = ref(database, `messages/${roomId}/${messageId}/reactions/${emoji}`);
    const snapshot = await onValue(reactionRef, () => { }, { onlyOnce: true });
    // Implementar lógica de toggle de reação
};

export { database, auth };
