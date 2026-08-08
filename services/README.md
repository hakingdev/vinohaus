# services/

Go-сервисы вокруг Saleor. Пока пусто — планируемая структура:

```
services/
├─ fulfillment/   # ORDER_CREATED → DHL (Alterssichtprüfung 18+), трек-номер → Saleor
│  ├─ cmd/server/main.go
│  └─ internal/
│     ├─ saleor/   # GraphQL-клиент + проверка подписи вебхуков (JWS)
│     └─ dhl/
└─ invoicing/     # генерация счетов по заказу
```

Каждый сервис — самостоятельный Go-модуль со своим `go.mod`, принимает
вебхуки Saleor напрямую (мимо витрины) и отвечает Saleor через GraphQL
с токеном своего App'а.
