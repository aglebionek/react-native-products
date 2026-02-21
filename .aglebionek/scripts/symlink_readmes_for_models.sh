# go up in dirs until we find the main checkout (where .git is)
while [[ ! -d ".git" ]]; do
  cd ..
  if [[ "$PWD" == "/" ]]; then
    echo "Error: Could not find .git directory. Please run this script from within the repo."
    exit 1
  fi
done

echo "Found .git directory at: $PWD"

# if there is an -r flag provided, remove syslinks instead
if [[ "$1" == "-r" ]]; then
  echo "Removing model instructions symlinks..."
  rm -f ./.github/copilot-instructions.md
  rm -f ./CLAUDE.md
  exit 0
fi

echo "Symlinking model instructions..."

if [ ! -d "./.github" ]; then
  mkdir ./.github
fi

ln -sf ../.aglebionek/docs/_main.md ./.github/copilot-instructions.md
ln -s ./.aglebionek/docs/_main.md ./CLAUDE.md