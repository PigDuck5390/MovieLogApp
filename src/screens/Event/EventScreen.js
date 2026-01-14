import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";

export default function EventScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/eventinfo")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log("이벤트 조회 실패:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {events.map((item) => (
          <Image
            key={item.defid}
            source={{ uri: `http://192.168.0.227:3000${item.poster_path}` }}
            style={styles.poster}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
    </View>
  );
}
