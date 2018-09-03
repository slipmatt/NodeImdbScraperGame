var request = require('request')
var cheerio = require('cheerio')

var top250 = [];
var ready = false;
var rounds=[];

var getTop250 = function () {
    console.log('scraping...')
    url = 'http://www.imdb.com/chart/top?ref_=nb_mv_3_chttp';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html, {});
            
            var _name, 
                _year;
             $('.seen-collection').filter(function(){
                var tableRow = $(this).find('.lister-list').find('tr');
                var i = 0;
                tableRow.each(function(){
                    var self = $(this);
                    i += 1;
                    var _name = self.find('.titleColumn').find('a').text().trim();
                    var _year = self.find('.titleColumn').find('.secondaryInfo').text().split(')')[0].split('(')[1].trim();
            
                    var data= {
                        index: i, 
                        name: _name,
                        year: _year   
                    };
                    top250.push(data);
                })
            })
            
            exports.ready=true
            ready=true
        }
        })
    }

    var setupGame = function(){
        for (a=1;a<=8;a++)
        {
            var item = top250[Math.floor(Math.random() * (top250.length / a))];
            console.log(item);
            var round = {
                number: a,
                title: item.name,
                year: item.year,
                answers: 0
            }
            rounds.push(round);
            console.log(round);
        }
        exports.rounds = rounds;
    }

    var resetGame = function () {
        rounds = [];
        setupGame();
        exports.rounds = rounds;
    }


exports.getTop250 = getTop250;  
exports.setupGame = setupGame;
exports.resetGame = resetGame;