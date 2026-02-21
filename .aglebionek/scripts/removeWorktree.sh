# write a script that removes a git worktree, the related branch and the directory of the worktree
# usage: ./removeWorktree.sh <path-to-worktree>
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
cd "$WORKTREE_PATH"

# get the branch name before removing the worktree
BRANCH_NAME=$(git branch --show-current)

# go back so we're not inside the worktree when removing it
cd - > /dev/null

# remove the worktree
git worktree remove "$WORKTREE_PATH" --force

# remove the branch associated with the worktree
git branch -D "$BRANCH_NAME"

# remove the directory if it still exists
rm -rf "$WORKTREE_PATH"