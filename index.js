var fs = require('fs')
var xml2js = require('xml2js')




var inputfile = "test.xml"

// läs in data filen, t.ex. restnoteringar.xml
var data = fs.readFileSync(__dirname + '/' + inputfile)

 //data = '<x>' + data + '</x>'
  
  
  // instansera parser
var parser = new xml2js.Parser();
parser.parseString(data, function (err, result) {
    //console.log(result)

  // console.log(JSON.stringify(result, true, 2))
  // TODO: converta till ett objekt som serialiseras till text (JSON.stringify())
   var resultObject = JSON.stringify(result, true, 2)
   console.log(resultObject)
   var outputfile = fs.createWriteStream("output.json")
   outputfile.write(resultObject)
})

// Skriv json objektet till en fil
//  var outputfile = fs.createWriteStream("output.json")
//  outputfile.write(resultObject)








// var parser = new xml2js.Parser();


// fs.readFile(__dirname + '/test.xml', function (err, data) {
    
//     parser.parseString(data, function (err, result) {
        
//         console.log('done')
//         var resultObject = JSON.stringify(result, true, 2)
//         console.log(resultObject)
//         // var outputfile = fs.createWriteStream("output.json")
//         // outputfile.write(resultObject)
//     });
// });