var _mod_comdir_search_form_view_template;
var _mod_comdir_search_result_view_template;
var _mod_comdir_user_detail_view_template;

var _mod_comdir_deptsCache;
var _mod_comdir_search_result_view_cache;

function _mod_comdir_init (moduleCode, moduleOptions){
	if(!_mod_comdir_search_form_view_template 
        || !_mod_comdir_search_result_view_template
        || !_mod_comdir_user_detail_view_template) {
		console.log("template is undefined, load template first");
		_mod_comdir_loadModuleTemplates(moduleCode);
	} else {
		console.log("no need load template again");
		_mod_comdir_renderSearchForm(_mod_comdir_deptsCache);
	}
}

function _mod_comdir_loadModuleTemplates(moduleCode)
{
	$.get("templates/mod-" + moduleCode + ".tmpl.html", 
		function (result) {
			var content = $($.parseHTML(result));

			_mod_comdir_search_form_view_template=content.filter("#mod-comdir-search-form-view").html();
			_mod_comdir_search_result_view_template=content.filter("#mod-comdir-search-result-view").html();
			_mod_comdir_user_detail_view_template=content.filter("#mod-comdir-user-detail-view").html();
            
			_mod_comdir_loadInitModuleData();
		}, 
		"html");
}

function _mod_comdir_loadInitModuleData()
{
	//mock load init module data
	$.ajax({url: "https://cityuhk-websp1-stg.azurewebsites.net/apiexamples/api/depts", success: function(result){
        _mod_comdir_deptsCache = result;
		_mod_comdir_renderSearchForm(result);
	}});		
}

function _mod_comdir_getUserDetail(eid)
{
    console.log(eid);
	$.ajax({url: "https://cityuhk-websp1-stg.azurewebsites.net/apiexamples/api/comdir/" + eid, success: function(result){
        console.log(result);
		_mod_comdir_renderUserDetail(result);
	}});		
}

function _mod_comdir_search()
{
	var eid=$("#txtEid").val();
	var dept=$("#ddlDept").val();

    $.post( "https://cityuhk-websp1-stg.azurewebsites.net/apiexamples/api/comdir", 
                {Eid: eid, Dept: dept},
                function(result) {
                    _mod_comdir_renderSearchResult(result);
                });			
}

function _mod_comdir_newSearchForm()
{
    _mod_comdir_renderSearchForm(_mod_comdir_deptsCache);
}

function _mod_comdir_backToSearchResultView()
{
	$("#moduleBody").html(_mod_comdir_search_result_view_cache);
}

function _mod_comdir_renderSearchForm(moduleData) {
	var template = Handlebars.compile(_mod_comdir_search_form_view_template);
	$("#moduleBody").html(template(moduleData));	
}

function _mod_comdir_renderSearchResult(data) {
	var template = Handlebars.compile(_mod_comdir_search_result_view_template);
	$("#moduleBody").html(template(data));	
	_mod_comdir_search_result_view_cache=$("#moduleBody").html();
}

function _mod_comdir_renderUserDetail(data) {
	var template = Handlebars.compile(_mod_comdir_user_detail_view_template);
	$("#moduleBody").html(template(data));	
}

