# one-pay-admin

# Build & Run Application
sudo docker compose up --build -d

# Run Applications
sudo docker compose up -d

# Endpoints
OnePayAdmin: http://localhost:4200/

# Useful Comands 
    pm2 reload: sudo docker exec node-node-1 pm2 reload all --update-env
    Rebuild and Run Application : sudo docker compose build --no-cache && sudo docker compose up -d