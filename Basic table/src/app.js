$(document).ready(function(){

  let extensionField
  let isAutoResizeEnabled = true
  const animationDuration = 300 //milliseconds
  
  $("#removeRows").hide()
  
  $("#addRow").click( event => {
    event.preventDefault()
    addRow()
    saveTableData()
    removeRowsButton()
    domListener()
  })
  
  $("#removeRows").click( event => {
    event.preventDefault()
    removeRows()
    saveTableData()
    removeRowsButton()
    domListener()
  })
  
  $("#dynamicTable").keyup( function() {
    saveTableData()
  })
    
  $('body').on('click', '.table_row', function () {
    removeRowsButton()
  }) 

  ContentstackUIExtension.init().then(function(extension) {
    // Make extension object globally available
    extensionField = extension
      
    // Enable auto resizing of field height 
    extensionField.window.enableAutoResizing()
    
    const data = {}
      
    data.rows = extensionField.field.getData().rows
    data.columns = extensionField.config.columns
    
    if (!data.columns)
    {
        $("#addRow").hide()
        $("#dynamicTable").html("Please define your columns in extension's config")
        return
    }
    
    initializeTable(data)
  })
  
  function initializeTable (data) {
  
    if (data === undefined)
      return
      
    const columns = data.columns
    const rows 	  = data.rows

    if(columns.length == 0)
      return
    
    // Clear table data if any
    $("#dynamicTable").html("")
    
    let tableContent = "";
    
    tableContent += "<tr><td></td>"
      
    // Create column fields 
    for (let i = 0; i<columns.length; i++)
      tableContent += "<td class='td_id_" + (i+1) + "'><strong>" + columns[i] + "</strong></td>"
    
    // End of column fields
    tableContent += "</tr>"
    
    for (let i = 0; i<rows.length; i++)
    {
      // Checkbox for row
      tableContent += "<tr><td><div class='cs-checkbox'><label><input class='cs table_row' type='checkbox' id=row_id_'" + (i+1) + "'/> <span class='lbl'></span></label></div></td>"

      // Create row fields
      for (let j = 0; j<rows[i].length; j++)
        tableContent += "<td class='td_id_" + (j+1) + "' contenteditable='true'>" + rows[i][j] + "</td>"
      
      // End of row
      tableContent += "</tr>"
    }
        
    $("#dynamicTable").html(tableContent)   
  }
  
  function saveTableData () {
    
    const tableData   = {}
    const rowsData    = []
    const columnData  = []
    const columns = $("#dynamicTable tr:nth-child(1) td")

    if (columns.length == 0)
      return
      
    columns.each( function (index) {
      if (index != 0)
        columnData.push($(this).text())
    })
    
    const rows = $("#dynamicTable tr")
      
    rows.each( function (index) {
      if (index > 0)
      {
        const trRecords = []
        $(this).children('td').each( function (index) {

          if (index != 0)
            trRecords.push($(this).text())

        })
        rowsData.push(trRecords)
      }
    })
    
    tableData.columns = columnData
    tableData.rows    = rowsData
    
    extensionField.field.setData(tableData)
  }
  
  function addRow () {
    const totalColumns = $("#dynamicTable tr:first td").length
    let tds            = "<td class='td_id_1' contenteditable='true'>1</td>"
      
    if (totalColumns == 0)
      return
      
    if (totalColumns > 2)
    {
      for (let i=2; i<totalColumns; i++)
        tds += "<td class='td_id_" + i + "' contenteditable='true'>" + i + "</td>"
    }
      
    $("#dynamicTable:last-child").append("<tr><td><div class='cs-checkbox'><label><input class='cs table_row' type='checkbox'/> <span class='lbl'></span></label></div></td>" + tds + "</tr>")
  }
  
  function removeRows () {
    $(".table_row:checkbox:checked").each(function(key, value){
      $(this).closest('tr').remove()
    })
  }
  
  function removeRowsButton () {
    const checkedCount = $(".table_row:checkbox:checked").length

    if (checkedCount)
      return $("#removeRows").fadeIn(animationDuration)

    $("#removeRows").fadeOut(animationDuration)
  }

  function domListener () {
    const iFrameHeight = $('body').height()
  
    if (iFrameHeight > 400 && isAutoResizeEnabled)
    {
      isAutoResizeEnabled = 0
      return extensionField.window.disableAutoResizing()
    }

    if (!isAutoResizeEnabled)
    {
      extensionField.window.enableAutoResizing()
      isAutoResizeEnabled = 1
    }
  }

})