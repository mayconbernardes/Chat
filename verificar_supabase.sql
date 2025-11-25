-- VERIFICAR E CORRIGIR REALTIME + RLS
-- Execute este SQL no Supabase SQL Editor

-- 1. Verificar se Realtime está habilitado
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Se as tabelas messages, rooms, user_presence NÃO aparecerem acima,
-- execute os comandos abaixo:

-- 2. Habilitar Realtime (execute mesmo se já estiver habilitado)
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE user_presence;

-- 3. Desabilitar RLS (Row Level Security) para teste
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE rooms DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_presence DISABLE ROW LEVEL SECURITY;

-- 4. Verificar se funcionou
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Deve aparecer:
-- public | messages
-- public | rooms  
-- public | user_presence

-- 5. Teste: Inserir uma mensagem manualmente
INSERT INTO messages (room_id, user_id, username, text, avatar_color)
VALUES ('general', 'test-user', 'Test User', 'Teste de mensagem!', '#FF5733');

-- 6. Verificar se a mensagem foi inserida
SELECT * FROM messages ORDER BY created_at DESC LIMIT 5;
