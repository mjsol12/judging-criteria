git pull && yarn && yarn build-ts && pm2 restart scoreboard && yarn build && rm -rf /var/www/scoreboard && mv dist /var/www/scoreboard && echo Deploy Done
