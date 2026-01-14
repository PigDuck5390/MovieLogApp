import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";

export default function BenefitScreen() {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/benefitinfo")
      .then((res) => res.json())
      .then((data) => setBenefits(data))
      .catch((err) => console.log("혜택 정보 조회 실패:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {benefits.map((item) => (
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
