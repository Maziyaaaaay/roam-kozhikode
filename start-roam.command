#!/bin/zsh
cd "${0:A:h}"
if ! command -v npm >/dev/null; then
  export NVM_DIR="$HOME/.nvm"
  if [[ -s "$NVM_DIR/nvm.sh" ]]; then source "$NVM_DIR/nvm.sh"; fi
fi
if ! command -v npm >/dev/null; then
  print 'Node.js is required. Install Node.js and run this launcher again.'
  read 'reply?Press Return to close.'
  exit 1
fi
if [[ ! -d node_modules ]]; then npm install || exit 1; fi
npm run build || exit 1
(sleep 2; open -a 'Google Chrome' 'http://localhost:4173') &
npm run preview -- --port 4173 --strictPort
