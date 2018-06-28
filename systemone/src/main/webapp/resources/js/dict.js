/**
 * 通用字典工具
 * Created by xiaow on 2017/1/20.
 */
var DictUtils = {
    data: {},
    getDictListByType:function (type) {
        return DictUtils.data[type];
    },
    getDictName:function(type,val){
        var dicts=DictUtils.getDictListByType(type);
        if(!dicts){
            return "";
        }
        for(var i=0;i<dicts.length;i++){
            if(dicts[i].itemCode==val){
                return dicts[i].itemName;
            }
        }
        return "";
    }
};
$.ajax({
    url:"dict/all",
    dataType:"json",
    async:true,
    success:function(result){
        if (result.success) {
            DictUtils.data = result.data;
            _bindDict();
        } else {
            alert("加载字典失败");
        }
    }
});
function  _bindDict() {
    $("select[data-bind-dict]").each(function(){
        var $select=$(this);
        var dictType=$select.data("bind-dict");
        var dicts=DictUtils.getDictListByType(dictType);
        var val=$select.data("value");
        for(var i=0;i<dicts.length;i++){
            var isSelected="";
            if(val==dicts[i].itemCode){
                isSelected="selected";
            }
            $("<option value='"+dicts[i].itemCode+"' "+isSelected+">"+dicts[i].itemName+"</option>").appendTo($select);
        }
    });
}