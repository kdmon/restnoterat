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
    // We assume that there is only one medicinalproduct per row
    var nplId = s.medicinalproducts[0].medicinalproduct[0].nplid ? s.medicinalproducts[0].medicinalproduct[0].nplid[0] : ''
    // We can't assume that there is only a single package per nplid
    var packs = s.medicinalproducts[0].medicinalproduct[0].packages ? s.medicinalproducts[0].medicinalproduct[0].packages[0] : ''
    var startDate = s.medicinalproducts[0].medicinalproduct[0]['forecast-start-date'] ? s.medicinalproducts[0].medicinalproduct[0]['forecast-start-date'][0] : ''
    var endDate = s.medicinalproducts[0].medicinalproduct[0]['forecast-end-date'] ? s.medicinalproducts[0].medicinalproduct[0]['forecast-end-date'][0] : ''
    var referenceNumber = s.referencenumber ? s.referencenumber[0] : ''
    var firstPublication = s['first-publication-date'] ? s['first-publication-date'][0] : ''
    var lastPublication = s['last-publication-date'] ? s['last-publication-date'][0] : ''
    var advice = s.advice ? s.advice[0] : ''
    var publicContact = s.publiccontactinfo ? s.publiccontactinfo[0] : ''
    // console.log(packs.nplpackid.length >  1 ? 'två' : '')
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

