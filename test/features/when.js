describe("the when feature", function () {
    beforeEach(function () {
        clearWorkArea();
    });
    afterEach(function () {
        clearWorkArea();
    });

    it("provides access to `it` and syncs initial value", function (done) {
        _hyperscript.evaluate("set $global to 'initial'");
        
        var div = make(
            "<div _='when $global changes put it into me'></div>"
        );

        setTimeout(function() {
            div.innerHTML.should.equal("initial");
            
            _hyperscript.evaluate("set $global to 'hello world'");
            div.innerHTML.should.equal("hello world");
            
            _hyperscript.evaluate("set $global to 42");
            div.innerHTML.should.equal("42");
            
            delete window.$global;
            done();
        }, 10);
    });

    it("detects changes from $global variable", function (done) {
        var div = make(
            "<div _='when $global changes put it into me'></div>"
        );

        _hyperscript.evaluate("set $global to 'Changed!'");
        div.innerHTML.should.equal("Changed!");

        delete window.$global; 
        done();
    });

    it("detects changes from :element variable", function (done) {
        var div = make(
            "<div _='init set :count to 0 end " +
            "when :count changes put it into me end " +
            "on click increment :count'>0</div>"
        );

        div.innerHTML.should.equal("0");
        
        div.click();
        div.innerHTML.should.equal("1");

        div.click();
        div.innerHTML.should.equal("2");

        done();
    });

    it("triggers multiple elements watching same variable", function (done) {
        var div1 = make(
            "<div _='when $global changes put \"first\" into me'></div>"
        );
        var div2 = make(
            "<div _='when $global changes put \"second\" into me'></div>"
        );

        _hyperscript.evaluate("set $global to 'changed'");

        div1.innerHTML.should.equal("first");
        div2.innerHTML.should.equal("second");
        delete window.$global;
        done();
    });

    it("executes multiple commands", function (done) {
        var div = make(
            "<div _='when $global changes put \"first\" into me then add .executed to me'></div>"
        );

        _hyperscript.evaluate("set $global to 'go'");
        div.innerHTML.should.equal("first");
        div.classList.contains("executed").should.be.true;

        delete window.$global;
        done();
    });

    it("does not execute when variable is undefined initially", function (done) {
        var div = make(
            "<div _='when $global changes put \"synced\" into me'>original</div>"
        );

        setTimeout(function() {
            div.innerHTML.should.equal("original");
            done();
        }, 10);
    });

    it("only triggers when variable actually changes", function (done) {
        var div = make(
            "<div _='when $global changes increment @count then put @count into me'></div>"
        );
        
        div.setAttribute("count", "0");

        _hyperscript.evaluate("set $global to 'value1'");
        div.innerHTML.should.equal("1");

        _hyperscript.evaluate("set $global to 'value1'");
        div.innerHTML.should.equal("1");

        _hyperscript.evaluate("set $global to 'value2'");
        div.innerHTML.should.equal("2");

        delete window.$global;
        done();
    });

});