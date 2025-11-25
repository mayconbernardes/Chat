# 🔥 Guia de Configuração do Firebase para ChatZa

## Passo 1: Criar Projeto no Firebase

1. Acesse: https://console.firebase.google.com
2. Clique em "Adicionar projeto" ou "Add project"
3. Nome do projeto: `chatza` (ou o nome que preferir)
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

## Passo 2: Configurar Realtime Database

1. No menu lateral, clique em "Realtime Database"
2. Clique em "Criar banco de dados" ou "Create database"
3. Escolha a localização: `us-central1` (ou mais próxima de você)
4. Modo de segurança: **Iniciar em modo de teste** (por enquanto)
5. Clique em "Ativar"

## Passo 3: Configurar Regras de Segurança

1. Na aba "Regras" do Realtime Database
2. Cole estas regras (permitem leitura/escrita para todos):

```json
{
  "rules": {
    "messages": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    },
    "rooms": {
      ".read": true,
      ".write": true
    },
    "users": {
      ".read": true,
      "$userId": {
        ".write": "$userId === auth.uid || auth != null"
      }
    },
    "userLocations": {
      ".read": true,
      "$userId": {
        ".write": "$userId === auth.uid || auth != null"
      }
    }
  }
}
```

3. Clique em "Publicar"

## Passo 4: Ativar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar" ou "Get started"
3. Na aba "Sign-in method"
4. Ative "Anônimo" (Anonymous)
5. Clique em "Salvar"

## Passo 5: Obter Configurações do Projeto

1. Clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Clique em "Configurações do projeto"
3. Role até "Seus apps"
4. Clique no ícone `</>` (Web)
5. Apelido do app: `chatza-web`
6. **NÃO** marque "Configurar Firebase Hosting"
7. Clique em "Registrar app"
8. Copie o objeto `firebaseConfig`

## Passo 6: Atualizar firebase.ts

1. Abra o arquivo `firebase.ts`
2. Substitua o objeto `firebaseConfig` pelo que você copiou
3. Deve ficar assim:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyC...",  // Sua chave real
  authDomain: "chatza-xxxxx.firebaseapp.com",
  databaseURL: "https://chatza-xxxxx-default-rtdb.firebaseio.com",
  projectId: "chatza-xxxxx",
  storageBucket: "chatza-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Passo 7: Testar

1. Salve o arquivo `firebase.ts`
2. Execute: `npm run build`
3. Faça deploy no Netlify
4. Abra em 2 dispositivos diferentes
5. Crie contas diferentes
6. Envie mensagens - elas devem aparecer em tempo real! 🎉

## ⚠️ IMPORTANTE - Segurança

As regras atuais são para **TESTE APENAS**. Para produção, você deve:

1. Implementar regras mais restritivas
2. Validar dados no servidor
3. Limitar taxa de requisições
4. Adicionar moderação de conteúdo

## 🆘 Problemas Comuns

**Erro: "Permission denied"**
- Verifique se as regras do Realtime Database estão corretas
- Certifique-se de que Authentication está ativado

**Mensagens não aparecem**
- Verifique o console do navegador (F12)
- Confirme que `databaseURL` está correto
- Teste a conexão no Firebase Console

**Erro de CORS**
- Adicione seu domínio Netlify nas configurações do Firebase
- Em Authentication > Settings > Authorized domains

## 📝 Próximos Passos

Após configurar, eu vou integrar o Firebase no código do ChatScreen para:
- ✅ Enviar mensagens em tempo real
- ✅ Sincronizar salas entre usuários
- ✅ Mostrar usuários online
- ✅ Atualizar localizações em tempo real
