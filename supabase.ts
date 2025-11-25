// Supabase Real-time Configuration
// GRATUITO e FÁCIL de configurar!

import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Credenciais do Supabase configuradas
const supabaseUrl = 'https://pnyovkzjmrggwtemxhep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueW92a3pqbXJnZ3d0ZW14aGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzM1NDYsImV4cCI6MjA3OTYwOTU0Nn0.9i9fdQoM-wjPioeDjetV-of_y3SsnNbeoeOZ2ZkChH8';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar se está configurado
export const isSupabaseConfigured = () => {
    return supabaseUrl !== 'https://seu-projeto.supabase.co' &&
        supabaseAnonKey !== 'sua-chave-anonima-aqui';
};

// Tipos
interface RealtimeMessage {
    id: string;
    room_id: string;
    user_id: string;
    username: string;
    text: string;
    avatar_color: string;
    created_at: string;
    reply_to_message_id?: string;
}

interface RealtimeRoom {
    id: string;
    name: string;
    icon: string;
    type: string;
    owner_id: string;
    created_at: string;
}

interface UserPresence {
    user_id: string;
    username: string;
    room_id: string;
    avatar_color: string;
    last_seen: string;
}

// Canal de presença global
let presenceChannel: RealtimeChannel | null = null;

// Enviar mensagem
export const sendRealtimeMessage = async (message: Omit<RealtimeMessage, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([{
            room_id: message.room_id,
            user_id: message.user_id,
            username: message.username,
            text: message.text,
            avatar_color: message.avatar_color,
            reply_to_message_id: message.reply_to_message_id
        }])
        .select();

    if (error) {
        console.error('Erro ao enviar mensagem:', error);
        return null;
    }
    return data?.[0];
};

// Escutar mensagens em tempo real
export const subscribeToMessages = (roomId: string, callback: (message: RealtimeMessage) => void) => {
    const channel = supabase
        .channel(`room:${roomId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `room_id=eq.${roomId}`
            },
            (payload) => {
                callback(payload.new as RealtimeMessage);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

// Criar sala
export const createRealtimeRoom = async (room: Omit<RealtimeRoom, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
        .from('rooms')
        .insert([room])
        .select();

    if (error) {
        console.error('Erro ao criar sala:', error);
        return null;
    }
    return data?.[0];
};

// Escutar novas salas
export const subscribeToRooms = (callback: (room: RealtimeRoom) => void) => {
    const channel = supabase
        .channel('rooms')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'rooms'
            },
            (payload) => {
                callback(payload.new as RealtimeRoom);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

// Atualizar presença do usuário
export const updateUserPresence = async (presence: UserPresence) => {
    const { error } = await supabase
        .from('user_presence')
        .upsert([{
            user_id: presence.user_id,
            username: presence.username,
            room_id: presence.room_id,
            avatar_color: presence.avatar_color,
            last_seen: new Date().toISOString()
        }], {
            onConflict: 'user_id'
        });

    if (error) {
        console.error('Erro ao atualizar presença:', error);
    }
};

// Escutar presença de usuários
export const subscribeToPresence = (callback: (users: UserPresence[]) => void) => {
    // Buscar presença inicial
    const fetchPresence = async () => {
        const { data } = await supabase
            .from('user_presence')
            .select('*')
            .gte('last_seen', new Date(Date.now() - 60000).toISOString()); // Últimos 60s

        if (data) {
            callback(data);
        }
    };

    fetchPresence();

    // Escutar mudanças
    const channel = supabase
        .channel('presence')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'user_presence'
            },
            () => {
                fetchPresence();
            }
        )
        .subscribe();

    // Atualizar a cada 30s
    const interval = setInterval(fetchPresence, 30000);

    return () => {
        supabase.removeChannel(channel);
        clearInterval(interval);
    };
};

// Carregar mensagens de uma sala
export const loadMessages = async (roomId: string, limit = 50) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Erro ao carregar mensagens:', error);
        return [];
    }

    return (data || []).reverse();
};

// Carregar salas
export const loadRooms = async () => {
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao carregar salas:', error);
        return [];
    }

    return data || [];
};

// Limpar presença ao sair
export const clearUserPresence = async (userId: string) => {
    await supabase
        .from('user_presence')
        .delete()
        .eq('user_id', userId);
};
