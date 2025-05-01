### Documentação para Executar a Aplicação

---

### **Pré-requisitos**
Certifique-se de que você possui os seguintes itens instalados no seu ambiente:

1. **Node.js** (versão 16 ou superior) - [Download Node.js](https://nodejs.org/)
2. **npm** ou **yarn** (gerenciador de pacotes, geralmente vem com o Node.js)
3. Estar com Back em execução
   

---

### **Passo a Passo para Executar a Aplicação**

#### 1. **Clone o Repositório** 

#### 2. **Acesse o Diretório do Projeto**
Entre no diretório do projeto clonado:

```bash
cd exchange-wisiex-front
```

#### 3. **Instale as Dependências**
Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```
 

#### 4. **Configure as Variáveis de Ambiente**
Certifique-se de que o arquivo .env está configurado corretamente. O arquivo .env deve conter:

```env
VITE_BACKEND_URL=http://localhost:3000
```

- Substitua `http://localhost:3000` pela URL do backend, se necessário.

#### 5. **Inicie o Backend**
Se o backend não estiver em execução, inicie-o antes de rodar o frontend. Certifique-se de que o backend está configurado para rodar na URL especificada no .env.

#### 6. **Inicie o Frontend**
Para iniciar o servidor de desenvolvimento do frontend, execute:

```bash
npm run dev
```
 

#### 7. **Acesse a Aplicação**
Após iniciar o servidor, acesse a aplicação no navegador:

```
http://localhost:5173
```

---
 
 

### **Problemas Comuns**

1. **Erro de Conexão com o Backend**:
   - Verifique se o backend está rodando na URL configurada no .env. 

2. **Erro de Dependências**:
   - Certifique-se de que todas as dependências foram instaladas corretamente com `npm install`.

3. **Porta em Uso**:
   - Se a porta `5173` já estiver em uso, altere a porta no arquivo vite.config.ts:

     ```ts
     export default defineConfig({
       server: {
         port: 3001, // Substitua pela porta desejada
       },
     });
     ```

---

### **Contato**
Se você encontrar problemas ou tiver dúvidas, entre em contato com o responsável pelo projeto.