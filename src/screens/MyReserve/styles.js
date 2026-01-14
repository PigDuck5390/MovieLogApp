import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#0F0B08",
  panel: "#15100C",
  panel2: "#1B140F",
  cream: "#F3E7D6",
  cream2: "#E7D4BC",
  gold: "#C9A36A",
  line: "rgba(243,231,214,0.14)",
  line2: "rgba(201,163,106,0.22)",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.cream,
    letterSpacing: 0.6,
    marginBottom: 12,
  },

  // 카드 리스트 간격
  card: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,

    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line2,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  // 카드 안 왼쪽 “티켓 바” 느낌
  info: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
    paddingLeft: 12,
  },

  movieTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.cream,
    letterSpacing: 0.3,
    marginBottom: 8,
  },

  text: {
    color: COLORS.cream2,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
    marginBottom: 4,
  },

  // (선택) 날짜/시간을 한 줄에 예쁘게 정렬하고 싶을 때 쓸 row
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 4,
  },

  // (선택) 좌석 강조
  seat: {
    marginTop: 6,
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  emptyWrap: {
    marginTop: 30,
    backgroundColor: COLORS.panel2,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 16,
    padding: 16,
  },

  emptyText: {
    color: "rgba(243,231,214,0.75)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
