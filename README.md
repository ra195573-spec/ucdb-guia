# 🎓 Guia do Calouro — UCDB

App mobile feito com **Ionic + React + TypeScript** para ajudar calouros a se localizar no campus da UCDB.

**Endereço:** Av. Tamandaré, 6000 — Jardim Seminário, Campo Grande - MS

---

## 📱 Funcionalidades

- 🗺️ Mapa interativo com Leaflet — visualize os pontos do campus
- 📍 Geolocalização em tempo real via API nativa do navegador (`navigator.geolocation`)
- 🔍 Filtros por categoria (blocos, alimentação, serviços, etc.)
- 🔐 Autenticação simulada (login/senha)
- 📋 Lista de pontos com distância calculada em relação à sua posição
- 🏷️ Cards com detalhes de cada local

---

## 🚀 Como rodar localmente

### Pré-requisitos

- **Node.js** v18+ instalado → [nodejs.org](https://nodejs.org)
- **npm** v9+ (vem junto com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/ucdb-guia.git
cd ucdb-guia

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:8100
```

> ⚠️ **Importante:** O GPS (`Geolocation API`) só funciona em `localhost` ou via **HTTPS**.  
> Não funciona abrindo o `.html` diretamente no navegador.

---

## 🧪 Testando no celular (dispositivo real)

Para testar no seu celular na mesma rede Wi-Fi:

```bash
# Descobra seu IP local (Windows: ipconfig | Linux/Mac: ifconfig)
npm run dev -- --host

# Acesse no celular:
# http://SEU_IP_LOCAL:8100
# Ex: http://192.168.1.10:8100
```

> O GPS e sensores funcionam normalmente em `localhost` ou HTTPS. Para produção, use GitHub Pages (HTTPS).

---

## 📦 Gerando o build de produção

```bash
npm run build
```

Os arquivos finais ficam na pasta `dist/`. Essa pasta pode ser hospedada em qualquer servidor estático.

---

## 🌐 Deploy no GitHub Pages

### Opção 1 — Deploy manual

```bash
# 1. Gere o build
npm run build

# 2. Instale o gh-pages (se não tiver)
npm install -g gh-pages

# 3. Faça o deploy
gh-pages -d dist
```

Acesse em: `https://SEU_USUARIO.github.io/ucdb-guia/`

### Opção 2 — GitHub Actions (automático)

O repositório já inclui o workflow em `.github/workflows/deploy.yml`.  
Basta fazer push para a branch `main` — o deploy é automático!

**Configuração necessária:**
1. Vá em **Settings → Pages** do seu repositório
2. Em "Source", selecione **GitHub Actions**
3. Faça um push e aguarde o workflow rodar

---

## 📁 Estrutura do projeto

```
ucdb-guia/
├── src/
│   ├── components/
│   │   ├── HeroBanner.tsx          # Banner de boas-vindas
│   │   ├── FiltrosCategorias.tsx   # Filtros por categoria
│   │   ├── MapaLeaflet.tsx         # Mapa interativo (Leaflet)
│   │   ├── CardPonto.tsx           # Detalhe do local selecionado
│   │   ├── CardEvento.tsx          # Card de eventos
│   │   ├── ListaPontos.tsx         # Lista de locais
│   │   └── ModalCriarEvento.tsx    # Modal para criação de eventos
│   ├── data/
│   │   └── pontos.ts               # Dados dos locais do campus
│   ├── hooks/
│   │   ├── useGeolocalizacao.ts    # Hook de GPS em tempo real
│   │   ├── useEventos.ts           # Hook de gerenciamento de eventos
│   │   └── useAuth.ts              # Hook de autenticação
│   ├── pages/
│   │   ├── UCDBGuia.tsx            # Página principal do guia
│   │   └── LoginPage.tsx           # Página de login
│   ├── utils/
│   │   ├── geo.ts                  # Cálculo de distância (Haversine)
│   │   └── mapIcons.ts             # Ícones personalizados do mapa
│   ├── theme/
│   │   └── global.css              # Estilos globais
│   ├── types.ts                    # Tipos TypeScript globais
│   ├── App.tsx                     # Rotas e estrutura principal
│   └── main.tsx                    # Entry point
├── public/                         # Assets estáticos
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD para GitHub Pages
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔌 APIs nativas utilizadas

| API | Uso no projeto |
|-----|----------------|
| `navigator.geolocation` | Localização em tempo real do usuário |
| `Geolocation.watchPosition()` | Atualização contínua da posição |
| Leaflet (sobre OpenStreetMap) | Renderização do mapa interativo |
| LocalStorage (via React state) | Persistência de sessão do usuário |

---

## 🛠️ Tecnologias

- [Ionic Framework v8](https://ionicframework.com/) — UI components mobile-first
- [React 18](https://react.dev/) — Interface
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Vite](https://vitejs.dev/) — Build tool
- [Leaflet](https://leafletjs.com/) — Mapas interativos
- [React Router v5](https://v5.reactrouter.com/) — Roteamento

---

## 📸 Evidências de funcionamento

> Adicione aqui capturas de tela do app funcionando no simulador ou dispositivo real.

---

## 👤 Autoria

Projeto desenvolvido para a disciplina de **Desenvolvimento Mobile** — UCDB  
Workshop P1 — Sensores, Geolocalização e APIs Nativas
