# NLW Expert | React Notes

Aplicação para armazenamento de notas de texto criadas pelo usuário. O conteúdo pode ser adicionado através da inscrição de texto direta ou gravação de áudio. Este áudio será transcrito em tempo real pela aplicação e exibido em tela durante o processo.

O projeto foi desenvolvido durante a 13ª edição do NLW (Next Level Week), realizada pela Rocketseat.


## Instalação

Clone o projeto executando o comando:

```sh
git clone https://github.com/julianosill/nlw-expert-reactnote.git
```

Acesse a pasta do projeto e instale as dependências:

```sh
cd nlw-expert-reactnote
pnpm install
```

### Rodando localmente

Para iniciar a aplicação, execute o comando:

```sh
pnpm dev
```

Você poderá acessar através do endereço [http://localhost:5137](http://localhost:5137) ou pelo endereço exibido em seu terminal.


## TO-DO

- [ ] Permitir ambos métodos para adicionar conteúdo (texto ou gravação) na mesma nota
- [ ] Pausar e continuar a gravação
- [ ] Habilitar a inserção de texto quando o usuário estiver com a caixa de diálogo `Adicionar Nota` aberta e pressionar qualquer letra (A-Z e/ou Shift + Letra)
- [ ] Adicionar opção de idiomas (en-US, es-AR e pt-BR)