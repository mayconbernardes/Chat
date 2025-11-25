-- DIAGNÓSTICO COMPLETO DO SUPABASE
-- Execute este SQL no Supabase SQL Editor e me mostre o resultado

-- 1. Verificar se as tabelas existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('messages', 'rooms', 'user_presence');

-- 2. Verificar se Realtime está habilitado
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
AND tablename IN ('messages', 'rooms', 'user_presence');

-- 3. Verificar RLS (Row Level Security)
SELECT tablename, 
       CASE WHEN rowsecurity THEN 'ENABLED' ELSE 'DISABLED' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('messages', 'rooms', 'user_presence');

-- 4. Contar mensagens existentes
SELECT COUNT(*) as total_messages FROM messages;

-- 5. Contar usuários presentes
SELECT COUNT(*) as total_users FROM user_presence;

-- 6. Ver últimas mensagens (se houver)
SELECT * FROM messages ORDER BY created_at DESC LIMIT 5;

-- 7. Ver usuários presentes (se houver)
SELECT * FROM user_presence ORDER BY last_seen DESC LIMIT 5;
