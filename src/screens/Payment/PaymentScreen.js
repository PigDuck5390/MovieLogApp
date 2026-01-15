import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import styles from "./styles";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();


  const { reservInfo, userInfo } = route.params || {};

  const userId = userInfo?.id;
  const userName = userInfo?.name;

  const [cardData, setCardData] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);


  const seatList = reservInfo?.seats ? reservInfo.seats.split(",") : [];
  const seatCount = seatList.length;

  // 카드 정보 조회
  useEffect(() => {
    if (!userId) return;

    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/user_cards")
      .then((res) => res.json())
      .then(data => {
              const arr = firestoreDocumentsToArray(data);
              const filtered = arr.filter(item => item.user_id == userInfo.id);
              setCardData(filtered)
            })
      .catch((err) => {
        console.log("cardinfo 조회 실패:", err);
      });
  }, []);

  const submit = async () => {
    if (!cardData.length) {
      Alert.alert("알림", "카드를 등록해주세요.");
      return;
    }

    if (!selectedCardId) {
      Alert.alert("알림", "결제 카드를 선택해주세요.");
      return;
    }

    const selectedCardInfo = cardData.find(
      (item) => String(item.card_defid) === String(selectedCardId)
    );

    if (!selectedCardInfo) {
      Alert.alert("알림", "선택한 카드 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      // 1) 관객 수 업데이트
      fetch("http://192.168.0.227:3000/reservcount", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: reservInfo.movieId,
          addCount: seatCount,
        }),
      });

      // 2) 예매 정보 저장
      fetch("http://192.168.0.227:3000/reserv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: reservInfo.date,
          movieName: reservInfo.title,
          movieTime: reservInfo.time,
          userName: userName,
          userId: userId,
          seat: reservInfo.seats,
          screen: reservInfo.screen,
          pickcount: seatCount,
          cardNumber: selectedCardInfo.card_num,
          cardBank: selectedCardInfo.card_bank,
          cardDate: selectedCardInfo.card_date,
        }),
      });

      // 3) 포인트 적립
      fetch(`http://192.168.0.227:3000/point/add/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addPoint: seatCount * 10 }),
      });

      Alert.alert(
        "결제 완료",
        "결제에 성공했습니다. 마이페이지에서 내역확인이 가능합니다.",
        [
          {
            text: "확인",
            onPress: () => {
              navigation.navigate("Main", {
                userInfo: { id: userId, name: userName },
              });
            },
          },
        ]
      );
    } catch (err) {
      console.log("결제 처리 중 오류:", err);
      Alert.alert("오류", "결제 처리 중 문제가 발생했습니다.");
    }
  };

  const renderCard = (card) => {
    const isSelected =
      String(card.card_defid) === String(selectedCardId);

    return (
      <TouchableOpacity
        key={card.card_defid}
        style={[styles.cardItem, isSelected && styles.cardItemSelected]}
        onPress={() => setSelectedCardId(card.card_defid)}
      >
        <Text style={styles.cardBank}>{card.card_bank}</Text>
        <Text style={styles.cardNum}>{card.card_num}</Text>
        <Text style={styles.cardDate}>유효기간: {card.card_date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>결제 정보</Text>

        {/* 예매 정보 박스 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            영화 제목: {reservInfo?.title}
          </Text>
          <Text style={styles.infoText}>
            상영 날짜: {String(reservInfo?.date)}
          </Text>
          <Text style={styles.infoText}>
            상영 시간: {reservInfo?.time}
          </Text>
          <Text style={styles.infoText}>
            상영관: {reservInfo?.screen}관
          </Text>
          <Text style={styles.infoText}>
            좌석: {seatList.length ? seatList.join(", ") : "없음"}
          </Text>
          <Text style={styles.infoText}>좌석 개수: {seatCount}개</Text>
          <Text style={styles.infoText}>
            총 결제 금액: {seatCount * 10000} 원
          </Text>
        </View>

        {/* 카드 선택 영역 */}
        <View style={styles.cardSection}>
          <Text style={styles.cardTitle}>결제 카드 선택</Text>

          {cardData.length === 0 ? (
            <Text style={styles.noCardText}>
              등록된 카드가 없습니다.{"\n"}웹에서 카드를 먼저 등록해주세요.
            </Text>
          ) : (
            <View>{cardData.map(renderCard)}</View>
          )}
        </View>

        {/* 결제 버튼 */}
        <TouchableOpacity style={styles.payBtn} onPress={submit}>
          <Text style={styles.payBtnText}>결제하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
