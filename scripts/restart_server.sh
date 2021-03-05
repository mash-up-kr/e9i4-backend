# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

cd /home/ubuntu/deploy/e9i4
source /home/ubuntu/.bashrc
pm2 reload ecosystem.config.js --env production
