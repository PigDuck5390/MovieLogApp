import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import styles from "./styles";

export default function MyReserveScreen() {
  const route = useRoute();
  const userInfo = route.params?.userInfo;

  const [seatData, setSeatData] = useState([]);

  // 로그인 방어
  if (!userInfo?.id) {
    return (
      <View style={styles.container}>
        <Header userInfo={null} />
        <Text style={{ padding: 20 }}>로그인이 필요합니다.</Text>
      </View>
    );
  }

  /** 예매내역 조회 */
  useEffect(() => {
    fetch(`http://192.168.0.227:3000/seatlist/${userInfo.id}`)
      .then((res) => res.json())
      .then(setSeatData)
      .catch(() => {});
  }, [userInfo.id]);

  return (
    <View style={styles.container}>
      <Header userInfo={userInfo} />

      <ScrollView>
        <Text style={styles.title}>나의 예매내역</Text>

        {seatData.length === 0 ? (
          <Text style={{ padding: 16 }}>
            예매 내역이 없습니다.
          </Text>
        ) : (
          seatData.map((item) => (
            <View
              key={item.seat_id}
              style={styles.card}
            >
              <Text style={styles.movieName}>
                {item.movie_name}
              </Text>

              <Text style={styles.infoText}>
                날짜: {item.date.slice(0, 10)}
              </Text>
              <Text style={styles.infoText}>
                시간: {item.time}
              </Text>
              <Text style={styles.infoText}>
                좌석: {item.seat_num}
              </Text>
              <Text style={styles.infoText}>
                상영관: {item.screen_name}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
