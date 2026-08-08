# Weinshop

Headless-магазин вина: Saleor (e-commerce ядро) + Next.js (витрина).

```
weinshop/
├─ storefront/   # Next.js витрина (деплой на Vercel)
└─ services/     # Go-сервисы: fulfillment, инвойсы (появятся позже)
```

## Архитектура

```
Браузер → storefront (Next.js, Vercel) → Saleor GraphQL (Cloud / VPS)
                                              ↓ webhooks
                                        services/* (Go) + /api/revalidate
```

- Saleor хостится отдельно (Saleor Cloud или Docker на VPS) — на Vercel живёт только витрина.
- Витрина ходит в Saleor по GraphQL (Storefront-запросы без токена, служебные — с `SALEOR_APP_TOKEN`).
- Вебхуки Saleor сбрасывают кэш витрины (`/api/revalidate`) и триггерят бизнес-логику.

## Старт

1. Завести dev-инстанс на [cloud.saleor.io](https://cloud.saleor.io) (бесплатно) или поднять локально: `saleor-platform` + docker compose.
2. `cd storefront && cp .env.example .env.local` — вписать URL инстанса.
3. `npm run dev` — витрина на http://localhost:3000.
4. После подключения инстанса: `npm run codegen` — сгенерировать типы из схемы.

Подробнее — в [storefront/README.md](storefront/README.md).
