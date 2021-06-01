import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

//import gpsImage from "../images/gps.png";
//import pumpImage from "../images/airpump(3).png";
import new_pumpImage from "../images/new_pump.png";
import new_pumpImage2 from '../images/new_pump(2).png'
import parkImage from "../images/park.png";
import new_parkImage from '../images/new_park.png'
import rentalImage from "../images/rental.png";
import new_rentalImage from "../images/new_rental.png";
import repairImage from "../images/repair(2).png";
import new_repairImage from "../images/new_repair.png";
import placeImage from "../images/place.png"
//import AddLocationIcon from "@material-ui/icons/AddLocation";
import {
  displayInfo,
  updateLevel,
  selectMarker,
  setLatlng,
  displayNewFacility,
  displayNewReport,
  setDetailAddr
} from "../redux/index";

//import pumpData from "../data/airpump.json"; //공기주입기 정보 json배열
//import parkData from "../data/parking.json"; //주차장 정보 json배열
//import rentalData from "../data/rental.json"; //대여소 정보 json배열
//import repairData from "../data/repair.json"; //수리센터 정보 json배열
import { database } from "../../src/firebase/firebase";
//BACKEND 접속 용
import { ip } from "../redux/ip";
import axios from "axios";
//import { Autocomplete } from "@material-ui/lab";

const { kakao } = window;

function MapContainer(props) {
  const [kakaoMap, setKakaoMap] = useState(null); //기본 지도

  const [pumpData, setAirpumpData] = useState([]);  //공기주입기 시설 정보
  const [parkData, setParkData] = useState([]);     //자전거 주차장 시설 정보
  const [repairData, setRepairData] = useState([]); //수리센터 시설 정보
  const [rentalData, setRentalData] = useState([]); //대여소 시설 정보
  //store의 state값들
  const {
    bicycle,
    airpump,
    park,
    repair,
    rental,

    place,
    level,
    radius,
    newFacility,
    limitRadius,
    reportMode
  } = props;

  const container = useRef();

  const [searchMarker, setCenter] = useState(null); //현재위치, 검색한 위치
  const [searchCircle, setSearchCircle] = useState(null); //현재위치, 검색한 위치 강조하는 원

  const [mapCenter, setMapCenter] = useState(   //지도 중심좌표
    new kakao.maps.LatLng(38.0, 128.0)
  );

  const [circle, setCircle] = useState(     //일정반경 내 시설만 표시 때 일정반경 표시해주는 원
    new kakao.maps.Circle({
      center: mapCenter,
      radius: 200,
      strokeWeight: 1, // 선의 두께
      strokeColor: "#75B8FA", // 선의 색깔
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일 
      fillColor: "#aaaaaa", // 채우기 색깔
      fillOpacity: 0 // 채우기 불투명도
    })
  );

  const [pumpMarkers, setPump] = useState([]); //공기주입기 마커
  const [parkMarkers, setPark] = useState([]); //주차장 마커
  const [repairMarkers, setRepair] = useState([]); //수리센터 마커
  const [rentalMarkers, setRental] = useState([]); //대여소 마커

  var [events, setEvent] = useState([]); //신고버튼 이벤트

  //초기 기본지도 생성
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=8c913351b41f937d64c4ce21a2b8b058&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(
          35.876379446167306,
          128.59602700717645
        );
        const options = {
          center,
          level: 4
        };
        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);

        kakao.maps.event.addListener(map, "zoom_changed", function () {
          props.updateLevel(map.getLevel()); //지도 축적이 변할때마다 store의 level값 갱신
        });
        //dragend, idle
        kakao.maps.event.addListener(map, "dragend", function () {
          var latlng = map.getCenter();
          setMapCenter(latlng);
        });

      });
    };
    container.current.style.height = "90vh"; //지도 사이즈
  }, [container]);


  //데이터 가져오기============================================
  useEffect(() => {
    props.displayNewFacility(true)
  }, [kakaoMap])

  useEffect(() => {
    //백엔드 서버로부터 data 가져오기
    // https://bicyclemap.herokuapp.com/data
    var airpumpData1 = [];
    var parkData1 = [];
    var repairData1 = [];
    var rentalData1 = [];

    if(pumpMarkers!==null){
      pumpMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
      parkMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
      repairMarkers.forEach(function (marker) {
        marker.setMap(null)
      });
      rentalMarkers.forEach(function (marker) {
        marker.setMap(null)
      });
    }

    axios
      .get(ip + "/data", { params: { message: "request facility data" } })
      .then((res) => {
        airpumpData1 = res.data.airpump
        parkData1 = res.data.park
        repairData1 = res.data.repair
        rentalData1 = res.data.rental


        //DB에서 신규신고된 시설정보 가져오기
        database
          .collection("NewFacility")
          .get()
          .then(function (docs) {
            console.log("load new facility data")
            docs.forEach(function (doc) {

              if (newFacility) {    //신규신고된 시설도 표시 on일때
                switch (doc.data().시설종류) {
                  case '공기주입기':
                    let air = doc.data()
                    air.번호 = airpumpData1.length + 1
                    air.isNew = true
                    airpumpData1.push(air)
                    break;
                  case '보관소':
                    let park = doc.data()
                    park.번호 = parkData1.length + 1
                    park.isNew = true
                    parkData1.push(park)
                    break;
                  case '수리센터':
                    let repair = doc.data()
                    repair.번호 = repairData1.length + 1
                    repair.isNew = true
                    repairData1.push(repair)
                    break;
                  case '대여소':
                    let rental = doc.data()
                    rental.번호 = rentalData1.length + 1
                    rental.isNew = true
                    rentalData1.push(rental)
                    break;
                  default:
                }
              }
            })

            setAirpumpData(airpumpData1);
            setParkData(parkData1);
            setRepairData(repairData1);
            setRentalData(rentalData1);

          })
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

  }, [newFacility]);
  //===================================================

  //검색 후 해당 위치로 지도 이동
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    if (searchMarker !== null) {
      searchMarker.setMap(null); //기존 마커 제거
      searchCircle.setMap(null)
    }

    const new_center = new kakao.maps.LatLng(place.lat, place.lng);
    kakaoMap.setCenter(new_center);
    //kakaoMap.setLevel(4);
    props.updateLevel(4)

    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(15, 15);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(placeImage, imageSize);

    setCenter(
      new kakao.maps.Marker({
        map: kakaoMap, // 마커를 표시할 지도
        position: new_center,
        title: place.address,
        image: markerImage // 마커 이미지
      })
    );
    setSearchCircle(
      new kakao.maps.Circle({
        map: kakaoMap,
        center: new_center,
        radius: 100,
        strokeWeight: 1,
        strokeColor: '#75B8FA',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#CFE7FF',
        fillOpacity: 0.3
      })
    )
    //setMapCenter(new_center)
  }, [place]);

  useEffect(() => {
    if (searchMarker !== null)
      setMapCenter(searchMarker.getPosition())
  }, [searchMarker])

  //화면에 시설이 표시되는 반경길이 구하기====================
  const getMapRadius = function () {
    if (kakaoMap === null) {
      return;
    }
    //지도 영역정보
    var bounds = kakaoMap.getBounds();
    //남서쪽
    var swLatlng = bounds.getSouthWest();
    //북동쪽
    var neLatLng = bounds.getNorthEast();

    let distanceLine = new kakao.maps.Polyline({
      path: [swLatlng, neLatLng]
    });

    //지도 좌하단 우상단 끝 좌표 사이 거리
    let diameter = distanceLine.getLength() / 2.5;

    if (diameter >= limitRadius) {
      if (!radius) {
        return diameter
      }
      return limitRadius;
    } else {
      return diameter;
    }
  };

  //지도 확대/축소 이벤트=============================
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    kakaoMap.setLevel(level);

    if (searchCircle !== null) {
      searchCircle.setMap(null)
    }

    var latlng = kakaoMap.getCenter();
    setMapCenter(latlng);

    var distance = getMapRadius();
    //반경 표시용 원
    if (distance >= limitRadius) {
      if (!radius) {
        circle.setMap(null);
      } else if (airpump || park || repair || rental) {
        circle.setMap(kakaoMap);
      } else {
        circle.setMap(null);
      }

      circle.setPosition(kakaoMap.getCenter());
      circle.setRadius(distance);
    } else {
      circle.setMap(null);
    }
  }, [level]);

  //자전거 도로 on/off
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    var mapTypes = {
      bicycle: kakao.maps.MapTypeId.BICYCLE,
      useDistrict: kakao.maps.MapTypeId.USE_DISTRICT
    };

    if (props.bicycle) {
      //자전거도로 on
      kakaoMap.addOverlayMapTypeId(mapTypes.bicycle);
    } else {
      //off
      kakaoMap.removeOverlayMapTypeId(mapTypes.bicycle);
    }
  }, [bicycle]);

  //신규시설 신고~~
  var reportHandler = function (mouseEvent) {
    var data = mouseEvent.latLng;
    var latlng = { 위도: data.getLat(), 경도: data.getLng() };

    props.setLatlng(latlng);
    //좌표를 통해 주소 변환하기
    var geocoder = new kakao.maps.services.Geocoder();

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(data.getLng(), data.getLat(), callback);
    }
    props.setLatlng(latlng);
    searchAddrFromCoords(mouseEvent.latLng, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            var detailAddr = result[i].address_name;
            props.setDetailAddr(detailAddr);
            break;
          }
        }
      }
    });
    props.displayNewReport(true);
  };

  //신규시설 신고모드 on/off
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    //addListener 후에 removeListener시 target, type, 함수가 완전히 동일해야함
    if (reportMode) {
      kakao.maps.event.addListener(kakaoMap, "click", reportHandler);
      setEvent([{ target: kakaoMap, type: "click", handler: reportHandler }]);
    } else {
      events.forEach(function (e) {
        //이렇게 배열에 event를 저장해서 완전 대조 식으로 하지 않으면 event삭제가 안됨
        kakao.maps.event.removeListener(e.target, e.type, e.handler);
      });
    }
  }, [reportMode]);

  //시설 정보창 표시
  const openInfo = function (event) {
    props.displayInfo(true);
  };
  const closeInfo = function (event) {
    props.displayInfo(false);
  };

  //지도 중심좌표가 변할때 마다 보이는 시설마커 범위 변경==================================
  useEffect(() => {
    if (pumpData === null || parkData === null || repairData === null || rentalData === null) {
      return;
    }


    if (!radius && pumpMarkers === null) {
      //do nothing
    } else {
      //===================
      pumpMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
      parkMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
      repairMarkers.forEach(function (marker) {
        marker.setMap(null)
      });
      rentalMarkers.forEach(function (marker) {
        marker.setMap(null)
      });

      var distance = getMapRadius();

      //자전거 공기주입기
      var new_pumpMarker = [];

      var pumpMarker = new kakao.maps.MarkerImage(
        new_pumpImage,
        new kakao.maps.Size(23, 23),
        { offset: new kakao.maps.Point(10, 25) }
      );
      var pumpMarker2 = new kakao.maps.MarkerImage(
        new_pumpImage2,
        new kakao.maps.Size(23, 23),
        { offset: new kakao.maps.Point(10, 25) }
      );
      pumpData.forEach(function (index) {
        var latlng = new kakao.maps.LatLng(index.위도, index.경도);
        var line = new kakao.maps.Polyline({
          path: [mapCenter, latlng],
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "#db4040", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid" // 선의 스타일입니다
        });

        if (line.getLength() <= distance) {
          if (index.isNew) {

            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: pumpMarker2
            });

          } else {
            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: pumpMarker
            });
          }
          new_pumpMarker.push(marker);
        }
      });
      setPump(new_pumpMarker);

      //자전거 거치대
      var new_parkMarker = [];

      var parkMarker = new kakao.maps.MarkerImage(
        parkImage,
        new kakao.maps.Size(20, 20),

      );
      var parkMarker2 = new kakao.maps.MarkerImage(
        new_parkImage,
        new kakao.maps.Size(20, 20),

      );
      parkData.forEach(function (index) {
        var latlng = new kakao.maps.LatLng(index.위도, index.경도);
        var line = new kakao.maps.Polyline({
          path: [mapCenter, latlng],
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "#db4040", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid" // 선의 스타일입니다
        });

        if (line.getLength() <= distance) {
          if (index.isNew) {

            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: parkMarker2
            });

          } else {
            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: parkMarker
            });
          }
          new_parkMarker.push(marker);
        }
      });
      setPark(new_parkMarker);

      //자전거 수리센터
      var new_repairMarker = [];

      var repairMarker = new kakao.maps.MarkerImage(
        repairImage,
        new kakao.maps.Size(50, 50),
        { offset: new kakao.maps.Point(25, 35) }
      );
      var repairMarker2 = new kakao.maps.MarkerImage(
        new_repairImage,
        new kakao.maps.Size(50, 50),
        { offset: new kakao.maps.Point(25, 35) }
      );
      repairData.forEach(function (index) {
        var latlng = new kakao.maps.LatLng(index.위도, index.경도);
        var line = new kakao.maps.Polyline({
          path: [mapCenter, latlng],
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "#db4040", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid" // 선의 스타일입니다
        });

        if (line.getLength() <= distance) {
          if (index.isNew) {

            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: repairMarker2
            });

          } else {
            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: repairMarker
            });
          }
          new_repairMarker.push(marker);
        }
      });
      setRepair(new_repairMarker);

      //자전거 대여소
      var new_rentalMarker = [];

      var rentalMarker = new kakao.maps.MarkerImage(
        rentalImage,
        new kakao.maps.Size(50, 50),
        { offset: new kakao.maps.Point(25, 35) }
      );
      var rentalMarker2 = new kakao.maps.MarkerImage(
        new_rentalImage,
        new kakao.maps.Size(50, 50),
        { offset: new kakao.maps.Point(25, 35) }
      );
      rentalData.forEach(function (index) {
        var latlng = new kakao.maps.LatLng(index.위도, index.경도);
        var line = new kakao.maps.Polyline({
          path: [mapCenter, latlng],
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "#db4040", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid" // 선의 스타일입니다
        });

        if (line.getLength() <= distance) {
          if (index.isNew) {

            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: rentalMarker2
            });

          } else {
            var marker = new kakao.maps.Marker({
              position: latlng,
              title: index.위치,
              zIndex: Number(index.번호),
              image: rentalMarker
            });
          }
          new_rentalMarker.push(marker);
        }
      });
      setRental(new_rentalMarker);
      //=======================
    }

    if (kakaoMap === null) {
      return;
    }
    var distance = getMapRadius();
    //반경 표시용 원
    if (distance >= limitRadius) {
      if (!radius) {
        circle.setMap(null);
      } else if (airpump || park || repair || rental) {
        circle.setMap(kakaoMap);
      } else {
        circle.setMap(null);
      }

      circle.setPosition(kakaoMap.getCenter());
      circle.setRadius(distance);
    } else {
      circle.setMap(null);
    }

  }, [mapCenter]);
  //==============================================================================

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    var latlng = kakaoMap.getCenter();
    setMapCenter(latlng);
  }, [airpump, park, repair, rental])

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    sleep(1000).then(() => setMapCenter(kakaoMap.getCenter()));
  }, [newFacility])

  //공기주입기 마커 표시 on/off
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    pumpMarkers.forEach(function (marker) {
      marker.setMap(null);
    });

    if (airpump) {
      pumpMarkers.forEach(function (marker) {
        kakao.maps.event.addListener(marker, "click", function () {
          var index = marker.getZIndex();
          var select;
          pumpData.forEach(function (data) {
            if (index === Number(data.번호)) {
              select = data;
              select.type = "airpump";
              props.selectMarker(select);
            }
          });
          //console.log(marker.getZIndex());
          openInfo();
        });
        marker.setMap(kakaoMap);

      });

      kakao.maps.event.addListener(kakaoMap, "click", closeInfo);
    } else {
      pumpMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
    }
  }, [airpump, pumpMarkers]);

  //주차장 마커 표시 on/off
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    parkMarkers.forEach(function (marker) {
      marker.setMap(null);
    });

    if (park) {
      parkMarkers.forEach(function (marker) {
        kakao.maps.event.addListener(marker, "click", function () {
          var index = marker.getZIndex(); //zindex에 저장한 번호 값
          var select;
          parkData.forEach(function (data) {
            if (index === Number(data.번호)) {
              select = data;
              select.type = "park";
              props.selectMarker(select); //선택한 마커
            }
          });
          //console.log(marker.getZIndex());
          openInfo();
        });
        marker.setMap(kakaoMap);
      });

      kakao.maps.event.addListener(kakaoMap, "click", closeInfo);
    } else {
      //주차장 마커 지우기
      parkMarkers.forEach(function (marker) {
        marker.setMap(null);
      });

    }
  }, [park, parkMarkers]);

  //수리센터 마커 표시  on/off
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    repairMarkers.forEach(function (marker) {
      marker.setMap(null)
    })

    if (repair) {
      //수리센터 표시
      repairMarkers.forEach(function (marker) {
        marker.setMap(kakaoMap);

        kakao.maps.event.addListener(marker, "click", function () {
          var index = marker.getZIndex(); //zindex에 저장한 번호 값
          var select = {};

          repairData.forEach(function (data) {
            if (index === Number(data.번호)) {
              select = data;
              select.type = "repair";
              props.selectMarker(select); //선택한 마커
            }
          });
          openInfo();
        });
      });

      kakao.maps.event.addListener(kakaoMap, "click", closeInfo);
    } else {
      //수리센터 마커 지우기
      repairMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
    }
  }, [repair, repairMarkers]);

  //대여소 마커 표시  on/off
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    if (rental) {
      rentalMarkers.forEach(function (marker) {
        marker.setMap(kakaoMap);

        kakao.maps.event.addListener(marker, "click", function () {
          var index = marker.getZIndex();
          var select;

          rentalData.forEach(function (data) {
            if (index === Number(data.번호)) {
              select = data;
              select.type = "rental";
              props.selectMarker(select);
            }
          });
          openInfo();
        });
      });
      kakao.maps.event.addListener(kakaoMap, "click", closeInfo);
    } else {
      rentalMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
    }
  }, [rental, rentalMarkers]);

  //className={reportMode? classes.mouseCursor:classes.none}
  return (

    <div class="map_container" ref={container} >
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    airpump: state.facilities.airpump,
    park: state.facilities.parking,
    repair: state.facilities.repair,
    rental: state.facilities.rental,

    bicycle: state.facilities.bicycle,
    info: state.facilities.info,

    place: state.mapControl.place,
    level: state.mapControl.level,
    radius: state.mapControl.radius,
    newFacility: state.mapControl.newFacility,
    limitRadius: state.mapControl.limitRadius,

    reportMode: state.report.reportMode
  };
};

const mapDispatchToProps = {
  displayInfo: displayInfo,
  updateLevel: updateLevel,
  selectMarker: selectMarker,
  displayNewFacility: displayNewFacility,
  displayNewReport: displayNewReport,
  setLatlng: setLatlng,
  setDetailAddr: setDetailAddr
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
