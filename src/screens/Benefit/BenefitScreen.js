import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";

export default function BenefitScreen() {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/benefits")
      .then((res) => res.json())
      .then((data) => setBenefits(firestoreDocumentsToArray(data)))
      .catch((err) => console.log("혜택 정보 조회 실패:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {benefits.map((item) => (
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
