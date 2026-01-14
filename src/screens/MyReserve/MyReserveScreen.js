import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles";

export default function MyReserveScreen() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/reservations?id=1")
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.log("예매정보 실패:", err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>예매 내역</Text>

      {reservations.map((r, i) => (
        <View key={i} style={styles.card}>
          <Image
            source={{ uri: `http://192.168.0.227:3000${r.poster}` }}
            style={styles.poster}
          />

          <View style={styles.info}>
            <Text style={styles.movieTitle}>{r.movie_name}</Text>
            <Text style={styles.text}>날짜: {r.date}</Text>
            <Text style={styles.text}>시간: {r.time}</Text>
            <Text style={styles.text}>좌석: {r.seat_num}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
