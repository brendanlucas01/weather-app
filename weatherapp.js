//alert("Connected");
//https://vignette.wikia.nocookie.net/nightspeakers/images/2/28/Night.jpg/revision/latest?cb=20181012205540
//https://c4.wallpaperflare.com/wallpaper/597/73/315/night-moon-sky-clouds-wallpaper-preview.jpg
//https://s3.envato.com/files/b4c399b4-a111-4a33-a3b3-041c175ae40c/inline_image_preview.jpg
var latitude;
var longitude;
var field=document.body;
var cityname=document.getElementById("cityname");
var sunrise=document.getElementById("sunriser");
var sunset=document.getElementById("sunseter");
var img = document.querySelectorAll(".imgs");
var infomation=document.querySelectorAll(".info");
var minTemp=document.querySelectorAll(".mintemp");
var maxTemp=document.querySelectorAll(".maxtemp");
var humidity=document.querySelectorAll(".humid");
var windspeed=document.querySelectorAll(".speed");
var pressure =document.querySelectorAll(".pres");
var visibility=document.querySelectorAll(".vis");
var avgTemp=document.querySelectorAll(".avgtemp");
var date=document.querySelectorAll(".date");
var alink=document.querySelectorAll(".meta");
var ecity=document.getElementById("Ecity");
var elatt=document.getElementById("Elatt");
var elong=document.getElementById("Elong");
var butn1=document.getElementById("butn1");
var butn2=document.getElementById("butn2");
var butn3=document.getElementById("butn3");
var buttonn4=document.getElementById("button4");
var button5=document.getElementById("button5");
var daydis=document.getElementById("todaydate");
var messenger=document.querySelector("#message");
var jumbo=document.getElementById("jumbotron");
var icon1=document.getElementById("icon1");
var icon2=document.getElementById("icon2");
var citylink=document.getElementById("citylink");
var cities;
var cityid;
var reqlink;
var reqlink2;
var reqlink3;
var Tsunrise;
var Tsunset;
var Ddate;
var qwerty;

butn3.addEventListener("click",function(){ messenger.innerText=""; getCoords();});
button5.addEventListener("click",function(){ darkMode();});
button4.addEventListener("click",function(){ lightMode();});

function getData(latitude,longitude){
	reqlink="https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong="+latitude+","+longitude;
	
	function reqListener(){
		//console.log(this.responseText);
		cities=JSON.parse(this.responseText);
	 	cityid=cities[0].woeid;
	 	console.log(cities[0]);
	 	present(cities);
	 	cityid=parseInt(cityid);
	 	getCity(cityid);

	
	}
	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET",reqlink);
	oReq.send();
	
 }

butn2.addEventListener("click",function(){
	if (elatt.value==""||elong.value=="") {
		messenger.innerText="Enter Correct Coordinates";
	} 
	else {
		messenger.innerText="";
		latitude=elatt.value;
		longitude=elong.value;
		elatt.value="";
		elong.value="";
		getData(latitude,longitude);
	}
		
});

butn1.addEventListener("click",function(){
	if (ecity.value=="") {
		messenger.innerText="Please Enter Name of City";
	} 
	else {
		messenger.innerText="";
		getData2(ecity.value);
	}
		
});

function getData2(qwerty){
	reqlink="https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="+qwerty;
	function reqListener(){
		//console.log(this.responseText);
		cities=JSON.parse(this.responseText);
		console.log(cities);
		if (cities.length===0) {
			messenger.innerText="City Not Found in Database, please recheck spelling or try another city";
		}
		else {
		messenger.innerText="";
		ecity.value="";
		cityid=cities[0].woeid;
	 	console.log(cities);
	 	present(cities);
	 	cityid=parseInt(cityid);
	 	getCity(cityid);
		}
	 	

	
	}
	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET",reqlink);
	oReq.send();
	
 }


 function getCity(cityid){
 	reqlink2="https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"+cityid+"/";
	function cityDet(){
		var data=JSON.parse(this.responseText);
		present2(data, cityid);
		
	} 
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", cityDet);
	oReq.open("GET",reqlink2);
	oReq.send();
}

function getCoords(){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position.coords.latitude,position.coords.longitude);
			latitude=position.coords.latitude;
			longitude=position.coords.longitude;
			console.log(latitude,longitude);
			getData(latitude,longitude)
		});
}


function present(cities){
cityname.innerText=cities[0].title;
}

function present2(data, cityid){
	console.log(data);
	console.log(data.consolidated_weather[0]);
	Tsunrise=new Date(data.sun_rise);
	Tsunset=new Date(data.sun_set)
	sunrise.innerText="  "+Tsunrise.toLocaleTimeString('en-IN');
	sunset.innerText="  "+Tsunset.toLocaleTimeString('en-IN');
	console.log(img);

	for (var i = 0; i < 6; i++) {
		img[i].style.display = 'block';
		img[i].src='https://www.metaweather.com/static/img/weather/png/'+data.consolidated_weather[i].weather_state_abbr+'.png';
		infomation[i].innerText=data.consolidated_weather[i].weather_state_name;
		maxTemp[i].innerText=Math.floor(data.consolidated_weather[i].max_temp);
		minTemp[i].innerText=Math.floor(data.consolidated_weather[i].min_temp);
		avgTemp[i].innerText=Math.floor(data.consolidated_weather[i].the_temp);
		humidity[i].innerText=Math.floor(data.consolidated_weather[i].humidity);
		pressure[i].innerText=Math.floor(data.consolidated_weather[i].air_pressure);
		windspeed[i].innerText=Math.floor((data.consolidated_weather[i].wind_speed)*1.6);
		visibility[i].innerText=Math.floor((data.consolidated_weather[i].visibility)*1.6);
		Ddate=new Date(data.consolidated_weather[i].applicable_date);
		date[i].innerText=Ddate.toDateString();
		reqlink3="https://www.metaweather.com/"+cityid+"/"+Ddate.getFullYear()+"/"+(Ddate.getMonth()+1)+"/"+Ddate.getDate()+"/";
		alink[i].href=reqlink3;
		console.log(reqlink3);
	}
	date[0].innerText="Today";
	date[1].innerText="Tomorrow";
	Ddate=new Date(data.consolidated_weather[0].applicable_date);
	daydis.innerText=Ddate.toDateString();
	citylink.href="https://www.metaweather.com/"+cityid+"/"
}

var d=new Date();
console.log(d.getHours());
if (d.getHours()>=19||d.getHours()<=7) { //d.getHours()>=19||d.getHours()<=7
	darkMode();
} 
else {
	lightMode();

}

function darkMode(){
	for (var i = 1; i <=6; i++) {
		var z="c"+i;
		z=document.getElementById(z);
		z.classList.remove("bg-light");
		z.classList.add("text-white");
		z.classList.add("bg-dark");		
	}
	field.classList.remove("lightback");
	jumbo.classList.remove("jumbolight");
	field.classList.add("darkback");
	jumbo.classList.add("jumbodark");
	icon1.classList.remove("fas");
	icon2.classList.remove("fal");
	icon1.classList.add("fal");
	icon2.classList.add("fas");

}

function lightMode(){
	for (var i = 1; i <=6; i++) {
		var z="c"+i;
		z=document.getElementById(z);
		z.classList.add("bg-light");
		z.classList.remove("text-white");
		z.classList.remove("bg-dark");		
	}
	field.classList.remove("darkback");
	jumbo.classList.remove("jumbodark");
	field.classList.add("lightback");
	jumbo.classList.add("jumbolight");
	icon1.classList.remove("fal");
	icon2.classList.remove("fas");
	icon1.classList.add("fas");
	icon2.classList.add("fal");
}
