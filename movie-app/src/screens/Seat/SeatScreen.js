import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import styles from "./styles";

const SEATS = [
  "A1", "A2", "A3", "A4", "A5", "A6",
  "B1", "B2", "B3", "B4", "B5", "B6",
  "C1", "C2", "C3", "C4", "C5", "C6",
  "D1", "D2", "D3", "D4", "D5", "D6",
  "E1", "E2", "E3", "E4", "E5", "E6",
  "F1", "F2", "F3", "F4", "F5", "F6",
];

export default function SeatScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, time, date, screen, movieId, userInfo } = route.params || {};
  const userId = userInfo?.id;
  const userName = userInfo?.name;

  const [seatData, setSeatData] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [personnel, setPersonnel] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 예매 정보 조회
  useEffect(() => {
    fetch("http://192.168.0.227:3000/seatlist")
      .then((res) => res.json())
      .then((data) => setSeatData(data))
      .catch((err) => {
        console.log("seatlist 조회 실패:", err);
      });
  }, []);

  // 이미 예약된 좌석 필터링
  useEffect(() => {
    if (!seatData.length) return;

    const seatNums = seatData
      .filter(
        (item) =>
          item.movie_name === title &&
          String(item.screen_num) === String(screen) &&
          item.date.split("T")[0] === String(date).split("T")[0] &&
          item.time === time
      )
      .flatMap((item) =>
        item.seat_num.includes(",")
          ? item.seat_num.split(",")
          : [item.seat_num]
      );

    setReservedSeats(seatNums);
  }, [seatData, title, time, date, screen]);

  const toggleSeat = (seat) => {
    if (reservedSeats.includes(seat)) {
      Alert.alert("알림", "이미 예매된 좌석입니다.");
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      return;
    }

    if (personnel === 0) {
      Alert.alert("알림", "먼저 인원수를 선택해주세요.");
      return;
    }

    if (selectedSeats.length >= personnel) {
      Alert.alert("알림", "선택한 인원수보다 선택한 좌석이 많습니다.");
      return;
    }

    setSelectedSeats([...selectedSeats, seat]);
  };

  const changePersonnel = (delta) => {
    setSelectedSeats([]); // 인원수 변경 시 좌석 초기화
    setPersonnel((prev) => {
      const next = prev + delta;
      if (next < 0) return 0;
      if (next > 6) return 6; // 6x6 기준 최대 6명 정도 제한
      return next;
    });
  };

  const submit = () => {
    if (!selectedSeats.length) {
      Alert.alert("알림", "좌석을 선택해주세요.");
      return;
    }

    Alert.alert("예매 확인", "결제 페이지로 이동하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: () => {
          navigation.navigate("Payment", {
            title,
            time,
            date,
            screen,
            movieId,
            seats: selectedSeats.join(","),
            userInfo: {
              id: userId,
              name: userName,
            },
          });
        },
      },
    ]);
  };

  const renderSeatGrid = () => {
    return (
      <View style={styles.seatGrid}>
        {SEATS.map((seat) => {
          const isReserved = reservedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          let seatStyle = styles.seat;
          if (isReserved) seatStyle = [seatStyle, styles.seatReserved];
          else if (isSelected) seatStyle = [seatStyle, styles.seatSelected];

          return (
            <TouchableOpacity
              key={seat}
              style={seatStyle}
              onPress={() => toggleSeat(seat)}
              disabled={isReserved}
            >
              <Text style={styles.seatText}>{seat}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.inner}>
        {/* 영화 정보 */}
        <View style={styles.infoBox}>
          <Text style={styles.movieTitle}>{title}</Text>
          <Text style={styles.infoText}>날짜 : {String(date)}</Text>
          <Text style={styles.infoText}>시간 : {time}</Text>
          <Text style={styles.infoText}>상영관 : {screen}관</Text>
        </View>

        {/* 스크린 표시 */}
        <View style={styles.screenBar}>
          <Text style={styles.screenText}>SCREEN</Text>
        </View>

        {/* 좌석 그리드 */}
        {renderSeatGrid()}

        {/* 인원 및 선택 좌석 */}
        <View style={styles.bottomBox}>
          <Text style={styles.bottomLabel}>인원수</Text>
          <View style={styles.personRow}>
            <TouchableOpacity
              style={styles.countBtn}
              onPress={() => changePersonnel(-1)}
            >
              <Text style={styles.countBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.personCount}>{personnel}</Text>

            <TouchableOpacity
              style={styles.countBtn}
              onPress={() => changePersonnel(1)}
            >
              <Text style={styles.countBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.selectedText}>
            선택 좌석:{" "}
            {selectedSeats.length ? selectedSeats.join(", ") : "없음"}
          </Text>

          <TouchableOpacity style={styles.reserveBtn} onPress={submit}>
            <Text style={styles.reserveBtnText}>예매하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
