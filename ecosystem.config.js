module.exports = {
  apps: [
    {
      name: 'climb-bond', // アプリケーションの名前
      script: 'npm', // 実行するスクリプト
      args: 'run start', // スクリプトの引数
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    },
  ],
  deploy: {
    production: {
      user: 'yamatohagi', // サーバーのユーザー名
      host: '35.233.149.73', // サーバーのホスト
      key: '~/.ssh/deploy.key', // SSHキーのパス
      ref: 'origin/main', // デプロイするブランチ
      repo: 'https://github.com/yamatohagi/climb-bond', // リポジトリのURL
      path: '/home/yamatohagi/climb-bond', // アプリケーションのデプロイ先のパス
      'post-deploy':
        'pwd && ls && git log -n 1 && npm install && npm run build && pm2 restart climb-bond && pm2 save',

      env: {
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_PUBLIC_VERCEL_ENV: 'production',
        NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    },
  },
};
