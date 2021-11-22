var _mod_ip_search_form_view_template;
var _mod_ip_search_result_view_template;

var _mod_ip_search_form_view_cache;

function _mod_ip_init (moduleCode, moduleOptions){
	if(!_mod_ip_search_form_view_template || !_mod_ip_search_result_view_template) {
		console.log("template is undefined, load template first");
		_mod_ip_loadModuleTemplates(moduleCode);
	} else {
		console.log("no need load template again");
		_mod_ip_loadInitModuleData();
	}
}

function _mod_ip_loadModuleTemplates(moduleCode)
{
	$.get("templates/mod-" + moduleCode + ".tmpl.html", 
		function (result) {
			var content = $($.parseHTML(result));

			_mod_ip_search_form_view_template=content.filter("#mod-ip-search-form-view").html();
			_mod_ip_search_result_view_template=content.filter("#mod-ip-search-result-view").html();

			_mod_ip_loadInitModuleData();
		}, 
		"html");
}

function _mod_ip_loadInitModuleData()
{
	//mock load init module data
	$.ajax({url: "https://get.geojs.io/v1/ip/country.json", success: function(result){
		_mod_ip_renderModule(result);
	}});		
}

function _mod_ip_renderModule(moduleData) {
	var template = Handlebars.compile(_mod_ip_search_form_view_template);
	$("#moduleBody").html(template(moduleData));	
}

function _mod_ip_checkIpCountry()
{
	_mod_ip_search_form_view_cache=$("#moduleBody").html();
	var ip=$("#txtIp").val();
	
	$.ajax({url: "https://get.geojs.io/v1/ip/country/" + ip + ".json", success: function(result){
		_mod_ip_renderIpCountry(result);
	}});		
			
}

function _mod_ip_renderIpCountry(data) {
	var template = Handlebars.compile(_mod_ip_search_result_view_template);
	$("#moduleBody").html(template(data));	
}

function _mod_ip_newCheck()
{
	$("#moduleBody").html(_mod_ip_search_form_view_cache);
}
