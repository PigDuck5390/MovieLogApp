import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/loginStyles";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/userinfo")
      .then(res => res.json())
      .then(data => setUserData(data));
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
  );
}
