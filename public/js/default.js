(function($,toastr){
   var _configDt = function(){
        $.extend($.fn.dataTable.defaults, {
            searching: false,
            ordering:  true,
            processing: true,
            serverSide: false,
            paging:true,
            PaginationType: "full_numbers",
            language:{
                processing: "玩命加载中...",
                loadingRecords: "加载中...",
                lengthMenu: "显示 _MENU_ 项结果",
                zeroRecords: "没有匹配结果",
                emptyTable: "没有任何记录",
                info: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                infoEmpty: "显示第 0 至 0 项结果，共 0 项",
                infoFiltered: "(由 _MAX_ 项结果过滤)",
                infoPostFix: "",
                search: "",
                url: "",
                paginate: {
                    first:    "首页",
                    previous: "上一页",
                    next:     "下一页",
                    last:     "末页"
                }
            }
        } );
    };
    var _toastr = function(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.options.progressBar = true;
        toastr.options.timeOut = 2000;      
        toastr.options.extendedTimeOut = 500;
    }
    _configDt();
    _toastr();
})(jQuery,toastr);