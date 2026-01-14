import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

import Header from "../../components/Header";
import styles from "./styles";

export default function ReservationScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const userInfo = route.params?.userInfo || {};
  const targetMovieId = userInfo.movieId;

  const [movieData, setMovieData] = useState([]);
  const [dateMap, setDateMap] = useState({});
  const [pickerMovieId, setPickerMovieId] = useState(null); // 어떤 영화의 달력을 열었는지

  useEffect(() => {
    fetch("http://192.168.0.227:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => a.screen_number - b.screen_number
        );
        setMovieData(sorted);
      })
      .catch(() => Alert.alert("오류", "영화 정보를 불러올 수 없습니다."));
  }, []);

  const openDatePicker = (movieId) => {
    setPickerMovieId(movieId);
  };

  const closeDatePicker = () => {
    setPickerMovieId(null);
  };

  const handleConfirm = (date) => {
    const formatted = date.toISOString().split("T")[0];
    setDateMap((prev) => ({
      ...prev,
      [pickerMovieId]: formatted,
    }));
    closeDatePicker();
  };

  const moveSeat = (item, start_time) => {
    const selectedDate = dateMap[item.movie_id];

    if (!userInfo.id) return Alert.alert("알림", "로그인 해주세요.");
    if (!selectedDate) return Alert.alert("알림", "날짜를 선택해주세요.");

    navigation.navigate("Seat", {
      title: item.title,
      time: start_time,
      date: selectedDate,
      screen: item.screen_number,
      movieId: item.movie_id,
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollInner}>
        <Text style={styles.screenTitle}>영화 예매</Text>

        {movieData.map((item) => {
          const isTarget = targetMovieId === item.movie_id;

          return (
            <View
              key={item.movie_id}
              style={[styles.card, isTarget && styles.cardHighlighted]}
            >
              <View style={styles.cardLeft}>
                <Image
                  source={{
                    uri: `http://192.168.0.227:3000${item.poster}`,
                  }}
                  style={styles.poster}
                />
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.desc}>
                  {item.short_description}
                </Text>

                {/* 날짜 선택 버튼 */}
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => openDatePicker(item.movie_id)}
                >
                  <Text style={styles.dateButtonText}>
                    {dateMap[item.movie_id] || "날짜 선택"}
                  </Text>
                </TouchableOpacity>

                {/* 시간 버튼 */}
                <View style={styles.timeRow}>
                  {[item.start_time1, item.start_time2, item.start_time3,
                    item.start_time4, item.start_time5, item.start_time6,
                    item.start_time7, item.start_time8, item.start_time9]
                    .filter(Boolean)
                    .map((time) => (
                      <TouchableOpacity
                        key={time}
                        style={styles.timeChip}
                        onPress={() => moveSeat(item, time)}
                      >
                        <Text style={styles.timeText}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 날짜 선택 모달 */}
      <DateTimePickerModal
        isVisible={pickerMovieId !== null}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={closeDatePicker}
      />
    </View>
  );
}
