#!/bin/bash

# Start a new tmux session named 'npm_version'
tmux new-session -d -s journey

# Window Development ========================
tmux rename-window dev
# ===========================================


# Windows Lazygit ============================
tmux new-window -t  journey:2 -n 'term'
# ===========================================


# Windows Server 1 ============================
tmux new-window -t journey:3 -n 'server1' '/bin/bash'
tmux split-window -t journey:3 -h '/bin/bash'
tmux split-window -t journey:3 -v '/bin/bash' 
tmux select-pane -t journey:3.1
tmux split-window -t journey:3 -v '/bin/bash'
# ===========================================

# Windows Server 2 ============================
tmux new-window -t journey:4 -n 'server2' '/bin/bash'
tmux split-window -t journey:4 -h '/bin/bash' 
tmux split-window -t journey:4 -v '/bin/bash'
tmux select-pane -t journey:4.1
tmux split-window -t journey:4 -v '/bin/bash'
# ===========================================

# Windows Server 3 ============================
tmux new-window -t journey:5 -n 'server3' '/bin/bash'
tmux split-window -t journey:5 -h '/bin/bash' 
tmux split-window -t journey:5 -v '/bin/bash'
tmux select-pane -t journey:5.1
# ===========================================

sleep 3 # wait for all the panes to get created

# Now Execute Commands ========================
# First Opening Powershell
tmux send-keys -t journey:2.1 'pwsh.exe' C-m
tmux send-keys -t journey:3.1 'cmd.exe' C-m
tmux send-keys -t journey:3.2 'cmd.exe' C-m
tmux send-keys -t journey:3.3 'cmd.exe' C-m
tmux send-keys -t journey:3.4 'cmd.exe' C-m
tmux send-keys -t journey:4.1 'cmd.exe' C-m
tmux send-keys -t journey:4.2 'cmd.exe' C-m
tmux send-keys -t journey:4.3 'cmd.exe' C-m
tmux send-keys -t journey:4.4 'cmd.exe' C-m
tmux send-keys -t journey:5.1 'cmd.exe' C-m
tmux send-keys -t journey:5.2 'cmd.exe' C-m
tmux send-keys -t journey:5.3 'cmd.exe' C-m

sleep 1 # wait for commandline to get started

# Now go to the required directroy ========================
tmux send-keys -t journey:3.1 'cd ./user-client' C-m
tmux send-keys -t journey:3.2 'cd ./admin-client' C-m
tmux send-keys -t journey:3.3 'cd ./api-docs-service' C-m
tmux send-keys -t journey:3.4 'cd ./api-gateway' C-m
tmux send-keys -t journey:4.1 'cd ./user-service' C-m
tmux send-keys -t journey:4.2 'cd ./user-vehicle-booking-service/.venv/Scripts && .\activate && cd ../..' C-m
tmux send-keys -t journey:4.3 'cd ./user-vehicle-review-service' C-m
tmux send-keys -t journey:4.4 'cd ./user-vehicle-service/.venv/Scripts && .\activate && cd ../..' C-m
tmux send-keys -t journey:5.1 'cd ./merchant-service' C-m
tmux send-keys -t journey:5.2 'cd ./merchant-vehicle-and-travel-service' C-m
tmux send-keys -t journey:5.3 'cd ./admin-service/.venv/Scripts && .\activate && cd ../..' C-m


# Now Run the Server ========================
# tmux send-keys -t journey:3.1 'yarn dev' C-m
# # tmux send-keys -t journey:3.2 '' C-m
# tmux send-keys -t journey:3.3 'yarn dev' C-m
# tmux send-keys -t journey:3.4 'yarn dev' C-m
# tmux send-keys -t journey:4.1 'yarn dev' C-m
# tmux send-keys -t journey:4.2 'python manage.dev.py runserver' C-m
# tmux send-keys -t journey:4.3 'yarn dev' C-m
# tmux send-keys -t journey:4.4 'python main.py --env="dev"' C-m
# tmux send-keys -t journey:5.1 'php artisan serve' C-m
# tmux send-keys -t journey:5.2 'yarn dev' C-m
# tmux send-keys -t journey:5.3 'python manage.dev.py runserver' C-m

# Run Other Command =========================
tmux send-keys -t journey:1.1 'nvim .' C-m
# tmux send-keys -t journey:2.1 'lazygit' C-m

# Attach to the tmux session
tmux attach-session -t journey
