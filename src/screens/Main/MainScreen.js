// src/screens/Main/MainScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";

import Header from "../../components/Header"; // RN용 헤더 컴포넌트 (별도로 구현)
import styles from "./styles";

export default function MainScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // 웹의 useLocation().state 역할
  const userInfo = route.params?.userInfo || null;

  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(0);

  // 영화 정보 조회
  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/movies")
      .then((response) => response.json())
      .then((data) => setMovieData(firestoreDocumentsToArray(data)))
      .catch((err) => {
        console.log("영화 정보 로딩 실패:", err);
      });
  }, []);

  // 페이지별 4개씩
  const pageSize = 4;
  const startIndex = page * pageSize;
  const pageMovies = movieData.slice(startIndex, startIndex + pageSize);
  const maxPage = Math.max(0, Math.ceil(movieData.length / pageSize) - 1);

  // 바로 예매하기
  const handleReserve = (movieId) => {
    navigation.navigate("Reservation", {
       userInfo:{
          movieId: movieId,
          name: userInfo?.name,
          id: userInfo?.id,
       }

    });
  };

  const closeAd = () => setShowAd(false);

  return (
    <View style={styles.container}>
      {/* 상단 헤더 (웹 MainHeader 역할) */}
      <Header />

      {/* 메인 스크롤 영역 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 책 느낌의 래퍼(card) */}
        <View style={styles.bookWrapper}>
          <View style={styles.bookInner}>
            {/* 페이지 내 4개 영화 (2 x 2 그리드) */}
            {pageMovies.map((movie, index) => {
              const rank = startIndex + index + 1;

              return (
                <View key={movie._docId} style={styles.movieCard}>
                  <View style={styles.posterWrapper}>
                    <Image
                      source={{
                        uri: `http://192.168.0.227:3000${movie.poster}`,
                      }}
                      style={styles.posterImg}
                    />
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>{rank}위</Text>
                    </View>
                  </View>

                  <View style={styles.descArea}>
                    <Text style={styles.movieTitle} numberOfLines={1}>
                      {movie.title}
                    </Text>
                    <Text style={styles.movieDesc} numberOfLines={3}>
                      {movie.short_description}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.quickReserveBtn}
                    onPress={() => handleReserve(movie._docId)}
                  >
                    <Text style={styles.quickReserveText}>바로 예매하기</Text>
                  </TouchableOpacity>
                </View>
              );
            })}

            {/* 페이지가 비어 있을 때 */}
            {pageMovies.length === 0 && (
              <View style={styles.emptyArea}>
                <Text style={styles.emptyText}>등록된 영화가 없습니다.</Text>
              </View>
            )}
          </View>

          {/* 페이지 넘김 버튼 */}
          <View style={styles.pageArrowRow}>
            <TouchableOpacity
              style={[
                styles.pageArrowBtn,
                page === 0 && styles.pageArrowDisabled,
              ]}
              onPress={() => page > 0 && setPage(page - 1)}
              disabled={page === 0}
            >
              <Text style={styles.pageArrowText}>◀</Text>
            </TouchableOpacity>

            <Text style={styles.pageIndicator}>
              {page + 1} / {maxPage + 1 || 1}
            </Text>

            <TouchableOpacity
              style={[
                styles.pageArrowBtn,
                page === maxPage && styles.pageArrowDisabled,
              ]}
              onPress={() => page < maxPage && setPage(page + 1)}
              disabled={page === maxPage}
            >
              <Text style={styles.pageArrowText}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
