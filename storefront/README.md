# storefront

Витрина Weinshop: Next.js 16 (App Router) + Saleor GraphQL.

## Запуск

```bash
cp .env.example .env.local   # вписать URL Saleor-инстанса
npm install
npm run dev                  # http://localhost:3000
```

Без настроенного `NEXT_PUBLIC_SALEOR_API_URL` витрина покажет подсказку по подключению вместо каталога.

## Структура

```
app/
├─ (store)/              # общий лэйаут магазина (шапка, футер)
│  ├─ page.tsx           # главная — каталог
│  ├─ products/[slug]/   # карточка вина
│  ├─ categories/[slug]/ # категория
│  ├─ search/            # поиск (?q=)
│  ├─ cart/              # корзина (TODO: checkoutCreate)
│  └─ account/           # логин, заказы (TODO: @saleor/auth-sdk)
├─ checkout/             # свой checkout-флоу (TODO)
└─ api/
   ├─ revalidate/        # вебхук PRODUCT_* → сброс кэша (tag "products")
   └─ webhooks/orders/   # вебхук ORDER_CREATED (позже уедет в Go-сервис)

graphql/                 # .graphql-документы — источник правды для codegen
lib/
├─ saleor/client.ts      # fetch-обёртка с кэш-тегами Next.js
├─ saleor/queries.ts     # временные ручные типы (заменит codegen)
└─ generated/            # вывод codegen (в git не коммитить по вкусу)
components/              # AgeGate (18+), SiteHeader, ProductCard
```

## Codegen

Типы генерируются из схемы живого инстанса:

```bash
npm run codegen
```

Смотрит на `NEXT_PUBLIC_SALEOR_API_URL` из `.env.local` (fallback — публичное демо Saleor). После первой генерации переводите страницы с `lib/saleor/queries.ts` на типизированные документы из `lib/generated/`.

## Кэширование

Каталог кэшируется через `fetch(..., { next: { tags: ["products"], revalidate: 3600 } })`.
Вебхук Saleor `PRODUCT_UPDATED` → `POST /api/revalidate?secret=...` → `revalidateTag("products", "max")`.
