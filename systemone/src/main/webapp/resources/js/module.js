/**
 * Created by xiaow on 2017/1/14.
 */
function bindJqEditTable(element) {
    var $this = $(element);
    $this.empty();
    var contractId = $this.data("contract-id");
    var editable = $this.data("editable");
    var selectable = $this.data("selectable");
    var tplUrl = $this.data("tpl-url");
    var listUrl = $this.data("list-url").replace("{contractId}", contractId);
    var editUrl = $this.data("edit-url").replace("{contractId}", contractId);
    var model = $this.attr("data-model");
    contractId = (!contractId || contractId == '') ? 0 : contractId;
    $.get(tplUrl, function (resp) {
        var $grid = $(resp);
        $grid.appendTo($this);
        $grid.data("list-url", listUrl);
        $grid.data("edit-url", editUrl);
        $grid.data("selectable", selectable);
        $grid.data("contract-id", contractId);
        _bindGrid($grid, model, editable);
    })
}
$(function () {
    $("jq-edit-table").each(function () {
        bindJqEditTable(this);
    });
    $("jq-select-table").each(function () {
        var $this = $(this);
        var contractId = $this.data("contract-id");
        var editable = $this.data("editable");
        var tplUrl = $this.data("tpl-url");
        var listUrl = $this.data("list-url").replace("{contractId}", contractId);
        var model = $this.attr("data-model");
        contractId = (!contractId || contractId == '') ? 0 : contractId;
        $.get(tplUrl, function (resp) {
            var $grid = $(resp);
            $grid.appendTo($this);
            $grid.data("list-url", listUrl);
            $grid.data("contract-id", contractId);
            _bindSelectGrid($grid, model, editable);
        })
    });


    if ($.fn.select2) {
        //bind select2 plugin
        $("select").each(function () {
            var $select = $(this);
            var value = $select.data("value");
            var data = $select.data("data");
            var dataUrl = $select.data("url");
            var propertyKey = $select.data("property-key") || 'text';
            var propertyValue = $select.data("property-value") || 'id';
            var callback = $select.data("on-change");
            var options = {
                theme: "bootstrap",
                language: "zh-CN",
                allowClear: true,
                placeholder: "请选择",
                maximumInputLength: 10
            };
            options.tags = $select.data("enable-tags");
            if (data) {
                options.data = data;
            }
            if (dataUrl) {
                $.getJSON(dataUrl, function (result) {
                    var items = [];
                    for (var i = 0; i < result.length; i++) {
                        items.push({
                            id: result[i][propertyValue],
                            text: result[i][propertyKey]
                        })
                    }
                    options.data = items;
                    $select.select2(options);
                    if (value) {
                        $select.val(value).trigger('change.select2');
                    }
                    if (callback) {
                        $select.on('select2:select', function (evt) {
                            var selectId = $select.val();
                            for (var i = 0; i < result.length; i++) {
                                if (result[i][propertyValue] == selectId) {
                                    window[callback](result[i]);
                                }
                            }
                        });
                    }

                })
            } else {
                $select.select2(options);
                if (value) {
                    $select.val(value).trigger('change.select2');
                }
            }

        });
    }
    if (window.laydate) {
        //laydate不支持批量绑定，这里做法是遍历绑定，但由于laydate必需指定元素ID，所以这里手动生成ID，再调用laydate
        var datepickerCount = 1;
        $(".datepicker").each(function () {
            datepickerCount++;
            var $this=$(this);
            var thisId = $this.attr("id");
            if(!thisId){
                thisId="__datepicker_" + datepickerCount;
                $this.attr("id",thisId);
            }
            var opts={
                elem: "#" + thisId,
                format: 'YYYY-MM-DD',
                max: '2099-06-16',
                istoday: true,
                choose:function(date){
                    $this.change();
                }
            };
            if($this.data("max")){
                $($this.data("max")).change(function(){
                   opts.max=this.value;
                });
            }
            if($this.data("min")){
                $($this.data("min")).change(function(){
                    opts.min=this.value;
                });
            }
            laydate(opts)
        });
    }
    $("input[type='number']").blur(function () {
        var $input = $(this);
        var step = $input.attr("step");
        if (step) {
            var keep=step.substr(step.indexOf(".")+1,step.length).length;
            $input.val(parseFloat($input.val()).toFixed(keep))
        }
    });
});
function _bindGrid($this, modelName, editable) {
    var listUrl = $this.data("list-url");
    var editUrl = $this.data("edit-url");
    var selectable = $this.data("selectable");
    var contractId = $this.data("contract-id");
    var isNewContract = false;
    if (contractId == "" || contractId == null) {
        isNewContract = true;
    }

    var $table = $this.find(".jq-table").first();
    var tableId = $table.attr("id");
    var gridId = $this.attr("id");
    var $modal = $this.find(".modal");
    $modal.attr("id", gridId + "_model");
    $modal.remove();
    $modal.appendTo("body");
    var rows = modelName ? window[modelName] : [];

    var columns = eval("(" + $this.attr("data-columns") + ")");

    var operatorColumn = {
        "editable": false,
        "name": "operator",
        "label": "操作",
        sortable: false,
        formatter: function (cellValue, options, rowObject) {
            var tpl = "<a class='btn btn-circle' onclick='editRow(\"" + gridId + "\"," + rowObject.id + ")'><i class='glyphicon glyphicon-edit'></i></a>" +
                "<a class='btn btn-circle' onclick='removeRow(\"" + tableId + "\"," + rowObject.id + ",\"" + modelName + "\")'><i class='glyphicon glyphicon-trash'></i></a>";
            return tpl;
        }
    };
    if (editable) {
        columns.push(operatorColumn);
    }
    var opts = {
        datatype: 'json',
        url: listUrl,
        data: {"records": rows.length, "page": 1, "total": rows.length, "rows": rows},
        editurl: 'clientArray',
        colModel: columns,
        styleUI: 'Bootstrap',
        height: 200,
        rowNum: 1000, autowidth: true, shrinkToFit: true
    };
    if (selectable) {
        opts.multiselect = true;
        opts.pager = "#" + tableId + "_pager";
        opts.pagerpos = "left";
    }
    $table.jqGrid(opts);
    var $addBtn = $this.find(".btn-add").first();
    var $tableContainer = $this.parent().find(".table-container");

    $this.find(".btn-expand").click(function () {
        var $this = $(this);
        if ($tableContainer.height() == 0) {
            $tableContainer.css("height", "auto");
        } else {
            $tableContainer.css("height", 0);
        }
        $addBtn.toggleClass("hide");
        $this.find("i").toggleClass("glyphicon-arrow-right").toggleClass("glyphicon-arrow-down");
        ;
    });
    if (editable) {
        $addBtn.click(function () {
            editRow(gridId, null);
        });
    } else {
        $tableContainer.css("height", "auto");
        $addBtn.remove();
    }

    //添加共借人对话框中的【确认】按钮点击事件
    $modal.find(".btn-confirm").click(function () {
        var data = {};
        $modal.find(".form-control").each(function () {
            var $this = $(this);
            var name = $this.attr("name");
            data[name] = $this.val();
        });
        if (!isNewContract) {
            $.ajax({
                url: editUrl,
                type: "post",
                dataType: "json",
                data: data,
                success: function (resp) {
                    if (resp.success) {
                        if (data["id"]) {
                            $table.setRowData(data["id"], data, "");
                        } else {
                            data["id"] = resp.id;
                            $table.addRowData(resp.id, data, "last");
                        }
                        $modal.modal("hide");
                    }
                }
            })
        } else {
            //计算当前表格中最大的索引号，这里的ID和数据库的ID不是一个，只是前端编辑使用，后台会重新生成ID值
            var ids = $table.jqGrid('getDataIDs');
            var maxId = (ids.length > 0) ? Math.max.apply(Math, ids) : 0;
            if (data["id"]) {//编辑模式
                $table.setRowData(data["id"], data, "");
            } else {//新增模式
                data["id"] = maxId + 1;
                $table.addRowData(maxId + 1, data, "last");
            }
            window[modelName] = $table.getRowData();
            $modal.modal("hide");
        }

    });

    $modal.find("select").each(function () {
        var $select = $(this);
        var url = $select.data("url");
        if (url) {
            $.getJSON(url, function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("<option value='" + data[i].id + "'>" + data[i].text + "</option>").appendTo($select);
                }
            });
        }
    });
}
//编辑行数据
function editRow(gridId, index) {
    var data = {};
    var $grid = $("#" + gridId);
    if (index) {
        var $table = $grid.find(".jq-table").first();
        data = $table.getRowData(index);
    }
    var $modal = $("#" + gridId + "_model");
    $modal.find(".form-control").each(function () {
        var $this = $(this);
        var name = $this.attr("name");
        if (data[name]) {
            $this.val(data[name]);
        } else {
            $this.val("");
        }
    });
    $modal.modal("show");
}
//删除行
function removeRow(tableId, id, modelName) {
    var $table = $("#" + tableId);
    $table.delRowData(id);
    window[modelName] = $table.getRowData();
}
function _bindSelectGrid($this, modelName, editable) {
    var listUrl = $this.data("list-url");
    var contractId = $this.data("contract-id");

    var $table = $this.find(".jq-table").first();
    var tableId = $table.attr("id");
    var gridId = $this.attr("id");
    var $modal = $this.find(".modal");
    $modal.attr("id", gridId + "_model");
    $modal.remove();
    $modal.appendTo("body");
    var rows = modelName ? window[modelName] : [];

    var columns = eval("(" + $this.attr("data-columns") + ")");
    var operatorColumn = {
        "editable": false,
        "name": "operator",
        "label": "操作",
        sortable: false,
        formatter: function (cellValue, options, rowObject) {
            return "<a class='btn btn-circle' onclick='removeRow(\"" + tableId + "\"," + rowObject.id + ",\"" + modelName + "\")'><i class='glyphicon glyphicon-trash'></i></a>";
        }
    };
    if (editable) {
        columns.push(operatorColumn);
    }

    $table.jqGrid({
        datatype: 'json',
        url: listUrl,
        data: {"records": rows.length, "page": 1, "total": rows.length, "rows": rows},
        editurl: 'clientArray',
        colModel: columns,
        styleUI: 'Bootstrap',
        rowNum: 1000, autowidth: true, shrinkToFit: true
    });
    var $addBtn = $this.find(".btn-add").first();
    var $tableContainer = $this.parent().find(".table-container");

    $this.find(".btn-expand").click(function () {
        var $this = $(this);
        if ($tableContainer.height() == 0) {
            $tableContainer.css("height", "auto");
        } else {
            $tableContainer.css("height", 0);
        }
        $addBtn.toggleClass("hide");
        $this.find("i").toggleClass("glyphicon-arrow-right").toggleClass("glyphicon-arrow-down");
        ;
    });
    if (editable) {
        var $modal = $("#" + gridId + "_model");
        var $selectTable = $modal.find("jq-edit-table");
        $addBtn.click(function () {
            bindJqEditTable($selectTable[0]);
            $modal.modal("show");
        });
        $modal.find(".btn-primary").click(function () {
            var $jqtable = $selectTable.find(".jq-table");
            var ids = $jqtable.jqGrid("getGridParam", 'selarrrow');
            if (ids && ids.length > 0) {
                for (var i = 0; i < ids.length; i++) {
                    var rowData = $jqtable.jqGrid("getRowData", ids[i]);
                    $table.jqGrid("addRowData", rowData.id, rowData, "last");
                }
                window[modelName] = $table.getRowData();
                $modal.modal("hide");
            } else {
                swal("请选择要添加的数据");
            }
        });
    } else {
        $tableContainer.css("height", "auto");
        $addBtn.remove();
    }
}