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

import Header from "../../components/Header";
import styles from "./styles";

const defaultProfile = require("../../assets/profile/profile.jpg");
const WS_URL = "ws://192.168.0.227:3001";

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
  const userPoint = Number(userInfo.point ?? 0);

  /** 프로필 이미지 */
  const [profileImg, setProfileImg] = useState(null);

  /** 채팅 */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [zoomImg, setZoomImg] = useState(null);

  const wsRef = useRef(null);
  const scrollRef = useRef(null);

  /* ---------------- 로그인 / VIP 체크 ---------------- */
  useEffect(() => {
    if (!userId || !userName) {
      Alert.alert("알림", "로그인이 필요합니다.", [
        { text: "확인", onPress: () => navigation.navigate("Login") },
      ]);
      return;
    }

    if (userPoint < 500) {
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
                  point: userPoint,
                },
              }),
          },
        ]
      );
    }
  }, [userId, userName, userPoint]);

  /* ---------------- 프로필 조회 (핵심 수정) ---------------- */
  useEffect(() => {
    if (!userId) return;

    fetch(`http://192.168.0.227:3000/userprofile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.[0]?.profile) {
          setProfileImg(`http://192.168.0.227:3000${data[0].profile}`);
        } else {
          setProfileImg(null);
        }
      })
      .catch(() => setProfileImg(null));
  }, [userId]);

  /* ---------------- WebSocket ---------------- */
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setMessages((prev) => [...prev, json]);
      } catch {
        console.log("일반 메시지:", event.data);
      }
    };

    ws.onerror = (err) => {
      console.log("WebSocket error:", err.message);
    };

    return () => ws.close();
  }, []);

  /* ---------------- 자동 스크롤 ---------------- */
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  /* ---------------- 메시지 전송 ---------------- */
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !wsRef.current) return;

    const msg = {
      sender: userName,
      userId,
      profile: profileImg,
      message: trimmed,
      time: new Date().toLocaleTimeString(),
    };

    wsRef.current.send(JSON.stringify(msg));
    setInput("");
  };

  const profileSource = profileImg
    ? { uri: profileImg }
    : defaultProfile;

  /* ---------------- 메시지 렌더 ---------------- */
  const renderMessage = (m, idx) => {
    const isMine = m.userId === userId;
    const msgProfileSource = m.profile
      ? { uri: m.profile }
      : defaultProfile;

    return (
      <View
        key={`${m.userId}-${idx}`}
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

          <Text style={styles.chatTime}>{m.time}</Text>
        </View>

        {isMine && (
          <TouchableOpacity onPress={() => setZoomImg(m.profile)}>
            <Image source={msgProfileSource} style={styles.chatProfileImg} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <View style={styles.root}>
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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

            {/* 🔥 메인/마이페이지 이동 수정 */}
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
              <Text style={styles.vipBackBtnText}>
                ← 메인 화면으로 돌아가기
              </Text>
            </TouchableOpacity>
          </View>

          {/* 우측 채팅 */}
          <View style={styles.vipChatSection}>
            <ScrollView
              ref={scrollRef}
              style={styles.vipChatBox}
              contentContainerStyle={{ paddingBottom: 10 }}
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
              <TouchableOpacity
                style={styles.vipSendBtn}
                onPress={handleSend}
              >
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
            {zoomImg && (
              <Image source={{ uri: zoomImg }} style={styles.zoomImage} />
            )}
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}
