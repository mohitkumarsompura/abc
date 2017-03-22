#ABC Tests

git clone https://github.com/mohitkumarsompura/abc.git

cd abc

git checkout automation

cd test

#make sure you have all dependencies specified in package.json in this folder

##To Run REST API test

npm test

###To run UI Test

cd test/ui

mocha
