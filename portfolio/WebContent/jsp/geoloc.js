/* 위도 경도 구하기 */
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    let lat=position.coords.latitude; //위도
    let lng=position.coords.longitude; //경도

    let geocoder=new kakao.maps.services.Geocoder(); //카카오맵 API Geocoder

    let location=document.querySelector('#location');

    /* 접속 지역 정보 받아오기 */
    let coord=new kakao.maps.LatLng(lat, lng);
    let callback=function(result, status) {
        if(status === kakao.maps.services.Status.OK) {
            console.log('지역 명칭 : '+result[0].address_name);
            console.log('행정구역 코드 : '+result[0].code);
            console.log('주소1 : '+result[0].region_1depth_name); //도,광역시
            console.log('주소2 : '+result[0].region_2depth_name); //시군구
            console.log('주소3 : '+result[0].region_3depth_name); //읍면동
            location.append(result[0].region_1depth_name+" "+result[0].region_2depth_name);
        }
    };

    geocoder.coord2RegionCode(lng, lat, callback);

    });
} else {
    alert("현재 작동하지 않습니다."); //현재 위치 받을 수 없는 상태
}