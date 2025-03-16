# get directory paths
dist=$(cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
parent=$(dirname $dist)
src=$parent/src

cd $src

for browser in firefox chrome; do
  cp manifest.$browser.json manifest.json

  name=$(jq .name manifest.json -r | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  version=$(jq .version manifest.json -r)

  filename="$name-$version-$browser.zip"
  echo creating $filename
  zip -r $dist/$filename . -x manifest.*.json
  rm manifest.json
done
