#!/usr/bin/env bash
read -p "Describe this commit: " Dsc
cd GameOfTheYear2012
git add .
git commit -m "$Dsc"
git push origin -b gh-pages