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

var obj = {
  npl1: {
    date: 2020
  }
}
var i = 'npl1'
console.log(obj[i].date)

// instansera parser
var parser = new xml2js.Parser();
parser.parseString(data, function (err, result) {
  var resultObject = {}
  for (var s of result.supplyshortages.supplyshortage) {
    
    var nplid = s.medicinalproducts[0].medicinalproduct[0].nplid
    var packs = s.medicinalproducts[0].medicinalproduct[0].packages[0].package

    resultObject[nplid] = {
      nplid: nplid,
      packs: packs
    }
    
  }

  // resultObject = JSON.stringify(result, true, 2)
  //  console.log(err)
   
  
  var resultfile = fs.createWriteStream(outputfile)
  resultfile.write(JSON.stringify(resultObject))
})
