$(document).ready(function(){
  let extensionField
  let isAutoResizeEnabled = true
  const animationDuration = 300 // milliseconds
 
  $("#removeRows").hide()
  $("#removeColumns").hide()
  $("#addRow").hide()
  
  $("#addRow").click( event => {
    event.preventDefault()
    addRow()
    saveTableData()
    domListener()
  })
  
  $("#addColumn").click( event => {
    event.preventDefault()
    addColumn()
    saveTableData()
    addRowButton()
  })
  
  $("#removeRows").click( event => {
    event.preventDefault()
    removeRows()
    removeRowsButton()
    saveTableData()
    domListener()
  })
    
  $("#removeColumns").click( event => {
    event.preventDefault()
    removeColumns()
    removeColumnsButton()
    removeRowsButton()
    saveTableData()
    addRowButton()
  })

  $('body').on('click','.table_row', () => {
    removeRowsButton()
  })

  $('body').on('click','.table_column', () => {
    removeColumnsButton()
  })
  
  $("#dynamicTable").keyup( () => {
    saveTableData()
  })
  
  ContentstackUIExtension
  .init()
  .then( function (extension) {
    // Make extension object globally available
    extensionField = extension
    
    // Enable auto resizing of field height 
    extensionField.window.enableAutoResizing()
      
    initializeTable(extensionField.field.getData())
  })
  .then( () => {
      addRowButton()
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
    
    let tableContent = "<tr><td></td>";
    
    // Create checkboxes for columns
    for (let i = 0; i<columns.length ;i++)
      tableContent += "<td class='td_id_" + (i+1) + "'><div class='cs-checkbox'><label><input class='cs table_column' type='checkbox' id='td_id_" + (i+1) + "'/><span class='lbl'></span></label></div></td>"
    
    // End of columns checkboxes
    tableContent += "</tr><tr><td></td>"
      
    // Create column fields
    for (let i = 0; i<columns.length; i++)
      tableContent += "<td class='td_id_" + (i+1) + "' contenteditable='true'><strong>" + columns[i] + "</strong></td>"
    
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
    const columns     = $("#dynamicTable tr:nth-child(2) td")
      
    columns.each( function (index) {
      if (index != 0)
        columnData.push($(this).text())
    })
      
    const rows = $("#dynamicTable tr")
 
    rows.each( function (index) {

      if (index > 1)
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
      return  // Cannot add a row if there are no column(s)
      
    if (totalColumns > 2)
    {
      for (let i=2; i<totalColumns; i++)
        tds += "<td class='td_id_" + i + "' contenteditable='true'>" + i + "</td>"
    }
      
    $("#dynamicTable:last-child").append("<tr><td><div class='cs-checkbox'><label><input class='cs table_row' type='checkbox'/><span class='lbl'></span></label></div></td>" + tds + "</tr>")
  }
  
  function removeRows () {
    $(".table_row:checkbox:checked").each(function(key, value){
      $(this).closest('tr').remove()
    })
  }
    
  function addColumn () {
    const totalColumns = $("#dynamicTable tr:first td").length

    if (totalColumns == 0)
      return $("#dynamicTable:last-child").append("<tr><td></td><td class='td_id_1'><div class='cs-checkbox'><label><input class='cs table_column' type='checkbox' id='td_id_1'/><span class='lbl'></span></label></div></td></tr><tr><td></td><td class='td_id_1' contenteditable='true'><strong>1</strong></td></tr>")
      
    $("table:first tr").each(function(index){

      if (index == 0)
        return  $(this).append("<td class='td_id_" + totalColumns + "'><div class='cs-checkbox'><label><input class='cs table_column' type='checkbox' id='td_id_" + totalColumns + "'/><span class='lbl'></span></label></div></td>")

      $(this).append("<td class='td_id_" + totalColumns + "' contenteditable='true'><strong>" + totalColumns + "</strong></td>")
    
    })
  }
  
  function removeColumns () {
    $(".table_column:checkbox:checked").each(function(key, value){
      const tdClass = $(this).attr('id')
      $("."+tdClass).remove()

      const totalColumns = $("#dynamicTable tr:first td").length

      if (totalColumns == 1)
        $("#dynamicTable").html('')
    })
  }

  function removeRowsButton () {
    const checkedCount = $(".table_row:checkbox:checked").length

    if (checkedCount)
      return $("#removeRows").fadeIn(animationDuration)

    $("#removeRows").fadeOut(animationDuration)
  }

  function removeColumnsButton () {
    const checkedCount = $(".table_column:checkbox:checked").length
    
    if (checkedCount)
      return $("#removeColumns").fadeIn(animationDuration)

    $("#removeColumns").fadeOut(animationDuration)
  }
  
  function addRowButton () {
    const totalColumns = $("#dynamicTable tr:first td").length
  
    if (totalColumns)
      return $("#addRow").fadeIn(animationDuration)
    
    $("#addRow").fadeOut(animationDuration)
  }

  function domListener () {
    const iFrameHeight = $('body').height()
  
    if (iFrameHeight > 400 && isAutoResizeEnabled)
    {
      isAutoResizeEnabled = false
      return extensionField.window.disableAutoResizing()
    }

    if (!isAutoResizeEnabled)
    {
      isAutoResizeEnabled = true
      extensionField.window.enableAutoResizing()
    }
  }
})