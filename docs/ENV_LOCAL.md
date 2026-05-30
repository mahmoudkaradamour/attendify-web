Local run — connect to remote backend and services
-------------------------------------------------

1) Frontend (web):

 - Create a file named `.env.local` in the `attendify-web` root with:

```
NEXT_PUBLIC_ATTENDIFY_API_BASE=https://api.attendify-app.me
```

 - Build or run dev as usual:

```
npm run dev
npm run build    # production build
```

2) Backend (server):

 - Create a JSON file (e.g. `runtime.local.json`) containing production runtime values:

```
{
  "MONGO_URL": "mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/attendify",
  "REDIS_URL": "redis://:<password>@redis.example.com:6379",
  "JWT_SECRET": "...",
  "APP_SECRET": "...",
  "EDGE_SECRET": "..."
}
```

 - Run the helper script which sets `ATTENDIFY_RUNTIME_FILE` and starts the server in dev mode:

```
cd ..\attendify-server
powershell -File scripts\run-local-remote.ps1 .\runtime.local.json
```

Notes:
 - Do NOT commit secrets. Keep `runtime.local.json` out of version control.
 - If you prefer environment variables directly, set `MONGO_URL`, `REDIS_URL`, etc., in the shell before starting the server.
