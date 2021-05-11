install_deps() {
  cd "$1" && npm install && npm update && cd .. && echo "✅ Successfully installed npm packages in $1" || echo "Failed";
}

install_deps users
install_deps auth
install_deps articles

