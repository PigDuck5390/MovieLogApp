import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/loginStyles";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/users")
      .then(res => res.json())
      .then(data => setUserData(firestoreDocumentsToArray(data)));
  }, []);

  const handleLogin = () => {
    const login = userData.find(
      item => item.id === id && item.pw === pw
    );

    if (!login) {
      return Alert.alert("오류", "계정 정보가 없습니다.");
    }

    Alert.alert("성공", "로그인 성공!");

    navigation.navigate("Main", {
      userInfo: { name: login.name, id: login.id },
    });
  };

  return (
  <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={20}      // 인풋이 키보드 위로 살짝 더 올라오게
        keyboardShouldPersistTaps="handled"
      >
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>

        <Text style={styles.label}>아이디 :</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} />

        <Text style={styles.label}>비밀번호 :</Text>
        <TextInput
          style={styles.input}
          value={pw}
          secureTextEntry
          onChangeText={setPw}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Join")}>
          <Text style={styles.link}>회원가입</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginBtn}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}
