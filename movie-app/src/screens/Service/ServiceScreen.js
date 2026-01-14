import React from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";

export default function ServiceScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>고객센터</Text>
        <Text style={styles.phone}>010-1234-1234</Text>

        <Text style={styles.desc}>
          문제가 있으시면{"\n"}
          글로벌아카데미 4강의실에서 {"\n"}
          "저"를 찾아주세요.
        </Text>
      </ScrollView>
    </View>
  );
}
