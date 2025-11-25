-- ============================================
-- EXECUTE ESTE SQL NO SUPABASE SQL EDITOR
-- ============================================

-- 1. Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  text TEXT NOT NULL,
  avatar_color TEXT NOT NULL,
  reply_to_message_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS messages_room_id_idx ON messages(room_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at DESC);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- ============================================

-- 2. Tabela de salas
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice
CREATE INDEX IF NOT EXISTS rooms_created_at_idx ON rooms(created_at DESC);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;

-- ============================================

-- 3. Tabela de presença de usuários
CREATE TABLE IF NOT EXISTS user_presence (
  user_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  room_id TEXT NOT NULL,
  avatar_color TEXT NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS user_presence_last_seen_idx ON user_presence(last_seen DESC);
CREATE INDEX IF NOT EXISTS user_presence_room_id_idx ON user_presence(room_id);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE user_presence;

-- ============================================

-- 4. Políticas de Segurança (RLS) - MODO PÚBLICO PARA TESTE
-- ATENÇÃO: Em produção, você deve criar políticas mais restritivas!

-- Desabilitar RLS temporariamente para teste
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE rooms DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_presence DISABLE ROW LEVEL SECURITY;

-- OU, se preferir manter RLS ativo com acesso público:
/*
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_presence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso público a mensagens" ON messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público a salas" ON rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público a presença" ON user_presence FOR ALL USING (true) WITH CHECK (true);
*/

-- ============================================
-- PRONTO! Agora faça o deploy e teste!
-- ============================================
