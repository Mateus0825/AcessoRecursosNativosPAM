# DeviceResourcesApp

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** no celular, ou rode em um emulador.

## Estrutura

- `App.js` — componente principal, junta os dois módulos abaixo
- `src/components/ImagePickerComponent.js` — seleciona imagem da galeria
- `src/components/ContactsComponent.js` — lista contatos do dispositivo (com ícones FontAwesome)
- `app.json` — permissões de câmera/galeria (iOS) e contatos/storage (Android)

## Pendências antes de rodar

1. Adicionar os ícones em `./assets/` (`icon.png`, `splash.png`, `adaptive-icon.png`, `favicon.png`) — ou remova essas referências do `app.json` se não tiver as imagens ainda.
2. Testar em dispositivo físico com Expo Go (câmera/contatos não funcionam bem em emulador web).
