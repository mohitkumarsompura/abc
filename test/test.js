var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var testPropsFile = './testproperties'; // The main input source
var testProps = require(testPropsFile);

describe('ABC Tests', function() {
  describe('ABC Rest API Test Suite', function() {
    var envs = testProps.hosts;
    var testsdata = testProps.testsdata;
    envs.forEach(function(env) {
        testsdata.forEach(function(testdata) {
            it('Validate the REST API response for ' + testdata.inputdata.program.name, function(done) {
                console.log("Env : " + env.value);
                chai.request("http://" + env.value + testdata.inputdata.path)
                    .get(testdata.inputdata.program.value)
                    .end(function(err, res){
                        res.should.have.status(200);
                        var json = res.body;
                        validateJson(res.body,testdata);
                        done();
                    });
            });         
        });
    });
  });
});

function validateJson(json,testdata) {
    json.should.have.a.property("entity");
    json.entity.should.equal(testdata.expected.entity);
    json.should.have.a.property("arid");
    json.arid.should.equal(testdata.expected.arid);
    json.should.have.a.property("title");
    json.title.should.equal(testdata.expected.title);
    json.should.have.a.property("mini_synopsis");
    json.mini_synopsis.should.equal(testdata.expected.mini_synopsis);
    json.should.have.a.property("short_synopsis");
    json.short_synopsis.should.equal(testdata.expected.short_synopsis);
    json.should.have.a.property("medium_synopsis");
    json.medium_synopsis.should.equal(testdata.expected.medium_synopsis);
    json.should.have.a.property("created_utc");
    json.created_utc.should.equal(testdata.expected.created_utc);                        
    json.should.have.a.property("last_updated_utc");
    json.last_updated_utc.should.equal(testdata.expected.last_updated_utc);
    json.should.have.a.property("service_airport_code");
    if(testdata.expected.service_airport_code == null)
        chai.assert(json.service_airport_code == null);
    else
        json.service_airport_code.should.equal(testdata.expected.service_airport_code);
}

