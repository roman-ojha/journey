#!/bin/bash

SESSION_NAME="journey"
createNewSession(){
  # Start a new tmux session named 'npm_version'
  tmux new-session -d -s $SESSION_NAME 'cmd.exe'

  # Window Development ========================
  tmux rename-window dev
  # ===========================================


  # Windows To Access Terminal ============================
  tmux new-window -t  $SESSION_NAME:2 -n 'term' 'pwsh.exe'
  # ===========================================


  # Windows Server 1 ============================
  tmux new-window -t $SESSION_NAME:3 -n 'server1' 'cmd.exe'
  tmux split-window -t $SESSION_NAME:3 -h 'cmd.exe'
  tmux split-window -t $SESSION_NAME:3 -v 'cmd.exe' 
  tmux select-pane -t $SESSION_NAME:3.1
  tmux split-window -t $SESSION_NAME:3 -v 'cmd.exe'
  # ===========================================

  # Windows Server 2 ============================
  tmux new-window -t $SESSION_NAME:4 -n 'server2' 'cmd.exe'
  tmux split-window -t $SESSION_NAME:4 -h 'cmd.exe' 
  tmux split-window -t $SESSION_NAME:4 -v 'cmd.exe'
  tmux select-pane -t $SESSION_NAME:4.1
  tmux split-window -t $SESSION_NAME:4 -v 'cmd.exe'
  # ===========================================

  # Windows Server 3 ============================
  tmux new-window -t $SESSION_NAME:5 -n 'server3' 'cmd.exe'
  tmux split-window -t $SESSION_NAME:5 -h 'cmd.exe' 
  tmux split-window -t $SESSION_NAME:5 -v 'cmd.exe'
  tmux select-pane -t $SESSION_NAME:5.1
  # ===========================================

  # Now go to the required directroy ========================
  tmux send-keys -t $SESSION_NAME:3.1 'cd ./user-client' C-m
  tmux send-keys -t $SESSION_NAME:3.2 'cd ./admin-client' C-m
  tmux send-keys -t $SESSION_NAME:3.3 'cd ./api-docs-service' C-m
  tmux send-keys -t $SESSION_NAME:3.4 'cd ./api-gateway' C-m
  tmux send-keys -t $SESSION_NAME:4.1 'cd ./user-service' C-m
  tmux send-keys -t $SESSION_NAME:4.2 'cd ./user-vehicle-booking-service/.venv/Scripts && .\activate && cd ../..' C-m
  tmux send-keys -t $SESSION_NAME:4.3 'cd ./user-vehicle-review-service' C-m
  tmux send-keys -t $SESSION_NAME:4.4 'cd ./user-vehicle-service/.venv/Scripts && .\activate && cd ../..' C-m
  tmux send-keys -t $SESSION_NAME:5.1 'cd ./merchant-service' C-m
  tmux send-keys -t $SESSION_NAME:5.2 'cd ./merchant-vehicle-and-travel-service' C-m
  tmux send-keys -t $SESSION_NAME:5.3 'cd ./admin-service/.venv/Scripts && .\activate && cd ../..' C-m

  sleep 1 # wait for commandline to get started

  # Now Run the Server ========================
  tmux send-keys -t $SESSION_NAME:3.1 'yarn dev' C-m
  # tmux send-keys -t $SESSION_NAME:3.2 '' C-m
  tmux send-keys -t $SESSION_NAME:3.3 'yarn dev' C-m
  tmux send-keys -t $SESSION_NAME:3.4 'yarn dev' C-m
  tmux send-keys -t $SESSION_NAME:4.1 'yarn dev' C-m
  tmux send-keys -t $SESSION_NAME:4.2 'python manage.dev.py runserver' C-m
  tmux send-keys -t $SESSION_NAME:4.3 'yarn dev' C-m
  tmux send-keys -t $SESSION_NAME:4.4 'python main.py --env="dev"' C-m
  tmux send-keys -t $SESSION_NAME:5.1 'php artisan serve' C-m
  tmux send-keys -t $SESSION_NAME:5.2 'yarn dev' C-m
  tmux send-keys -t $SESSION_NAME:5.3 'python manage.dev.py runserver' C-m

  # Run Other Command =========================
  tmux send-keys -t $SESSION_NAME:1.1 'nvim .' C-m
  # tmux send-keys -t $SESSION_NAME:2.1 'lazygit' C-m

  # Attach to the tmux session
  tmux attach-session -t $SESSION_NAME
}


# Check wheter '$SESSION_NAME' session is already running or not
if tmux has-session -t $SESSION_NAME 2>/dev/null; then
  tmux attach-session -t $SESSION_NAME
  exit 0
fi
createNewSession
