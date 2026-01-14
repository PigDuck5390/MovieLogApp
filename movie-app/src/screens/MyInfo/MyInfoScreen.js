import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";

export default function MyInfoScreen() {
  const [user, setUser] = useState(null);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [newName, setNewName] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.227:3000/userinfo?id=1")
      .then(res => res.json())
      .then(data => {
        setUser(data[0]);
        setNewName(data[0].name);
      });

    fetch("http://192.168.0.227:3000/cards?id=1")
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  const changePassword = () => {
    if (newPw !== confirmPw) return alert("비밀번호가 일치하지 않습니다.");

    fetch("http://192.168.0.227:3000/changePassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        newPassword: newPw,
      }),
    });

    alert("비밀번호가 변경되었습니다.");
  };

  const updateName = () => {
    fetch("http://192.168.0.227:3000/changeName", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        newName: newName,
      }),
    });

    alert("이름이 변경되었습니다.");
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>내 정보 수정</Text>

      {/* 이름 변경 */}
      <Text style={styles.label}>이름 변경</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
      />
      <TouchableOpacity style={styles.btn} onPress={updateName}>
        <Text style={styles.btnText}>이름 변경</Text>
      </TouchableOpacity>

      {/* 비밀번호 변경 */}
      <Text style={styles.label}>새 비밀번호</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPw}
        onChangeText={setNewPw}
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmPw}
        onChangeText={setConfirmPw}
      />

      <TouchableOpacity style={styles.btn} onPress={changePassword}>
        <Text style={styles.btnText}>비밀번호 변경</Text>
      </TouchableOpacity>

      {/* 카드 목록 */}
      <Text style={styles.subTitle}>등록된 카드</Text>

      {cards.map((c, i) => (
        <View key={i} style={styles.cardBox}>
          <Text style={styles.cardText}>{c.card_name}</Text>
          <Text style={styles.cardNumber}>{c.card_number}</Text>
        </View>
      ))}

    </ScrollView>
  );
}
