window.addEventListener("load", function() {
    getRows();
});

function getRows() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "../xml/runes.xml", true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showResult(this);
        }
    };
    xmlhttp.send(null);
}

function showResult(xmlhttp) {
    var xmlDoc = xmlhttp.responseXML.documentElement;
    removeWhitespace(xmlDoc);
    var outputResult = document.getElementById("runeRows");
    var rowData = xmlDoc.getElementsByTagName("Rune");

    addTableRowsFromXmlDoc(rowData,outputResult);
}

function addTableRowsFromXmlDoc(xmlNodes,tableNode) {

    var theTable = tableNode.parentNode;
    var newRow, newCell, i;
    
    console.log ("Number of nodes: " + xmlNodes.length);
    
    for (i = 0; i < xmlNodes.length; i++) {
    
        newRow = tableNode.insertRow(i);
        newRow.className = i % 2 ? "OddRow" : "EvenRow";
        
        newCell = newRow.insertCell(newRow.cells.length);
        newCell.style.background = `url(${xmlNodes[i].childNodes[0].firstChild.nodeValue}) no-repeat center`;
        
        for (j = 1; j < xmlNodes[i].childNodes.length; j++) {
        
            newCell = newRow.insertCell(newRow.cells.length);
            
            if (xmlNodes[i].childNodes[j].firstChild) 
            {
                newCell.innerHTML = xmlNodes[i].childNodes[j].firstChild.nodeValue;
            } else 
            {
                newCell.innerHTML = "-";
            }
            
            console.log("cell: " + newCell);
        }
    }
    theTable.appendChild(tableNode);
}

function removeWhitespace(xml) {
    var loopIndex;
    for (loopIndex = 0; loopIndex < xml.childNodes.length; loopIndex++)
    {
        var currentNode = xml.childNodes[loopIndex];
        if (currentNode.nodeType == 1)
        {
            removeWhitespace(currentNode);
        }
        if (!(/\S/.test(currentNode.nodeValue)) && (currentNode.nodeType == 3))
        {
            xml.removeChild(xml.childNodes[loopIndex--]);
        }
    }
}
