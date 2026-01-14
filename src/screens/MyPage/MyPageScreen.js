import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function MyPageScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/userinfo?id=1")
      .then(res => res.json())
      .then(data => setUser(data[0]))
      .catch(err => console.log("유저 정보 실패:", err));
  }, []);

  if (!user) return <View><Text>로딩중...</Text></View>;

  return (
    <ScrollView style={styles.container}>

      {/* 프로필 */}
      <View style={styles.profileBox}>
        <Image
          source={require("../../assets/profile/너구리.jpg")}
          style={styles.profileImg}
        />
        <View>
          <Text style={styles.userName}>{user.name}님</Text>
          <Text style={styles.userEmail}>{user.id}</Text>
        </View>
      </View>

      {/* 버튼 목록 */}
      <View style={styles.menuGrid}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate("MyReserve")}
        >
          <Text style={styles.menuLabel}>예매내역</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate("MyInfo")}
        >
          <Text style={styles.menuLabel}>내 정보 수정</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 옵션 */}
      <View style={styles.bottomBox}>
        <TouchableOpacity onPress={() => navigation.navigate("Service")}>
          <Text style={styles.bottomItem}>고객센터</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomItem}>공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomItem}>로그아웃</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
