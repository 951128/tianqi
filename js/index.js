/*
* @Author: Administrator
* @Date:   2018-03-31 09:08:35
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-11 16:40:58
*/
// var weather;
// $.ajax({
// 	url: 'https://www.toutiao.com/stream/widget/local_weather/data/?city=晋城',
// 	type: 'get',
// 	dataType: 'jsonp',
// 	success:function(obj){
// 		console.log(obj.data.weather);
// 		weather=obj.data.weather;
// 		console.log(weather);
// 	},
// })
var city;
$.ajax({
    url: 'https://www.toutiao.com/stream/widget/local_weather/city/',
    type: 'get',
    dataType: 'jsonp',
    success:function(obj){
        console.log(obj);
        city=obj.data;
        console.log(city);
        renderCity(city);
    },
})
function renderCity(city){
    // 城市搜索  
    for(var j in city){
        // 创建元素
        var remen_text=document.createElement("div");
        remen_text.className="remen_text";
        remen_text.innerHTML=j;
        var city_box=document.querySelector(".remen_city");
        city_box.appendChild(remen_text);

        var city_list=document.createElement("div");
        city_list.className="city_list";
        city_box.appendChild(city_list);

        for(var m in city[j]){
            var shi=document.createElement("li");
            shi.className="location_city";
            shi.innerHTML=m;
            city_list.appendChild(shi);
        }        
    }   
}
function updata(weather){
	// 城市名称
	var city_name=document.querySelector(".city");
	city_name.innerHTML=weather.city_name;
	// 空气状况
	var wuran=document.querySelector(".kongqi h2");
	wuran.innerHTML=weather.quality_level;
	// 当前温度
	var wendu=document.querySelector("h3");
	wendu.innerHTML=weather.current_temperature+"°";
	// 当前天气情况
	var qingtian=document.querySelector("h4");
	qingtian.innerHTML=weather.current_condition;


    // 今天天气
	var today_tianqi=document.querySelector(".tady_bottom .text");
	today_tianqi.innerHTML=weather.dat_condition;
	// 今天最高温
	var dat_high_temperature=document.querySelector("#dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	// 今天最低温
	var dat_low_temperature=document.querySelector("#dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";
    // 今天icon
    var dat_weather_icon_id=document.querySelector("#dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;


	// 明天天气
	var tomorrow_condition=document.querySelector(".tomorrow .tady_bottom .text");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;
	// 明天最高温
	var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	// 明天最低温
	var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+"°";
	// 明天icon
	var tomorrow_weather_icon_id=document.querySelector("#tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;


    // 声明变量
    var str=("");
    // 循环  es6  模板字符串
    weather.hourly_forecast.forEach((item,index)=>{
        str=str+`
            <div class="now">
                <h2 class="now_time">${item.hour}:00</h2>
                <div class="now_icon" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
                <h2 class="now_wendu">${item.temperature}°</h2>
            </div>    
            `
    })
    $(".zhundian_box").html(str);
// 准点天气 
    // 数组类型的对象
    // for(var i in weather.hourly_forecast){
    //     // 创建now元素
    //     // 1、创建div
    //     var now=document.createElement("div");
    //     // 2、添加类名
    //     now.className="now";
    //     // 3、插入到页面中
    //     // 获取父元素
    //     var wrap=document.querySelector(".zhundian_box");
    //     // 将now插入到页面中
    //     wrap.appendChild(now);

    //     // 创建时间元素
    //     var time=document.createElement("h2");
    //     time.className="now_time";
    //     time.innerHTML=weather.hourly_forecast[i].hour+":00";
    //     now.appendChild(time);
    //     // 创建icon元素
    //     var icon=document.createElement("div");
    //     icon.className="now_icon";
    //     icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
    //     now.appendChild(icon);
    //     // 创建温度元素
    //     var wendu=document.createElement("h2");
    //     wendu.className="now_wendu";
    //     wendu.innerHTML=weather.hourly_forecast[i].temperature+"°";
    //     now.appendChild(wendu);
    // }


    
    var jinqi=("");
    // 循环  es6  模板字符串
    weather.forecast_list.forEach((item,index)=>{
        console.log(item,index);
        jinqi=jinqi+`
            <div class="con">
                <div class="con_date">
                    ${item.date.slice(5, 7)}/${item.date.slice(8)}
                </div>
                <div class="con_yunH">${item.condition}</div>
                <div class="con_imgH" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
                <h2 class="con_high">${item.high_temperature}°</h2>
                <h3 class="con_low">${item.low_temperature}°</h3>
                <div class="con_imgL" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
                <div class="con_yunL">${item.condition}</div>
                <div class="con_feng">${item.wind_direction}</div>
                <div class="con_fengji">${item.wind_level}</div>
            </div>  
            `
    })
    $(".jinqi_box").html(jinqi);
// 近期天气
    // for(var i in weather.forecast_list){
    // 	// 创建con元素
    //     var con=document.createElement("div");
    //     con.className="con";
    //     var daty=document.querySelector(".jinqi_box");
    //     daty.appendChild(con); 

    //     // 创建日期定位元素
    //     var dingwei=document.createElement("h1");
    //     dingwei.className="con_zuotian";
    //     dingwei.innerHTML=weather.forecast_list[i].date;      
    //     con.appendChild(dingwei); 

    //     // 创建天气H元素
    //     var tianqiH=document.createElement("div");
    //     tianqiH.className="con_yunH";
    //     tianqiH.innerHTML=weather.forecast_list[i].condition;      
    //     con.appendChild(tianqiH);

    //     // 创建iconH元素
    //     var iconH=document.createElement("div");
    //     iconH.className="con_imgH";
    //     iconH.style=`background-image:url(img/${weather.forecast_list[i].weather_icon_id}.png)`;
    //     con.appendChild(iconH);

    //     // 创建温度H元素
    //     var wenduH=document.createElement("div");
    //     wenduH.className="con_high";
    //     wenduH.innerHTML=weather.forecast_list[i].high_temperature;      
    //     con.appendChild(wenduH);

    //     // 创建温度L元素
    //     var wenduL=document.createElement("div");
    //     wenduL.className="con_low";
    //     wenduL.innerHTML=weather.forecast_list[i].low_temperature;      
    //     con.appendChild(wenduL);

    //     // 创建天气L元素
    //     var tianqiL=document.createElement("div");
    //     tianqiL.className="con_yunL";
    //     tianqiL.innerHTML=weather.forecast_list[i].condition;      
    //     con.appendChild(tianqiL);

    //     // 创建iconL元素
    //     var iconL=document.createElement("div");
    //     iconL.className="con_imgL";
    //     iconL.style=`background-image:url(img/${weather.forecast_list[i].weather_icon_id}.png)`;
    //     con.appendChild(iconL);

    //     // 创建风元素
    //     var feng=document.createElement("div");
    //     feng.className="con_feng";
    //     feng.innerHTML=weather.forecast_list[i].wind_direction;
    //     con.appendChild(feng);

    //     // 创建风级
    //     var fengji=document.createElement("div");
    //     fengji.className="con_feng";
    //     fengji.innerHTML=weather.forecast_list[i].wind_level;
    //     con.appendChild(fengji);
    // } 
    for(var j in city){
        // 创建元素
        var remen_text=document.createElement("div");
        remen_text.className="remen_text";
        remen_text.innerHTML=j;
        var city_box=document.querySelector(".remen_city");
        city_box.appendChild(remen_text);

        var city_list=document.createElement("div");
        city_list.className="city_list";
        city_box.appendChild(city_list);

        for(var m in city[j]){
            var shi=document.createElement("li");
            shi.className="location_city";
            shi.innerHTML=m;
            city_list.appendChild(shi);
        }        
    }      
}
// 页面加载完以后执行
function AJAX(str){
    var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
    $.ajax({
        url:url1,
        dataType:"jsonp",
        type:"get",
        success:function(obj){
            var weather=obj.data.weather;
            updata(weather);
            $(".location").css({"display":"none"});
            $(".hide").addClass('block');
        }
    })
}

window.onload=function(){
	// updata();
    renderCity();
    $(".location_city").on("click",function(){
        var cityh=this.innerHTML;
        AJAX(cityh);
    }) 
    $(".city").on("click",function(){
        $(".location").css({"display":"block"});
    })

    // 输入框获取焦点，按钮内容变搜索
    $("input").on("focus",function(){
        $(".search_right").html("搜索");
    })
    // 操作按钮
    var button=document.querySelector(".search_right");
    // 点击   取消location消失   搜索  str1==“城市名称” 
    button.onclick=function(){
        // 获取search-right的文本内容
        var text=button.innerText;
        console.log(text);//取消  确认
        if(text=="取消"){
            $(".location").css({"display":"none"});
        }
        else{
            // 获取input中输入的内容
            var str1=document.querySelector("input").value;
            // 比较  二级城市名
            for(var i in city){
                for(var j in city[i]){
                    if(str1==j){
                        AJAX(str1);
                        return;
                    }
                }
            }
            alert("没有该城市");
        }
    }
}
