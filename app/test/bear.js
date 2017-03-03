let request = require("request")
let base_url = "http://localhost:3000/"

describe("Server", function() {
  describe("GET /api/bear", function() {
    it("returns status code 200", function() {
      request.get(base_url+ 'api/bear', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  
    describe("POST /api/bears", function() {
        it("returns status code 200", function() {
          request.post(base_url+ 'api/bear',{
            name:'aaa'
          }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(body.message).toBe('Bear created!');
            done();
          });
        });
    });
});