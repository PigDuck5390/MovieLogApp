import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Header from "../../components/Header";
import styles from "./styles";
import { firestoreDocumentsToArray } from "../../utils/firestoreRest";


export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const scrollRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/movielogapp-aee83/databases/(default)/documents/movies")
      .then((res) => res.json())
      .then((data) => setMovies(firestoreDocumentsToArray(data)))
      .catch((err) => console.log("영화 불러오기 실패:", err));
  }, []);
console.log(movies)
  const handleSearch = () => {
    if (!search.trim()) return;

    const target = movies.find((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()),
    );

    if (!target) {
      alert("검색 결과가 없습니다.");
      return;
    }

    const targetRef = itemRefs.current[target.movie_id];

    if (targetRef) {
      targetRef.measureLayout(
        scrollRef.current,
        (x, y) => scrollRef.current.scrollTo({ y, animated: true }),
        () => {},
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* 검색창 */}
      <View style={styles.searchBox}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="영화 제목 검색"
          style={styles.searchInput}
        />

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>검색</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 영역 */}
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
        {movies.map((movie) => (
          <View
            key={movie._docId}
            style={styles.section}
            ref={(el) => (itemRefs.current[movie.movie_id] = el)}
          >
            <Image
              source={{ uri: movie.poster_path }}
              style={styles.poster}
            />

            <View style={styles.infoBox}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.desc}>{movie.description}</Text>
              <Text style={styles.meta}>러닝타임: {movie.runtime}분</Text>
              <Text style={styles.meta}>
                예매 누적 수: {movie.reserv_count}명
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
