import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import styles from "./styles";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";
import { firestoreDB } from "../../utils/firebase";

export default function MyInfoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const userInfo = route.params?.userInfo;

  const [newName, setNewName] = useState("");
  const [confirmName, setConfirmName] = useState("");

  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [bank, setBank] = useState("");
  const [userData, setUserData] = useState([]);

  const [cardList, setCardList] = useState([]);
  const [reload, setReload] = useState(false);

  if (!userInfo?.id) {
    return (
      <View style={styles.container}>
        <Header userInfo={null} />
        <Text style={{ padding: 20 }}>로그인이 필요합니다.</Text>
      </View>
    );
  }

  useEffect(()=>{
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/users")
      .then(response=>response.json())
      .then(data=>setUserData(firestoreDocumentsToArray(data)))
  },[]);

  /** 카드 목록 조회 */
  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/user_cards")
      .then((res) => res.json())
      .then(data => {
        const arr = firestoreDocumentsToArray(data);
        const filtered = arr.filter(item => item.user_id == userInfo.id);
        setCardList(filtered)
      })
  }, [reload]);

  /** 이름 변경 */
  const changeName = async () => {
    if (!newName || newName !== confirmName) {
      Alert.alert("오류", "이름이 일치하지 않습니다.");
      return;
    }

    const userDoc = userData.find(
        (u) => u.id === userInfo.id
    );
    if(!userDoc?._docId){
        Alert.alert("오류","사용자 정보를 찾을 수 없습니다.");
        return;
    }
    try{
        await firestoreDB.updateName(
           userDoc._docId,
           {name: newName }
        );
    Alert.alert("완료", "이름이 변경되었습니다.");
    navigation.navigate("Main", {
              userInfo: { name: null, id: null },
            });
    } catch(e) {
        Alert.alert("오류","이름 변경 실패");
    }
  };

  /** 비밀번호 변경 */
  const changePassword = async () => {
    if (!newPw || newPw !== confirmPw) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    const userDoc = userData.find(
        (u) => u.id === userInfo.id
    );
    if(!userDoc?._docId){
        Alert.alert("오류","사용자 정보를 찾을 수 없습니다.");
        return;
    }
    try{
        await firestoreDB.updatePw(
           userDoc._docId,
           {pw: newPw }
        );
    Alert.alert("완료", "비밀번호가 변경되었습니다.");
    navigation.navigate("Main", {
              userInfo: { name: null, id: null },
            });
    } catch(e) {
        Alert.alert("오류","비밀번호 변경 실패");
    }
  };

  /** 카드 등록 */
  const registerCard = async () => {
    const cardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!cardName || !bank) {
      Alert.alert("오류", "카드 별명과 카드사를 선택하세요.");
      return;
    }

    if (!cardRegex.test(cardNum)) {
      Alert.alert("오류", "카드 번호 형식이 올바르지 않습니다.");
      return;
    }

    if (!dateRegex.test(cardDate)) {
      Alert.alert("오류", "유효기간 형식(MM/YY)을 확인하세요.");
      return;
    }
    try {
    await firestoreDB.addCard({
        user_id: userInfo.id,
        card_name: cardName,
        card_bank: bank,
        card_num: cardNum,
        card_date: cardDate,
    });

    Alert.alert("완료", "카드가 등록되었습니다.");
    setCardName("");
    setCardNum("");
    setCardDate("");
    setBank("");
    setReload((prev)=>!prev);
  } catch(e) {
    Alert.alert("오류","카드 등록 실패");
    }
  };

  /** 카드 삭제 */
  const deleteCard = async (docId) => {
    Alert.alert("삭제 확인", "카드를 삭제하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: async () => {
          try{
            await firestoreDB.deleteCard(docId);
            Alert.alert("완료","카드가 삭제되었습니다.");
            setReload((prev)=>!prev);
          } catch(e) {
            Alert.alert("오류","카드 삭제 실패");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header userInfo={userInfo} />

      <ScrollView contentContainerStyle={styles.wrapper}>
        <Text style={styles.title}>개인정보 변경</Text>

        {/* 이름 변경 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>이름 변경</Text>
          <TextInput
            style={styles.input}
            placeholder="새 이름"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="이름 확인"
            value={confirmName}
            onChangeText={setConfirmName}
          />
          <TouchableOpacity style={styles.button} onPress={changeName}>
            <Text style={styles.buttonText}>변경</Text>
          </TouchableOpacity>
        </View>

        {/* 비밀번호 변경 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>비밀번호 변경</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            secureTextEntry
            value={newPw}
            onChangeText={setNewPw}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={confirmPw}
            onChangeText={setConfirmPw}
          />
          <TouchableOpacity style={styles.button} onPress={changePassword}>
            <Text style={styles.buttonText}>변경</Text>
          </TouchableOpacity>
        </View>

        {/* 카드 등록 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>카드 등록</Text>

          <TextInput
            style={styles.input}
            placeholder="카드 별명"
            value={cardName}
            onChangeText={setCardName}
          />

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={bank}
              onValueChange={(v) => setBank(v)}
            >
              <Picker.Item label="카드사를 선택하세요" value="" />
              <Picker.Item label="국민카드" value="KB" />
              <Picker.Item label="신한카드" value="SHINHAN" />
              <Picker.Item label="우리카드" value="WOORI" />
              <Picker.Item label="하나카드" value="HANA" />
              <Picker.Item label="삼성카드" value="SAMSUNG" />
              <Picker.Item label="현대카드" value="HYUNDAI" />
              <Picker.Item label="롯데카드" value="LOTTE" />
              <Picker.Item label="NH농협카드" value="NH" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="0000-0000-0000-0000"
            value={cardNum}
            onChangeText={setCardNum}
          />

          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={cardDate}
            onChangeText={setCardDate}
          />

          <TouchableOpacity style={styles.button} onPress={registerCard}>
            <Text style={styles.buttonText}>카드 등록</Text>
          </TouchableOpacity>
        </View>

        {/* 카드 목록 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>내 카드</Text>

          {cardList.length === 0 ? (
            <Text>등록된 카드가 없습니다.</Text>
          ) : (
            cardList.map((c) => (
              <View key={c._docId} style={styles.cardItem}>
                <Text style={styles.cardName}>{c.card_name}</Text>
                <Text>{c.card_bank}</Text>
                <Text>{c.card_num}</Text>
                <TouchableOpacity onPress={()=>deleteCard(c._docId)}>
                  <Text style={styles.delete}>삭제</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
