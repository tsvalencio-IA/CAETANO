# CAETANO Carnes e Rotisseria — SaaS PRO Multi-Açougue

Sistema client-side para apresentação e implantação inicial de açougues/casas de carnes/rotisserias.

## Perfis
- Superadmin thIAguinho: cadastro de açougues, módulos e auditoria global. Não aparece na tela inicial; clique 5x em `Powered by thIAguinho Soluções` e digite `*177`.
- Admin do açougue: gestão do Caetano.
- PDV/Caixa: vendas por código, etiqueta, kg e unidade.
- Cozinha/Rotisseria: produção e encomendas.
- Estoque/Compras: NF-e XML, fornecedores, lotes, validade, boletos.
- Cliente: somente compras/encomendas próprias.

## Configurar Firebase
1. Crie projeto no Firebase.
2. Ative Authentication > Email/Password.
3. Crie usuários no Firebase Auth.
4. Cole a configuração web em `app/js/firebase-config.js`.
5. Publique `firebase/firestore.rules` em Firestore > Rules.
6. Publique `firebase/storage.rules` em Storage > Rules.
7. Crie documentos em `usuarios/{uid}` com role e tenantId.
8. Crie `tenants/caetano` ou use o Superadmin em modo local para gerar JSON base.

Exemplo de usuário Firestore:
```json
{"nome":"Admin Caetano","email":"admin@caetano.com.br","role":"admin","tenantId":"caetano","ativo":true}
```

## Configurar Cloudinary
1. Crie conta Cloudinary.
2. Copie o `cloudName`.
3. Crie Upload Preset com Signing Mode = Unsigned.
4. Coloque no Superadmin ao criar o açougue ou em `app/js/firebase-config.js`.
5. Nunca coloque API Secret no frontend.

## Modo demo
Se o Firebase não estiver configurado, o sistema usa localStorage para apresentação.
Logins demo:
- superadmin@thiaguinho.com.br / Caetano@177
- admin@caetano.com.br / Caetano@123
- pdv@caetano.com.br / Caixa@123
- cozinha@caetano.com.br / Cozinha@123
- estoque@caetano.com.br / Estoque@123
- cliente@exemplo.com / Cliente@123

## Fluxo operacional
Superadmin cria açougue → Admin cria equipe/produtos → Estoque importa XML e gera estoque/boletos → PDV vende por etiqueta/código → Cozinha controla produção → Cliente vê apenas pedidos/compras próprias.
