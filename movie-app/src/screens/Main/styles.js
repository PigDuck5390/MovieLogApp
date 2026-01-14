// src/screens/Main/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a97f3f", // 웹 Main.css의 배경 톤과 맞춤
  },
  scrollContent: {
    paddingBottom: 40,
  },

  /* ===== 책 느낌 전체 래퍼 ===== */
  bookWrapper: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  bookInner: {
    backgroundColor: "#f7ebd5", // 종이 느낌
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  /* ===== 영화 카드 (2 x 2) ===== */
  movieCard: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  posterWrapper: {
    width: "100%",
    height: 180,
    position: "relative",
    backgroundColor: "#222",
  },
  posterImg: {
    width: "100%",
    height: "100%",
  },

  /* 순위 뱃지 */
  rankBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  rankText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  /* 설명 영역 */
  descArea: {
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2b1a0e",
    marginBottom: 4,
  },
  movieDesc: {
    fontSize: 12,
    color: "#4d3a2a",
    marginBottom: 10,
  },

  /* "바로 예매하기" 버튼 */
  quickReserveBtn: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#8a6131",
    alignItems: "center",
    justifyContent: "center",
  },
  quickReserveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
  },

  /* 영화 없음 */
  emptyArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#000",
    fontSize: 14,
  },

  /* ===== 페이지 넘김 버튼 ===== */
  pageArrowRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 12,
  },
  pageArrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5a3a1f",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  pageArrowDisabled: {
    opacity: 0.35,
  },
  pageArrowText: {
    color: "#f8ede0",
    fontSize: 18,
    fontWeight: "700",
  },
  pageIndicator: {
    color: "#f8ede0",
    fontSize: 14,
    fontWeight: "500",
  },
});