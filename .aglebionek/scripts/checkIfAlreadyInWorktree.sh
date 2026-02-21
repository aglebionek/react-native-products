# !/bin/bash

if [[ "$PWD" == *"/worktrees/"* ]]; then
  echo "Already in a worktree session. Please run this script from the main checkout directory."
  exit 1
fi

echo "Not currently in a worktree session."
exit 0