// PM2 — Mini Excavations Érable (excavationserable.com), nuevo sitio React/Vite.
// server.js sirve dist/ + POST /api/lead (Express). Reemplaza al app SvelteKit.
//   pm2 start ecosystem.config.cjs
//   pm2 restart excavationserable --update-env
module.exports = {
  apps: [
    {
      name: 'excavationserable',
      script: 'server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
      },
    },
  ],
};
