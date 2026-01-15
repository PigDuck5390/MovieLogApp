import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";

export default function EventScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/events")
      .then((res) => res.json())
      .then((data) => setEvents(firestoreDocumentsToArray(data)))
      .catch((err) => console.log("이벤트 조회 실패:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {events.map((item) => (
          <Image
            key={item._docId}
            source={{ uri: item.poster_path }}
            style={styles.poster}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
    </View>
  );
}
