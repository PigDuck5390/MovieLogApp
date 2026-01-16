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
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";
import { firestoreDB } from "../../utils/firebase";

export default function MyPageScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const userInfo = route.params?.userInfo;

  const [profileImg, setProfileImg] = useState(null);
  const [seatData, setSeatData] = useState([]);
  const [point, setPoint] = useState(0);
  const [userDocId, setUserDocId] = useState(null);


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
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/users")
      .then((res) => res.json())
      .then((data) => {
        const arr = firestoreDocumentsToArray(data);
        const filtered = arr.find(item=>item.id == userInfo.id)
        setUserDocId(filtered._docId)

        if (filtered.profileUrl) {
          setProfileImg(filtered.profileUrl)
          }
      })
      .catch(() => {});
  }, []);

console.log(userDocId)


  /** 예매 내역 */
  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/seats")
      .then((res) => res.json())
      .then(data=>{
        const arr = firestoreDocumentsToArray(data)
        const filtered = arr.filter(item=> item.userId == userInfo.id)
        setSeatData(filtered)
        })
      .catch(() => {});
  }, []);

  /** 포인트 */
  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/users")
      .then((res) => res.json())
      .then(data=>{
        const arr = firestoreDocumentsToArray(data)
        const filtered = arr.find(item=>item.id == userInfo.id)
        setPoint(filtered.point)
        })
      .catch(() => {});
  }, []);


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
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (result.canceled) return;

      if (!userDocId) {
        Alert.alert("오류", "유저 문서 정보를 불러오는 중입니다. 다시 시도해주세요.");
        return;
      }

      const uri = result.assets[0].uri;

      // ✅ Storage에 저장될 경로(=문서에 저장할 경로)
      // userId로 고정하면 '프로필 변경' 때마다 같은 파일이 덮어써져서 관리가 쉬움
      const profilePath = `profile/${userInfo.id}.jpg`;

      // 1) Storage 업로드 -> downloadURL 받기
      const profileUrl = await firestoreDB.uploadImage(uri, profilePath);

      // 2) Firestore users 문서에 경로 저장 + (바로 보여주기용) url 저장
      await firestoreDB.updateUserData(userDocId, { profilePath, profileUrl });

      // 3) 화면 즉시 반영
      setProfileImg(profileUrl);

      Alert.alert("완료", "프로필 사진이 변경되었습니다.");
    } catch (e) {

      Alert.alert("업로드 실패", "프로필 업로드 중 오류가 발생했습니다.");
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
            seatData
            .sort((a, b) => Number(b.date.replaceAll("-", ""))
                    - Number(a.date.replaceAll("-", "")))
            .sort((a, b) => Number(b.time.replaceAll(":", ""))
                    - Number(a.time.replaceAll(":", "")))
            .map((item) => (
              <View
                key={item._docId}
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
