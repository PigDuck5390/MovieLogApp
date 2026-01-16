import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Header from "../../components/Header";
import styles from "./styles";

import { chatDB } from "../../utils/firebase";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";

const defaultProfile = require("../../assets/profile/profile.jpg");

/** 이미지 URL 판별 */
const isImageUrl = (text) =>
  typeof text === "string" &&
  /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(text);

export default function VipLoungeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  /** Header에서 전달된 userInfo */
  const userInfo = route.params?.userInfo || {};
  const userId = userInfo.id;
  const userName = userInfo.name;

  // ✅ point/profile은 "route로 넘어온 값"이 최신이 아닐 수 있어서
  // VipLounge 들어오면 Firestore users에서 다시 불러와서 맞춰줌(구조/기능 유지 목적)
  const [userPoint, setUserPoint] = useState(Number(userInfo.point ?? 0));
  const [profileImg, setProfileImg] = useState(null);

  /** 채팅 */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [zoomImg, setZoomImg] = useState(null);

  const scrollRef = useRef(null);

  const ROOM_ID = "vip"; // VIP 라운지 고정 룸

  /* ---------------- 로그인 / VIP 체크 ---------------- */
  useEffect(() => {
    if (!userId || !userName) {
      Alert.alert("알림", "로그인이 필요합니다.", [
        { text: "확인", onPress: () => navigation.navigate("Login") },
      ]);
      return;
    }
  }, [userId, userName]);

  /* ---------------- 프로필/포인트 조회 (Firestore users에서) ---------------- */
  useEffect(() => {
    if (!userId) return;

    fetch(
      "https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/users"
    )
      .then((res) => res.json())
      .then((data) => {
        const arr = firestoreDocumentsToArray(data);
        const me = arr.find((u) => u.id == userId);

        if (!me) {
          setProfileImg(null);
          setUserPoint(Number(userInfo.point ?? 0));
          return;
        }

        // 🔥 profileUrl 있으면 표시
        if (me.profileUrl) setProfileImg(me.profileUrl);
        else setProfileImg(null);

        // 🔥 point 있으면 반영
        setUserPoint(Number(me.point ?? 0));
      })
      .catch(() => {
        setProfileImg(null);
        setUserPoint(Number(userInfo.point ?? 0));
      });
  }, [userId]);

  /* ---------------- VIP 권한 체크 (point 불러온 뒤) ---------------- */
  useEffect(() => {
    if (!userId || !userName) return;

    if (Number(userPoint) < 500) {
      Alert.alert(
        "알림",
        "VIP 라운지는 포인트 500점 이상부터 이용 가능합니다.",
        [
          {
            text: "확인",
            onPress: () =>
              navigation.navigate("MyPage", {
                userInfo: {
                  id: userId,
                  name: userName,
                  point: Number(userPoint),
                },
              }),
          },
        ]
      );
    }
  }, [userPoint, userId, userName]);

  /* ---------------- Realtime Database 구독 (WebSocket 대체) ---------------- */
  useEffect(() => {
    const unsubscribe = chatDB.subscribe(ROOM_ID, (arr) => {
      // ✅ 시간순 정렬(Realtime DB는 순서가 뒤섞일 수 있음)
      const sorted = [...arr].sort((a, b) => (a.time ?? 0) - (b.time ?? 0));
      setMessages(sorted);
    });

    return unsubscribe;
  }, []);

  /* ---------------- 자동 스크롤 ---------------- */
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  /* ---------------- 메시지 전송 ---------------- */
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const msg = {
      sender: userName,
      userId,
      profile: profileImg, // ✅ 기존 WS 구조(profile) 유지
      message: trimmed,
      time: Date.now(), // ✅ 숫자로 저장(정렬/표시 편함)
    };

    try {
      await chatDB.sendMessage(ROOM_ID, msg);
      setInput("");
    } catch (e) {
      console.log(e);
      Alert.alert("오류", "메시지 전송 실패");
    }
  };

  const profileSource = profileImg ? { uri: profileImg } : defaultProfile;

  /* ---------------- 메시지 렌더 (기존 구조 유지) ---------------- */
  const renderMessage = (m, idx) => {
    const isMine = m.userId === userId;
    const msgProfileSource = m.profile ? { uri: m.profile } : defaultProfile;

    return (
      <View
        key={m._id ?? `${m.userId}-${idx}`}
        style={[
          styles.chatMsgRow,
          isMine ? styles.chatMine : styles.chatOther,
        ]}
      >
        {!isMine && (
          <TouchableOpacity onPress={() => setZoomImg(m.profile)}>
            <Image source={msgProfileSource} style={styles.chatProfileImg} />
          </TouchableOpacity>
        )}

        <View style={[styles.chatBubble, isMine && styles.chatBubbleMine]}>
          <Text style={styles.chatName}>{m.sender}</Text>

          {!isImageUrl(m.message) && (
            <Text style={styles.chatText}>{m.message}</Text>
          )}

          {isImageUrl(m.message) && (
            <TouchableOpacity onPress={() => setZoomImg(m.message)}>
              <Image source={{ uri: m.message }} style={styles.chatImage} />
            </TouchableOpacity>
          )}

          <Text style={styles.chatTime}>
            {m.time ? new Date(m.time).toLocaleTimeString() : ""}
          </Text>
        </View>

        {isMine && (
          <TouchableOpacity onPress={() => setZoomImg(m.profile)}>
            <Image source={msgProfileSource} style={styles.chatProfileImg} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  /* ---------------- UI (기존 구조 유지) ---------------- */
  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
  >

    <View style={styles.root}>
      <Header userInfo={{ ...userInfo, point: userPoint }} />

        <View style={styles.vipWrapper}>
          {/* 좌측 사용자 정보 */}
          <View style={styles.vipSide}>
            <Text style={styles.vipTitle}>VIP Lounge</Text>

            <View style={styles.vipUserBox}>
              <Image source={profileSource} style={styles.vipProfileImg} />

              <View style={styles.vipUserText}>
                <Text style={styles.vipUserName}>{userName} 님</Text>
                <Text style={styles.vipUserPoint}>
                  보유 포인트 : {userPoint} P
                </Text>
                <Text style={styles.vipUserDesc}>
                  항상 이용해주셔서 감사합니다.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.vipBackBtn}
              onPress={() =>
                navigation.navigate("Main", {
                  userInfo: {
                    id: userId,
                    name: userName,
                    point: userPoint,
                  },
                })
              }
            >
              <Text style={styles.vipBackBtnText}>← 메인 화면으로 돌아가기</Text>
            </TouchableOpacity>
          </View>

          {/* 우측 채팅 */}
          <View style={styles.vipChatSection}>
            <ScrollView
              ref={scrollRef}
              style={styles.vipChatBox}
              contentContainerStyle={{ paddingBottom: 10 }}
              keyboardShouldPersistTaps="handled"
            >
              {messages.map(renderMessage)}
            </ScrollView>

            <View style={styles.vipInputRow}>
              <TextInput
                style={styles.vipInput}
                value={input}
                onChangeText={setInput}
                placeholder="메시지를 입력하세요"
                multiline
              />
              <TouchableOpacity style={styles.vipSendBtn} onPress={handleSend}>
                <Text style={styles.vipSendBtnText}>전송</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 이미지 확대 */}
        <Modal visible={!!zoomImg} transparent animationType="fade">
          <TouchableOpacity
            style={styles.zoomOverlay}
            onPress={() => setZoomImg(null)}
          >
            {zoomImg && <Image source={{ uri: zoomImg }} style={styles.zoomImage} />}
          </TouchableOpacity>
        </Modal>
    </View>
    </KeyboardAvoidingView>
  );
}
