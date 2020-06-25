var fs = require('fs')
var xml2js = require('xml2js')

var inputfile = __dirname + '/restnoterat.xml'
var outputfile =  __dirname + '/restnoterat/public/supplyshortage.json'
// läs in data filen, t.ex. restnoteringar.xml
var data = fs.readFileSync(inputfile, 'utf8')
console.log(typeof(data))

/*  The XML document is not well formated
    since it contains "&", solution: replace "&" to &amp;
 */
data = data.replace(/&/g, '&amp;') 

// instansera parser
var parser = new xml2js.Parser();
parser.parseString(data, function (err, result) {
   
   var resultObject = JSON.stringify(result, true, 2)
   console.log(err)
   console.log(resultObject)
   var resultfile = fs.createWriteStream(outputfile)
   resultfile.write(resultObject)
})

