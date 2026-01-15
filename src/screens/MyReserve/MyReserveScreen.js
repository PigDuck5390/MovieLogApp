import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";

export default function MyReserveScreen() {
  const [seatData, setSeatData] = useState([]);
  const route = useRoute()
  const userInfo = route.params?.userInfo;

  useEffect(() => {
          fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/seats")
              .then(response => response.json())
              .then(data => {
                const arr = firestoreDocumentsToArray(data)
                const filtered = arr.filter(item=>item.user_id == userInfo.id)
                setSeatData(filtered)
                })
      }, []);


  return (
    <View style={styles.container}>
      {/* ✅ Header에 userInfo 반드시 전달 */}
      <Header userInfo={userInfo} />

    <ScrollView style={styles.container}>
      <Text style={styles.title}>예매 내역</Text>

      {seatData.map(r => (
        <View key={r.seat_id} style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.movieTitle}>{r.movie_name}</Text>
            <Text style={styles.text}>날짜: {r.date}</Text>
            <Text style={styles.text}>시간: {r.time}</Text>
            <Text style={styles.text}>좌석: {r.seat_num}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
    </View>
  );
}
