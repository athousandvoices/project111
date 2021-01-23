<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

		<!-- jQuery -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="jquery.xdomainajax.js"></script>

		<!-- 카카오맵 Library (services) -->
		<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=eb4d899d1911e816fc6dcda16adaa5f2&libraries=services"></script>

		<!-- 접속자 위치 받아오기 -->
		<script type="text/javascript" src="geoloc.js"></script>
		<!-- 날씨 받아오기 -->
		<script type="text/javascript" src="weather.js"></script>
	</head>
	<body>
		<header>
			<!-- 안의 class값만 이용하여도 괜찮음 -->
			<section class="weather-container">
				<div class="weather-data">
					<!-- 위치 -->
					<h1 id="location">

					</h1>
					<!-- 현재 시각 -->
					<div id="current-time">

					</div>
					<!-- 날씨 -->
					<div id="weather-temp">
						<!-- 현재 기온 -->
						<div id="current-temp">

						</div>
						<!-- 체감 온도 -->
						<div id="feels-like">

						</div>
						<!-- 습도 -->
						<div id="humidity">

						</div>
						<!-- 날씨코드(자동번역) -->
						<div id="status">

						</div>
					</div>
				</div>
			</section>
		</header>
	</body>
</html>