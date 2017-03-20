//Begin by including the things we need to run the tests
'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var testPropsFile = './testproperties'; // The main test input source
var testProps = require(testPropsFile);

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var until = webdriver.until;
var by = webdriver.By;


const mochaTimeOut = 15000;
const pageLoadTimeout = 10000;
test.beforeEach(function() {
  this.timeout(mochaTimeOut);
  var driver = new webdriver.Builder().withCapabilities(
	    webDriver.Capabilities.firefox()
	).build();
});

test.afterEach(function() {
  driver.quit();
});

test.describe('ABC Tests', function() {
  test.describe('ABC UI Test Suite', function() {
    test.it('Validate ABC News', function(done) {

        driver.get("http://www.abc.net.au/news").

        driver.wait(until.elementLocated(by.id('abcHeader')), pageLoadTimeout, 'Could not locate the abcHeader element within the time specified');
        driver.wait(until.elementLocated(by.id('container_header')), 1000, 'Could not locate the container_header element within the time specified');
        driver.wait(until.elementLocated(by.id('abcFooter')), 1000, 'Could not locate the abcFooter element within the time specified');
        driver.getTitle().then(function(title) {
            title.should.equal("ABC News (Australian Broadcasting Corporation)");
        });        
        
        driver.findElement(webdriver.by.xpath("//a[text()='Just In']")).click().then(function() {
            driver.wait(until.elementLocated(by.xpath("//h1[text()='Just In']")));
        });

        driver.getTitle().then(function(title) {
            title.should.equal("Just In - ABC News (Australian Broadcasting Corporation)");
        });

        var num_arts = driver.executeScript("return document.querySelector(\"ul.article-index\").children.length");
        for(var i = 0 ; i < num_arts ; i++) {
        	driver.findElement(by.xpath("//ul/li["+ i + "]/h3")); //title
        	driver.findElement(by.xpath("//ul/li["+ i + "]/p[@class='published']")); //author
        	driver.findElement(by.xpath("//ul/li["+ i + "]/p[1]")); //timestamp
            driver.findElement(by.xpath("//ul/li["+ i + "]/p[@class='topics']")); //text
        }
        
        driver.get("http://www.abc.net.au/news/2017-02-09/weatherill-promises-to-intervene-dramatically/8254908");
        driver.wait(until.elementLocated(by.id("jwplayer-video-0_view")));
        driver.getTitle().then(function(title) {
            title.should.equal("Just In - ABC News (Australian Broadcasting Corporation)");
        });

        var videoState = driver.executeScript("jwplayer().getState()");
        videoState.should.equal("IDLE");

        driver.executeScript("jwplayer().play()");
        videoState = driver.executeScript("jwplayer().getState()");
        videoState.should.equal("PLAYING");
 
        driver.executeScript("jwplayer().stop()");
        videoState = driver.executeScript("jwplayer().getState()");
        videoState.should.equal("IDLE");

        driver.get("http://www.abc.net.au/news/2017-02-10/abc-open-pic-of-the-week/8256256");
        driver.wait(until.elementLocated(by.id("main_content")));
        driver.getTitle().then(function(title) {
            title.should.equal("Your best pictures from the week - ABC News (Australian Broadcasting Corporation)");
        });
        driver.findElement(by.xpath("//ul/li[0]/img[@src='http://www.abc.net.au/news/image/8255972-16x9-940x529.jpg']")); 
        done();
    });         
        
  });
});


