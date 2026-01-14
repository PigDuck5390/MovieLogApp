import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/joinStyles";

export default function JoinScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/userinfo")
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);

  const handleJoin = () => {
    if (!name || !id || !pw || !checkPw) {
      return Alert.alert("오류", "입력하지 않은 정보가 있습니다.");
    }

    if (userData.some(item => item.id === id)) {
      return Alert.alert("오류", "중복된 아이디입니다.");
    }

    if (pw !== checkPw) {
      return Alert.alert("오류", "비밀번호 확인이 다릅니다.");
    }

    fetch("http://192.168.0.227:3000/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: name,
        userId: id,
        userPw: pw,
      }),
    });

    Alert.alert("성공", "회원가입이 완료되었습니다.", [
      { text: "확인", onPress: () => navigation.navigate("Login") },
    ]);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        <Text style={styles.label}>이름 :</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>아이디 :</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} />

        <Text style={styles.label}>비밀번호 :</Text>
        <TextInput
          style={styles.input}
          value={pw}
          secureTextEntry
          onChangeText={setPw}
        />

        <Text style={styles.label}>비밀번호 확인 :</Text>
        <TextInput
          style={styles.input}
          value={checkPw}
          secureTextEntry
          onChangeText={setCheckPw}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>로그인 화면으로 이동</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleJoin}>
          <Text style={styles.joinBtn}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
