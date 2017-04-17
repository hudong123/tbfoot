//获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return r[2]; return null; //返回参数值
}

//分页
function getPage(page,allpage,node,fn) {
    //function getPage(page,allpage,node) {
    var curPage=parseInt(page);//当前页数
    var totalPages=parseInt(allpage);//全部页数
    var showPage=5;//省略号左右边中最大页数，只能设置奇数
    var halfShowPage=parseInt(showPage/2);
    var str=[];
    node.empty();
    if(curPage<1) {
        curPage=1;
    } else if(curPage>totalPages) {
        curPage=totalPages;
    }

    str.push('<div class="tbfoot_r">');

    str.push('<ul class="pagination">');
    if(curPage>1){
        str.push('<li><a class="btn_turn previous">Previous</a></li>');
    }else{
        str.push('<li><a class="btn_turn disabled">Previous</a></li>');
    }
    if(totalPages>(showPage+2)) {
        if((curPage-halfShowPage) <= 3 ){
            var length = (curPage +2 >5)?(curPage +2):showPage;
            for(var i=1;i<=length;i++) {
                if(i==curPage) {
                    str.push('<li class="active"><a>'+i+'</a></li>');
                } else {
                    str.push('<li><a class="btn_page">'+i+'</a></li>');
                }
            }
            str.push('<li><a class="btn_elli">......</a><a class="btn_page">'+totalPages+'</a></li>');
            //str.push('<a class="btn btn_elli">......</a><a class="btn btn_page">'+totalPages+'</a>');
        } else if((curPage+halfShowPage) >= totalPages){
            str.push('<li><a class="btn_page">1</a><a class="btn_page">2</a><a class="btn btn_elli">......</a></li>');
            for(var i=totalPages-showPage;i<=totalPages;i++) {
                if(i==curPage) {
                    str.push("<li class='active'><a>"+i+"</a></li>");
                } else {
                    str.push("<li><a class='btn_page'>"+i+"</a></li>");
                }
            }
            //str.push('<a class="btn btn_elli">......</a><a class="btn btn_page">'+totalPages+'</a>');
        } else {
            str.push('<li><a class="btn_page">1</a><a class="btn_page">2</a><a class="btn_elli">......</a></li>');
            for(var i=curPage-halfShowPage;i<=curPage+halfShowPage;i++) {
                if(i==curPage) {
                    str.push("<li class='active'><a>"+i+"</a></li>");
                } else {
                    str.push("<li><a class='btn_page'>"+i+"</a></li>");
                }
            }
            str.push('<li><a class="btn_elli">......</a><a class="btn_page">'+totalPages+'</a></li>');
        }
    } else {
        for(var i=1;i<=totalPages;i++) {
            if(i==curPage) {
                str.push("<li class='active'><a>"+i+"</a></li>");
            } else {
                str.push("<li><a class='btn_page'>"+i+"</a></li>");
            }
        }
    }
    if(curPage<totalPages){
        str.push("<li><a class='btn_turn next'>Next</a></li>");
    }else{
        str.push("<li><a class='btn_turn disabled'>Next</a></li>");
    }
    str.push('<li><input type="text" class="input_page" value="'+curPage+'" total="'+totalPages+'"></li>')
    str.push('<li><a>Go</a></li>')
    str.push('</ul>')
    node.append(str.join(""));
    pageEvent(node.attr('id'), fn);
}
//分页按钮事件
function pageEvent(id) {
	var idStr = id.indexOf('#') == -1?("#"+id):id;

	//分页按钮事件
	$(idStr+' .btn_page').click(function() {
        curpage=$(this).text();
        
	})
	$(idStr+' .btn_turn').click(function() {
		var cls = $(this).attr('class');
		var curr = parseInt($(this).parent().children('.active').text());
		if(cls.indexOf('previous') != -1) {
			curr--;
            curpage=curr;
		}
		if(cls.indexOf('next') != -1) {
			curr++;
            curpage=curr;
		}
        
	})
	$(idStr+' .input_page').keyup(function(event) {
		var val = $(this).val(),
			total = parseInt($(this).attr('total')),
			curr = parseInt($('.input_page').val());
		if(event.keyCode == 13) {
            curpage=curr;
            
		}
	})
}
