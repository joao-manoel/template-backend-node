
# Template Backend com Authenticação e ACL
 O projeto é um sistema que implementa controle de acesso baseado em roles e permissões. Ele utiliza Node.js e Express.js, juntamente com o banco de dados Prisma.

  O sistema possui middlewares de autenticação e controle de acesso. O middleware de autenticação verifica se o usuário possui um token válido e decodifica-o para obter o ID do usuário. O middleware de controle de acesso verifica se o usuário possui as roles e permissões necessárias para acessar determinada rota ou funcionalidade.

  O projeto inclui DTOs para representar os dados nas requisições e respostas, além de funções utilitárias para criar respostas HTTP padronizadas.

  O objetivo do sistema é proteger as rotas e funcionalidades, garantindo que apenas usuários autenticados e autorizados possam acessá-las. Isso aumenta a segurança e o controle sobre as permissões dos usuários.
## Funcionalidades
- [x]  Registo de Usuarios
- [x]  Sistema de Authenticação
- [x]  Criar Permissões
- [x]  Criar Cargo
- [x]  Middleware de Controle de Acesso
- [x]  Atribuir Permissões ao Cargo 
- [x]  Atribuir Cargo ao Usuario
