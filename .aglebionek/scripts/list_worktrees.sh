# use git to list all worktrees. Iterate over the worktrees, get their paths, and check ./.aglebionek/.worktree-session for the session and display it with the worktree info.
# go up in dirs until we find the main checkout (where .git is)
while [[ ! -d ".git" ]]; do
  cd ..
  if [[ "$PWD" == "/" ]]; then
    echo "Error: Could not find .git directory. Please run this script from within the repo."
    exit 1
  fi
done

echo -e "Found .git directory at: $PWD\n"
MAIN_REPO_ROOT=$PWD

echo "Current worktrees and sessions"
WORKTREES=$(git worktree list --porcelain | grep "worktree" | awk '{print $2}')
echo "-----------------------------"
for WORKTREE in $WORKTREES; do
  if [[ "$WORKTREE" != *"/worktrees/"* ]]; then
    continue
  fi
  echo "Worktree: $WORKTREE"

  cd "$WORKTREE"
  echo "Branch: $(git branch --show-current)"
  cd "$MAIN_REPO_ROOT"

  if [[ -f "$WORKTREE/.worktree-session" ]]; then
    SESSION=$(cat "$WORKTREE/.worktree-session")
    echo "Session: $SESSION"
  else
    echo "Session: None"
  fi

  echo "-----------------------------"
done