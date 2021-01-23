/* jshint esversion: 6 */

/* 위도 경도 받아오기 */
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	    var lat=position.coords.latitude; //위도
	    var lng=position.coords.longitude; //경도
	    var key="3946d7dd812c685a4999bba0495e6500"; //API KEY

	    /* openweathermap api */
	    var apiURI="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+key+"&units=metric";
	    console.log(apiURI);

	    /* getJSON */
	    const getJSON = function(url, callback) {
	    	const xhr=new XMLHttpRequest();
	    	xhr.open('GET', url, true);
	    	xhr.responseType='json';
	    	xhr.onload=function() {
	    		const status=xhr.status;
	    		if(status === 200) {
	    			callback(null, xhr.response);
	    		} else {
	    			callback(status, xhr.response);
	    		}
	    	};
	    	xhr.send();
	    };

	    /* getJSON 함수 호출 */
	    getJSON(apiURI,
	    function(err, data) {
	    	if(err !== null) {
	    		alert('오류'); //현재 날씨 사용할 수 없음
	    	} else {
	    		loadWeather(data); //날씨 받아오기
	    	}
	    });

	    /* 날씨 받아오기(openweathermap) */
	    function loadWeather(data) {
	    	/* HTML DOM querySelector */
	    	let currentTime=document.querySelector('#current-time');
	    	let currentTemp=document.querySelector('#current-temp');
	    	let feelsLike=document.querySelector('#feels-like');
	    	let minTemp=document.querySelector('#min-temp');
	    	let maxTemp=document.querySelector('#max-temp');
	    	let sky=document.querySelector('#sky');
	    	let humidity=document.querySelector('#humidity');
	    	let status=document.querySelector('#status');

	    	let weatherIcon=data.weather[0].icon;
	    	//let rainy=data.rain['1h']; //강수량

	    	/* 날씨 코드(data.weather[0].id) 번역 함수 */
	    	function wDescEngToKor(w_id) {
	    		/* 날씨 코드 목록 */
	    		var w_id_arr = [200,201,202,210,211,212,221,230,231,232,
	    		                300,301,302,310,311,312,313,314,321,500,
	    		                501,502,503,504,511,520,521,522,531,600,
	    		                601,602,611,612,615,616,620,621,622,701,
	    		                711,721,731,741,751,761,762,771,781,800,
	    		                801,802,803,804,900,901,902,903,904,905,
	    		                906,951,952,953,954,955,956,957,958,959,
	    		                960,961,962];
	    		/* 한글로 번역 */
	    		var w_kor_arr = [
	    		    "가벼운 뇌우",	/* 200 thunderstorm with light rain */
	    		    "뇌우", 		/* 201 thunderstorm with rain */
	    		    "강한 뇌우", 	/* 202 thunderstorm with heavy rain */

	    		    "천둥번개", 	/* 210 light thunderstorm */
	    		    "천둥번개",	/* 211 thunderstorm */
	    		    "강한 천둥번개",	/* 212 heavy thunderstorm */

	    		    "산발적 뇌우",	/* 221 ragged thunderstorm */

	    		    "가벼운 뇌우", 	/* 230 thunderstorm with light drizzle */
	    		    "가벼운 뇌우",	/* 231 thunderstorm with drizzle */
	    		    "가벼운 뇌우",	/* 232 thunderstorm with heavy drizzle */

	    		    "안개비",		/* 300 light intensity drizzle */
	    		    "안개비",		/* 301 drizzle */
	    		    "안개비",		/* 302 heavy intensity drizzle */

	    		    "약한 비",		/* 310 light intensity drizzle rain */
	    		    "약한 비",		/* 311 drizzle rain */
	    		    "약한 비",		/* 312 heavy intensity drizzle rain */

	    		    "소나기",		/* 313 shower rain and drizzle */
	    		    "강한 소나기",	/* 314 heavy shower rain and drizzle */
	    		    "약한 소나기",	/* 321 shower drizzle */

	    		    "약한 비",		/* 500 light rain */
	    		    "비",		/* 501 moderate rain */
	    		    "강한 비",		/* 502 heavy intensity rain */
	    		    "폭우",		/* 503 very heavy rain */
	    		    "폭우",		/* 504 extreme rain */

	    		    "우박", 		/* 511 freezing rain */

	    		    "약한 소나기",	/* 520 light intensity shower rain */
	    		    "소나기",		/* 521 shower rain */
	    		    "강한 소나기",	/* 522 heavy intensity shower rain */

	    		    "산발적 소나기",	/* 531 ragged shower rain */

	    		    "눈",		/* 600 light snow */
	    		    "눈",		/* 601 snow */
	    		    "폭설",		/* 602 heavy snow */

	    		    "진눈깨비",	/* 611 sleet */
	    		    "진눈깨비",	/* 612 shower sleet */
	    		    "비 또는 눈",	/* 615 light rain and snow */
	    		    "비 또는 눈",	/* 616 rain and snow */

	    		    "눈",		/* 620 light shower snow */
	    		    "눈",		/* 621 shower snow */
	    		    "폭설",		/* 622 heavy shower snow */

	    		    "옅은 안개",	/* 701 mist */
	    		    "연기",		/* 711 smoke */
	    		    "연무",		/* 721 haze */
	    		    "황사",		/* 731 sand, dust whirls */
	    		    "안개",		/* 741 fog */

	    		    "모래",		/* 751 sand */
	    		    "먼지",		/* 761 dust */
	    		    "화산재",		/* 762 volcanic ash */

	    		    "돌풍",		/* 771 squalls */
	    		    "토네이도",	/* 781 tornado */

	    		    "맑음",		/* 800 clear sky */

	    		    "구름 조금",	/* 801 few clouds */
	    		    "구름",		/* 802 scattered clouds */
	    		    "구름",		/* 803 broken clouds */
	    		    "구름 많음",	/* 804 overcast clouds */

	    		    "토네이도",	/* 900 tornado */

	    		    "태풍",		/* 901 tropical storm */

	    		    "허리케인",	/* 902 hurricane */

	    		    /* 아마도 여기부터는 바다 날씨 */
	    		    "한랭",		/* 903 cold */
	    		    "고온",		/* 904 hot */
	    		    "바람",		/* 905 windy */
	    		    "우박",		/* 906 hail */

	    		    "고요한",		/* 951 calm */
	    		    "약한 바람",	/* 952 light breeze */
	    		    "부드러운 바람",	/* 953 gentle breeze */
	    		    "바람",		/* 954 moderate breeze */
	    		    "선선한 바람",	/* 955 fresh breeze */
	    		    "강풍",		/* 956 strong breeze */
	    		    "돌풍",		/* 957 high win */
	    		    "돌풍",		/* 958 gale */
	    		    "폭풍",		/* 959 severe gale */
	    		    "폭풍",		/* 960 storm */
	    		    "강한 폭풍",	/* 961 violent storm */
	    		    "허리케인",	/* 962 hurricane */
	    		];

	    		for(var i=0; i<w_id_arr.length; i++) {
	    			if(w_id_arr[i]==w_id) {
	    				return w_kor_arr[i];
	    				break;
	    			}
	    		}
	    		/* 목록에 없을 시 */
	    		return "none";
	    	}

	    	/* 날짜 표기 */
	    	let date=new Date();
	    	let dayList = ['일', '월', '화', '수', '목', '금', '토']; //요일
	    	let month=date.getMonth()+1; //월
	    	let day=date.getDate(); //일
	    	let hours=fillZero(date.getHours()); //시(10 미만은 앞에 0)
	    	let minutes=fillZero(date.getMinutes()); //분(10 미만은 앞에 0)
	    	let dd=dayList[date.getDay()];

	    	/* 0 붙이기 함수 */
	    	function fillZero(num) {
	    		return (num < 10 ? '0'+num : ''+num);
	    	}

	    	/* append 통하여 DOM에 받아온 JSON 값 출력 */
	    	//location.append(data.name);
	    	currentTemp.append(`현재 기온 : ${data.main.temp}℃`);
	    	feelsLike.append(`체감 온도 : ${data.main.feels_like}℃`);
	    	humidity.append(`습도 : ${data.main.humidity}%`);
	    	status.append(wDescEngToKor(data.weather[0].id));
	    	currentTime.append(`${month}월 ${day}일 ${hours}:${minutes}`);

	    	/* 비가 오면 강수량 표기, 오지 않으면 div 삭제 */
	    	/*if(rainy>0) {
	    		rainFall.append("강수량 : "+rainy+"mm");
	    	} else {
	    		$(rainFall).remove();
	    	}*/
	    	}

		});
	}

/*
 * 날씨 별로 넣어줄 로고와 인사말은
 * 같이 골라봅시다 ^_^
 */
