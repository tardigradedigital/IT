var Connection = require('tedious').Connection,
    Request = require('tedious').Request;

function openConnection() {
  var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  var mssql = require('../config/config')[env].mssql;
  var db = new Connection({
    domain: mssql.dbDomain,
    userName: mssql.dbUser,
    password: mssql.dbPass,
    server: mssql.dbHost,
    options: {
      database: mssql.db,
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  });
  return db;
}

exports.getCategories = function(req, res) {
  var connection = openConnection();

  var query = `
    SELECT
      [CAT_INDEX]
      ,[CAT_NAME]
    FROM [dbo].[CRONUS USA, Inc_$IT Inventory Part Categories]`;

  var request = new Request(query, function(err, rowCount, rows) {
    if(err) {
      console.log(err);
      connection.close();
    }
    else {
      // console.log(rows)
      var rowData = [];
      rows.forEach(function(columns) {
        var data = new Object();
        columns.forEach(function(column) {
          data[column.metadata.colName] = column.value;
        });
        rowData.push(data);
      })
      connection.close();
      res.send(rowData);
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.end();
    }
    else connection.execSql(request);
  })
}

exports.getManufacturers = function(req, res) {
  var connection = openConnection();

  var query = `
    SELECT
      [MAN_INDEX]
      ,[MAN_NAME]
    FROM [dbo].[CRONUS USA, Inc_$IT Inventory Part Manufacturer]`;

  var request = new Request(query, function(err, rowCount, rows) {
    if(err) {
      console.log(err);
      connection.close();
    }
    else {
      // console.log(rows)
      var rowData = [];
      rows.forEach(function(columns) {
        var data = new Object();
        columns.forEach(function(column) {
          data[column.metadata.colName] = column.value;
        });
        rowData.push(data);
      })
      connection.close();
      res.send(rowData);
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.end();
    }
    else connection.execSql(request);
  })
}

exports.getStores = function(req, res) {
  var connection = openConnection();

  var query = `
    SELECT
      [LOC_INDEX]
      ,[LOC_NAME]
    FROM [dbo].[CRONUS USA, Inc_$IT Inventory Part Storage]`;

  var request = new Request(query, function(err, rowCount, rows) {
    if(err) {
      console.log(err);
      connection.close();
    }
    else {
      // console.log(rows)
      var rowData = [];
      rows.forEach(function(columns) {
        var data = new Object();
        columns.forEach(function(column) {
          data[column.metadata.colName] = column.value;
        });
        rowData.push(data);
      })
      connection.close();
      res.send(rowData);
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.end();
    }
    else connection.execSql(request);
  })
}

exports.getSuppliers = function(req, res) {
  var connection = openConnection();

  var query = `
    SELECT
      [SUPL_INDEX]
      ,[SUPL_NAME]
    FROM [dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier]`;

  var request = new Request(query, function(err, rowCount, rows) {
    if(err) {
      console.log(err);
      connection.close();
    }
    else {
      // console.log(rows)
      var rowData = [];
      rows.forEach(function(columns) {
        var data = new Object();
        columns.forEach(function(column) {
          data[column.metadata.colName] = column.value;
        });
        rowData.push(data);
      })
      connection.close();
      res.send(rowData);
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.end();
    }
    else connection.execSql(request);
  })
}

exports.getParts = function(req, res) {
  var connection = openConnection();
  var limit = req.query.limit;
  var page = req.query.page;
  var cat = req.query.cat;
  var field = false;
  var filter = false;
  var exact = false;
  if(req.query.search) {
    filter = true,
    field = ['PART_NAME', 'PART_NUM', 'PART_DESC', 'PART_NOTES', 'MAN_NAME'];
    var search = req.query.search;
  }
  if(req.params.partNum) {
    filter = true;
    exact = true;
    var single = req.params.partNum;
  }

  function getDataQ() {
    var dataquery = `
      SELECT
        CONCAT([MAN_NAME], ' ', [PART_NAME]) AS [PART_FRIENDLY]
        ,[PART_NAME]
        ,[MAN_NAME]
        ,[MAN_INDEX]
        ,[PART_DESC]
        ,[PART_NUM]
        ,CAST([PART_COST] AS MONEY) AS [PART_COST]
        ,[PART_STORE]
        ,[LOC_NAME]
        ,[LOC_INDEX]
        ,[PART_STOCK]
        ,[PART_CAT]
        ,[CAT_NAME]
        ,[CAT_INDEX]
        ,[PART_NOTES]
        ,[PART_SUPL]
        ,[SUPL_NAME]
        ,[SUPL_INDEX]
        ,[PART_SUPLURL]
        ,[PART_SERIAL]
        ,[PART_MANUF]
        ,(SELECT COUNT([SPART_NUM]) FROM [dbo].[CRONUS USA, Inc_$IT Inventory Serialized Parts] serials WHERE serials.[SPART_NUM] = [PART_NUM] AND [SPART_STATUS] = 0) AS [SPART_STOCK]
      FROM [dbo].[CRONUS USA, Inc_$IT Inventory Parts]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Manufacturer]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory Parts].[PART_MANUF]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Manufacturer].[MAN_INDEX]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Storage]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory Parts].[PART_STORE]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Storage].[LOC_INDEX]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Categories]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory Parts].[PART_CAT]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Categories].[CAT_INDEX]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory Parts].[PART_SUPL]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier].[SUPL_INDEX]
    `;
    if(filter) {
      if(exact) dataquery += (" WHERE [PART_NUM] = '" + single + "'");
      else if(search) {
        if(typeof field == 'object' || cat > 0) {
          dataquery += ' WHERE (';
          fc = 0;
          field.forEach(function(f) {
            if(fc > 0) setor = ' OR ';
            else setor = '';
            dataquery += (setor + '[' + f + "] COLLATE SQL_Latin1_General_CP1_CI_AS LIKE '%" + search + "%'");
            fc++;
          });
          if(cat && cat !== 'All Categories') dataquery += (") AND [CAT_NAME] = '" + cat + "'");
          else dataquery += ')';
        }
      }
    }
    else if(cat && cat !== 'All Categories') dataquery += (" WHERE [CAT_NAME] = '" + cat + "'");
    if(limit) {
      dataquery += `
        ORDER BY [PART_FRIENDLY]
        OFFSET ` + ((page - 1) * limit) + ` ROWS
        FETCH NEXT ` + limit + ` ROWS ONLY
      `;
    }
    else if(!exact) dataquery += ' ORDER BY [PART_NAME]';

    return dataquery;
  }

  function getCountQ() {
    var countquery = `
      SELECT COUNT(*)
      FROM [dbo].[CRONUS USA, Inc_$IT Inventory Parts]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Manufacturer]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory Parts].[PART_MANUF]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Manufacturer].[MAN_INDEX]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Categories]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory Parts].[PART_CAT]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Categories].[CAT_INDEX]
      `;
    if(filter && search) {
      if(typeof field == 'object' || cat > 0) {
        countquery += 'WHERE (';
        fc = 0;
        field.forEach(function(f) {
          if(fc > 0) setor = ' OR ';
          else setor = '';
          countquery += (setor + '[' + f + "] COLLATE SQL_Latin1_General_CP1_CI_AS LIKE '%" + search + "%'");
          fc++;
        });
        if(cat && cat !== 'All Categories') countquery += (") AND [CAT_NAME] = '" + cat + "'");
        else countquery += ')';
      }
    }
    else if(cat && cat !== 'All Categories') countquery += (" WHERE [CAT_NAME] = '" + cat + "'");
    return countquery;
  }
  
  var request = new Request(getDataQ(), function(err, rowc, rows) {
    if(err) {
      console.log(err);
      connection.close();
      res.status(500);
      res.send({reason: err});
      res.end();
    }
    else {
      // console.log(rows)
      var rowData = [];
      rows.forEach(function(columns) {
        var data = new Object();
        columns.forEach(function(column) {
          data[column.metadata.colName] = (column.metadata.type.type === "MONEYN" ? column.value.toFixed(2) : column.value);
        });
        rowData.push(data);
      })

      // console.log(rowData)
      var rowCount = 0;
      connection.execSql(new Request(getCountQ(), function(err, rowc, rows) {
        if(err) {
          console.log(err);
          connection.close();
          res.status(500);
          res.send({reason: err});
          res.end();
        }
        rowCount = rows[0][0].value;
        connection.close();
        res.send({length: rowCount, data: rowData});
      }));
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.send({reason: err});
      res.end();
    }
    else connection.execSql(request);
  })
}

exports.updatePart = function(req, res) {
  var connection = openConnection();
  var payload = req.body.payload;

  var query = `
    UPDATE [dbo].[CRONUS USA, Inc_$IT Inventory Parts]
    `;
  query += ("SET [PART_DESC] = '" + payload.PART_DESC + "'");
  query += (", [PART_COST] = '" + payload.PART_COST + "'")
  query += (", [PART_STORE] = '" + payload.PART_STORE + "'")
  query += (", [PART_STOCK] = '" + payload.PART_STOCK + "'")
  query += (", [PART_CAT] = '" + payload.PART_CAT + "'")
  query += (", [PART_NOTES] = '" + payload.PART_NOTES + "'")
  query += (", [PART_SUPL] = '" + payload.PART_SUPL + "'")
  query += (", [PART_SUPLURL] = '" + payload.PART_SUPLURL + "'")
  query += (", [PART_SERIAL] = '" + payload.PART_SERIAL + "'")
  query += (", [PART_MANUF] = '" + payload.PART_MANUF + "'")
  query += (" WHERE [PART_NUM] = '" + payload.PART_NUM + "'");

  // console.log(query)
  // console.log('Params:', req.body.payload)
  var request = new Request(query, function(err, rowCount, count) {
    if(err) {
      console.log({reason: err});
      connection.close();
    }
    else {
      connection.close();
      res.send({data: 'success'});
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.end();
    }
    else connection.execSql(request);
  })
}

exports.getPO = function(req, res) {
  var connection = openConnection();
  var limit = req.query.limit;
  var page = req.query.page;
  var field = false;
  var filter = false;
  var exact = false;
  if(req.query.search) {
    filter = true,
    field = ['PO_NUM', 'SUPL_NAME'];
    var search = req.query.search;
  }
  if(req.params.poNum) {
    filter = true;
    exact = true;
    var single = req.params.poNum;
  }

  function getDataQ() {
    var dataquery = `
      SELECT
        [POI_UID]
        ,[POI_PNUM]
        ,[POI_INUM]
        ,[POI_COUNT]
        ,[POI_PERCOST]
        ,[POI_EXTCOST]
        ,[SUPL_NAME]
        ,[PO_NUM]
        ,[PO_ODATE]
        ,[PO_CDATE]
        ,[PO_COST]
        ,[PO_TAX]
        ,[PO_SHIP]
        ,[PO_VENDOR]
        ,[PO_STATUS]
        ,(SELECT COUNT([POI_PNUM]) FROM [dbo].[CRONUS USA, Inc_$IT Inventory PO Items] items WHERE items.[POI_PNUM] = [PO_NUM]) AS [PO_ICOUNT]
      FROM [dbo].[CRONUS USA, Inc_$IT Inventory PO]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory PO Items]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory PO].[PO_NUM]=[dbo].[CRONUS USA, Inc_$IT Inventory PO Items].[POI_PNUM]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory PO].[PO_VENDOR]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier].[SUPL_INDEX]
    `;
    if(filter) {
      if(exact) dataquery += (" WHERE [PO_NUM] = '" + single + "'");
      else if(search) {
        if(typeof field == 'object' || cat > 0) {
          dataquery += ' WHERE (';
          fc = 0;
          field.forEach(function(f) {
            if(fc > 0) setor = ' OR ';
            else setor = '';
            dataquery += (setor + '[' + f + "] COLLATE SQL_Latin1_General_CP1_CI_AS LIKE '%" + search + "%'");
            fc++;
          });
          dataquery += ')';
        }
      }
    }
    if(limit) {
      dataquery += `
        ORDER BY [PO_NUM]
        OFFSET ` + ((page - 1) * limit) + ` ROWS
        FETCH NEXT ` + limit + ` ROWS ONLY
      `;
    }
    else if(!exact) dataquery += ' ORDER BY [PO_NUM]';

    return dataquery;
  }

  function getCountQ() {
    var countquery = `
      SELECT COUNT(*)
      FROM [dbo].[CRONUS USA, Inc_$IT Inventory PO]
      LEFT JOIN [dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier]
      ON [dbo].[CRONUS USA, Inc_$IT Inventory PO].[PO_VENDOR]=[dbo].[CRONUS USA, Inc_$IT Inventory Part Supplier].[SUPL_INDEX]
    `;
    if(filter && search) {
      if(typeof field == 'object' || cat > 0) {
        countquery += 'WHERE (';
        fc = 0;
        field.forEach(function(f) {
          if(fc > 0) setor = ' OR ';
          else setor = '';
          countquery += (setor + '[' + f + "] COLLATE SQL_Latin1_General_CP1_CI_AS LIKE '%" + search + "%'");
          fc++;
        });
        countquery += ')';
      }
    }
    return countquery;
  }
  
  console.log(getDataQ(), getCountQ())

  var request = new Request(getDataQ(), function(err, rowc, rows) {
    if(err) {
      console.log(err);
      connection.close();
      res.status(500);
      res.send({reason: err});
      res.end();
    }
    else {
      // console.log(rows)
      var rowData = [];
      rows.forEach(function(columns) {
        var data = new Object();
        columns.forEach(function(column) {
          data[column.metadata.colName] = (column.metadata.type.type === "MONEYN" ? column.value.toFixed(2) : column.value);
        });
        rowData.push(data);
      })

      // console.log(rowData)
      var rowCount = 0;
      connection.execSql(new Request(getCountQ(), function(err, rowc, rows) {
        if(err) {
          console.log(err);
          connection.close();
          res.status(500);
          res.send({reason: err});
          res.end();
        }
        rowCount = rows[0][0].value;
        connection.close();
        res.send({length: rowCount, data: rowData});
      }));
    }
  });
  connection.on('connect', function(err) {
    if(err) {
      console.log(err);
      res.status(500);
      res.send({reason: err});
      res.end();
    }
    else connection.execSql(request);
  })
}