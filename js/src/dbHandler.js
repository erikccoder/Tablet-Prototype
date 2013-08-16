define(
    [   "jquery",
        "underscore"
    ],function($, _)
    {

        function DBHandler()
        {

            this.db = null;
            return this;
        }

        DBHandler.prototype =
        {
            init: function (_callback) {
                console.log("init DB");
                var self = this;

                try {
                    if (window.openDatabase) {

                        var shortName = 'eDB';
                        var version = '1.0';
                        var displayName = 'Web DB for prototype.';
                        var maxSize = 50000000; // in bytes
                        this.db = openDatabase(shortName, version, displayName, maxSize);
                        // You should have a database instance in db.

                        if (!self.db)
                        {
                            alert("Failed to open the database on disk.  This is probably because the version was bad or there is not enough space left in this domain's quota");
                        }
                        else{
                            self.initTables(_callback);
                        }

                    } else
                        alert("Couldn't open the database.  Please try with a WebKit nightly with this feature enabled");
                } catch(err) {
                    // Error handling code goes here.
                    if (e == 2) {
                        // Version number mismatch.
                        alert("Invalid database version.");
                    } else {
                        alert("Unknown error "+e+".");
                    }
                    return;
                }
            },
            initTables:function (_callback) {
                var self = this,
                    db = self.db;

                db.transaction(function(tx) {
                    tx.executeSql("SELECT COUNT(*) FROM ListForPages", [], function(result) {
                        console.log("eDB is ready!");
                        self.setReady();

                        if(_callback)
                        {
                            _callback.call(this);
                        }

                    }, function(tx, error) {
                        tx.executeSql("CREATE TABLE ListForPages (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, page TEXT, content TEXT)", [], function(result) {
                            console.log("eDB is inited!");
                            tx.executeSql('insert into ListForPages (page, content) VALUES ("home", "{ timestamp : 0 }");', [],
                                //callback
                                function()
                                {
                                    console.log("record inerted");
                                    self.setReady();

                                    if(_callback)
                                    {
                                        _callback.call(this);
                                    }
                                },
                                //error callback
                                function(txt, err)
                                {
                                    console.log("record can't inerted",txt, err);
                                });
                        });
                    });
                });

//                db.transaction(
//                    function (transaction) {
//
//                        /* The first query causes the transaction to (intentionally) fail if the table exists. */
//                        transaction.executeSql('CREATE TABLE Lists4Pages(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, page TEXT NOT NULL DEFAULT "myTable", list TEXT NOT NULL DEFAULT "");', [], nullDataHandler, errorHandler);
//                        /* These insertions will be skipped if the table already exists. */
//                        /*
//                        transaction.executeSql('insert into people (name, shirt) VALUES ("Joe", "Green");', [], nullDataHandler, errorHandler);
//                        transaction.executeSql('insert into people (name, shirt) VALUES ("Mark", "Blue");', [], nullDataHandler, errorHandler);
//                        transaction.executeSql('insert into people (name, shirt) VALUES ("Phil", "Orange");', [], nullDataHandler, errorHandler);
//                        transaction.executeSql('insert into people (name, shirt) VALUES ("jdoe", "Purple");', [], nullDataHandler, errorHandler);
//                        */
//                    }
//                );

            },
            getContentFormPage: function(_page, _callback, _errCallback)
            {

                /*  TODO: bug fix: sql can't get results.
                *
                * */


                var sql = "SELECT content FROM ListForPages WHERE page = '" + _page + "'",
                    self = this,
                    db = self.db,
                    bReady = self.bReady;

                if(!bReady)
                {
                    console.log("DB is not ready!");
                    return;
                }



                sql = "SELECT COUNT(*) FROM ListForPages";

                _callback = _callback || function(_txt, _results){
                                            console.log("sql: ", sql);
                                            console.log("default callback: ", _txt, _results );
                                        };

                _errCallback = _errCallback || function(txt, error) {
                                                    console.log("sql error", txt, error);
                                                }

                db.transaction(function(tx) {
                    tx.executeSql(sql, [], _callback, _errCallback);
                });
            }
        }

        return DBHandler
    });