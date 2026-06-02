// PM2 process config para el VPS.
// Arranca el Express (server.js) que sirve la build estática + proxy Connek.
// Uso:
//   pm2 start ecosystem.config.cjs
//   pm2 save && pm2 startup   (para que sobreviva reinicios del VPS)
module.exports = {
	apps: [
		{
			name: 'excavationserable',
			script: 'server.js',
			cwd: __dirname,
			exec_mode: 'fork', // un solo proceso; el server es liviano (proxy + estáticos)
			instances: 1,
			autorestart: true,
			max_restarts: 10,
			max_memory_restart: '300M',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
				HOST: '127.0.0.1' // solo localhost; Nginx expone al mundo
			},
			out_file: './pm2-out.log',
			error_file: './pm2-error.log',
			time: true
		}
	]
};
