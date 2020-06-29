var fs = require('fs')
var xml2js = require('xml2js')

var inputfile = __dirname + '/restnoterat.xml'
var outputfile =  __dirname + '/restnoterat/public/supplyshortage.json'

// Reading the XML file
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

// initiate parser
var parser = new xml2js.Parser();
parser.parseString(data, function (err, result) {
  var resultObject = {}
  for (var s of result.supplyshortages.supplyshortage) {
    
    var nplId = s.medicinalproducts[0].medicinalproduct[0].nplid
    var packs = s.medicinalproducts[0].medicinalproduct[0].packages[0].package
    var startDate = s.medicinalproducts[0].medicinalproduct[0]['forecast-start-date']
    var endDate = s.medicinalproducts[0].medicinalproduct[0]['forecast-end-date']
    var referenceNumber = s.referencenumber
    var firstPublication = s['first-publication-date']
    var lastPublication = s['last-publication-date']
    var advice = s.advice
    var publicContact = s.publiccontactinfo 

    resultObject[nplId] = {
      nplId: nplId,
      packs: packs,
      referenceNumber: referenceNumber,
      advice: advice,
      publicContact: publicContact,
      publicationDate: {
        firstPublication: firstPublication,
        lastPublication: lastPublication
      },
      forecastDate: {
        startDate: startDate,
        endDate: endDate
      }


    }
    
  }
    //console.log(JSON.stringify(result, null, 2))
    // console.log(JSON.stringify(resultObject, null, 2))
  // resultObject = JSON.stringify(result, true, 2)
  //  console.log(err)
   
  
   var resultfile = fs.createWriteStream(outputfile)
   resultfile.write(JSON.stringify(resultObject))
})

