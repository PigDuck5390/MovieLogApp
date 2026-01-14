import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import styles from "./styles";

export default function MyPageScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const userInfo = route.params?.userInfo;

  const [profileImg, setProfileImg] = useState(null);
  const [seatData, setSeatData] = useState([]);
  const [point, setPoint] = useState(0);

  if (!userInfo?.id) {
    return (
      <View style={styles.container}>
        <Header userInfo={null} />
        <View style={{ padding: 20 }}>
          <Text>로그인이 필요합니다.</Text>
        </View>
      </View>
    );
  }

  /** 프로필 조회 */
  useEffect(() => {
    fetch(`http://192.168.0.227:3000/userprofile/${userInfo.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.[0]?.profile) {
          setProfileImg(
            `http://192.168.0.227:3000${data[0].profile}`
          );
        }
      })
      .catch(() => {});
  }, [userInfo.id]);

  /** 예매 내역 */
  useEffect(() => {
    fetch(`http://192.168.0.227:3000/seatlist/${userInfo.id}`)
      .then((res) => res.json())
      .then(data=>setSeatData(data))
      .catch(() => {});
  }, [userInfo.id]);

  /** 포인트 */
  useEffect(() => {
    fetch(`http://192.168.0.227:3000/point/${userInfo.id}`)
      .then((res) => res.json())
      .then(setPoint)
      .catch(() => {});
  }, [userInfo.id]);

  /** 등급 */
  const movieRank = () => {
    if (point >= 1000) return "영화 그 자체";
    if (point >= 500) return "영화에 미친자";
    if (point >= 100) return "영화 중수";
    if (point > 0) return "영화 입문자";
    return "등급 없음";
  };

  /** 프로필 변경 */
  const changeProfile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (result.canceled) return;

    const formData = new FormData();
    formData.append("profile", {
      uri: result.assets[0].uri,
      name: "profile.jpg",
      type: "image/jpeg",
    });
    formData.append("userId", userInfo.id);

    const res = await fetch(
      "http://192.168.0.227:3000/updateProfile",
      { method: "PUT", body: formData }
    );

    const data = await res.json();
    if (data.success) {
      setProfileImg(
        `http://192.168.0.227:3000${data.profile}`
      );
    } else {
      Alert.alert("업로드 실패");
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header에 userInfo 반드시 전달 */}
      <Header userInfo={userInfo} />

      <ScrollView>
        {/* 프로필 */}
        <View style={styles.profileBox}>
          <TouchableOpacity onPress={changeProfile}>
            <Image
              source={
                profileImg
                  ? { uri: profileImg }
                  : require("../../assets/profile/profile.jpg")
              }
              style={styles.profileImg}
            />
          </TouchableOpacity>

          <Text style={styles.rank}>{movieRank()}</Text>
          <Text style={styles.name}>{userInfo.name}님</Text>
          <Text style={styles.point}>{point} P</Text>
        </View>

        {/* 메뉴 */}
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MyInfo", {
                userInfo:{
                    id: userInfo?.id,
                    name: userInfo?.name
                },
                }
              )
            }
          >
            <Text style={styles.menuItem}>개인정보 변경</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MyReserve", {
                userInfo: {
                    id: userInfo?.id,
                    name: userInfo?.name
                    }
                }
                )
              }
                userInfo:{
                    id: userInfo?.id,
                    name: userInfo?.name
                },
                }
              )
            }
          >
            <Text style={styles.menuItem}>예매내역</Text>
          </TouchableOpacity>
        </View>

        {/* 예매 요약 */}
        <View style={styles.history}>
          <Text style={styles.sectionTitle}>나의 예매내역</Text>

          {seatData.length === 0 ? (
            <Text style={styles.reserveTitle}>예매 내역이 없습니다.</Text>
          ) : (
            seatData.map((item) => (
              <View
                key={item.seat_id}
                style={styles.reserveCard}
              >
                <Text style={styles.reserveTitle}>{item.movie_name}</Text>
                <Text style={styles.reserveMeta} >
                  {item.date.slice(0, 10)} {item.time}
                </Text>
                <Text style={styles.reserveSeat}>
                  좌석:{" "}
                  {item.seat_num.split(",").join(", ")}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
