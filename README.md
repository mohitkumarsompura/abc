#ABC Tests

###Special setup instructions if you are not sure

Install git from https://github.com

Install node from https://nodejs.org/en/

Open git bash/terminal

git clone https://github.com/mohitkumarsompura/abc.git

cd abc

npm install chai --save-dev

npm install chai-http --save-dev

npm install mocha --save-dev

npm install request --save-dev

npm install selenium-webdriver --save-dev

npm install should --save-dev

###End of setup instrcutions

cd test

##To Run REST API test

npm test

###To run UI Test

cd test/ui

mocha
