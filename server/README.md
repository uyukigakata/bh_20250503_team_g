## フレームワーク

- **[Hono](https://hono.dev/)**
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)**
- **[Valibot](https://valibot.dev/)**

パッケージをインストール
```
npm install
```

サーバーを起動
```
npm run dev
```

## テーブル設計

```mermaid
erDiagram
    tasks ||--o{ records : has
    tasks {
        int id PK
        string name
        int created_at
        int updated_at
    }
    records {
        int id PK
        int task_id FK
        string description
        int plant_growth
        int created_at
        int updated_at
    }
```

