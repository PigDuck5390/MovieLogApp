// src/components/Header.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./headerStyles";
import { firestoreDocumentsToArray } from "../utils/firestoreRest";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  // 웹의 useLocation().state 동일 기능
  const userInfo = route.params?.userInfo || null;

  const [loggedInName, setLoggedInName] = useState(null);
  const [point, setPoint] = useState(0);

  // 로그인 정보 반영
  useEffect(() => {
    if (userInfo?.name) setLoggedInName(userInfo.name);
  }, []);

  // 포인트 불러오기
  useEffect(() => {
    if (!userInfo?.id) return;

    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/users")
      .then((res) => res.json())
      .then((data) => {
        const arr = firestoreDocumentsToArray(data)
        const filtered = arr.find(item=>item.id == userInfo.id)
        setPoint(filtered.point)})
      .catch((err) => console.log("포인트 가져오기 실패:", err));
  }, []);

  // ===== 네비게이션 기능 =====
  const movePage = (screen, params = {}) => {
    navigation.navigate(screen, {
      ...params,
      userInfo: {
        name: userInfo?.name,
        id: userInfo?.id,
        point: point,
        profile: userInfo?.profile,
      },
    });
  };

  const logout = () => {
    setLoggedInName(null);
    Alert.alert("알림", "로그아웃 되었습니다.");
    navigation.navigate("Main", {
      userInfo: { name: null, id: null },
    });
  };

  const moveVip = () => {
    if (point >= 500) {
      movePage("VipLounge");
    } else {
      Alert.alert("경고", "영화 더 보고 오세요!");
    }
  };

  return (
    <View style={[
    styles.headerContainer,
    {paddingTop: insets.top},]}>
      {/* ===== 상단 라인 (VIP LOUNGE / 고객센터) ===== */}
      <View style={styles.headerTop}>
        <View style={styles.headerTopLeft}>
          <TouchableOpacity onPress={moveVip}>
            <Text style={styles.topText}>VIP LOUNGE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => movePage("Service")}>
            <Text style={styles.topText}>고객센터</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerTopRight}>
          {loggedInName ? (
            <>
              <Text style={styles.welcomeText}>환영합니다. {loggedInName}님</Text>

              <TouchableOpacity onPress={logout}>
                <Text style={styles.topBtn}>로그아웃</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => movePage("MyPage")}
              >
                <Text style={styles.topBtn}>마이페이지</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.topBtn}>로그인</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Join")}>
                <Text style={styles.topBtn}>회원가입</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>


      {/* ===== 메뉴 라인 (영화 / 예매 / 로고 / 이벤트 / 혜택) ===== */}
      <View style={styles.menuRow}>
        <TouchableOpacity onPress={() => movePage("Movies")}>
          <Text style={styles.menuItem}>영화</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => movePage("Reservation")}>
          <Text style={styles.menuItem}>예매</Text>
        </TouchableOpacity>

        {/* ===== 중앙 로고 ===== */}
        <TouchableOpacity
          style={styles.logoBox}
          onPress={() => movePage("Main")}
        >
          <Text style={styles.logoText}>MOVIELOG</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => movePage("Event")}>
          <Text style={styles.menuItem}>이벤트</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => movePage("Benefit")}>
          <Text style={styles.menuItem}>혜택</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
