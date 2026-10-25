#!/usr/bin/env bash
# Pull the cleaned IOE Electrical Machines material from the nano-syllabus VPS into vault/.
set -euo pipefail
cd "$(dirname "$0")/.."
KEY="${NANO_KEY:-$HOME/.ssh/nano_syllabus_actions}"
T=/var/lib/nano-syllabus/clean_vault/teachers-app
mkdir -p vault
ssh -i "$KEY" root@173.212.214.79 "cd $T && tar czf - \
  'paudelrohit016-4f229f72-teacher/Electrical Machines' \
  'paudelrohit016-4f229f72-teacher/Basic Electrical Engineering/Question Bank' \
  'shrestharamesh-d0c28-teacher/Electrical Circuits and Machines'" | tar xzf - -C vault
echo "vault synced: $(find vault -type f | wc -l) files"
