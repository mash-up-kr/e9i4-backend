module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/app.js',
      instances: 2,
      exec_mode: 'cluster',
      // wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 10000,
      env: {
        NODE_ENV: 'develop',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
