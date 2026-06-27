${0%/*}/checkIfAlreadyInWorktree.sh

# From the main repo root (/home/aglebionek/work/instago/app)
BRANCH_NAME=$1
git worktree add "../worktrees/${BRANCH_NAME}" -b "${BRANCH_NAME}" develop
cd "../worktrees/${BRANCH_NAME}"

ROOT_DIR=$(pwd)

ln -s "$ROOT_DIR/.expo" .expo
ln -s "$ROOT_DIR/android" android
ln -s "$ROOT_DIR/node_modules" node_modules

cat > .worktree-session <<EOF
path-to-worktree: ../worktrees/${BRANCH_NAME}
branch-name: ${BRANCH_NAME}
model-name: $2
task: $3
started: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
EOF