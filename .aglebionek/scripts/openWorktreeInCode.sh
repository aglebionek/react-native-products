WORKTREE_PATH=$1
# check if path is provided
if [ -z "$WORKTREE_PATH" ]; then
  echo "Usage: $0 <path-to-worktree>"
  exit 1
fi

# check if path exists
if [ ! -d "$WORKTREE_PATH" ]; then
  echo "Error: Path '$WORKTREE_PATH' does not exist."
  exit 1
fi

code "$WORKTREE_PATH" -n