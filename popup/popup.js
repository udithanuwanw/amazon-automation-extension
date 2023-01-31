let xlsData;
var ExcelToJSON = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        /*workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json_object = JSON.stringify(XL_row_object);
          xlsData = JSON.parse(json_object)
          chrome.runtime.sendMessage({start: xlsData});
        })*/
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
          var json_object = JSON.stringify(XL_row_object);
          xlsData = JSON.parse(json_object)
          console.log(xlsData);
          console.log(xlsData[0].Keyword);
          console.log(xlsData[0].CartASIN);
          console.log(xlsData[0].RandomMin);
          console.log(xlsData[0].RandomMax);
          chrome.runtime.sendMessage({type: "search", keyword: xlsData[0].Keyword, asin: xlsData[0].CartASIN,randomMin:xlsData[0].RandomMin,randomMax:xlsData[0].RandomMax});

          //chrome.runtime.sendMessage({start: {data:xlsData,row:0}});
      };

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };
};
document.getElementById("search").addEventListener("click", function() {
    var keyword = document.getElementById("keyword").value;
    var excel_file = document.getElementById("file").files[0];
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(excel_file)

    console.log(excel_file);
    
});
