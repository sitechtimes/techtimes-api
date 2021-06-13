stage=""

while getopts "s:" option; do
  case $option in
    s ) stage=$OPTARG ;;
    * ) echo "You have to use: [-s]";;
  esac
done


deploy() {
  cd "$1" && sls deploy --stage "$stage" && cd ../;
}

deploy users
deploy auth
deploy cms
deploy articles