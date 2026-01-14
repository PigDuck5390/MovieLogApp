import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

// MovieLog Palette (브라운/크림/골드 포인트)
const COLORS = {
  bg: "#0F0B08",           // 전체 배경 (다크 브라운/블랙)
  panel: "#15100C",        // 카드/패널 배경
  panel2: "#1B140F",       // 더 밝은 패널
  cream: "#F3E7D6",        // 크림 텍스트/포인트
  cream2: "#E7D4BC",       // 크림 서브
  brown: "#6B4A2F",        // 브라운
  gold: "#C9A36A",         // 골드 포인트
  line: "rgba(243,231,214,0.14)", // 크림 라인
  line2: "rgba(201,163,106,0.22)",// 골드 라인
  shadow: "rgba(0,0,0,0.55)",
  danger: "#FF4D6D",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  /* ===== 프로필 영역 ===== */
  profileBox: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,

    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line2,

    // 약한 광택 느낌 (책 표지 느낌)
    // RN은 gradient가 기본이 아니라서 "톤+라인"으로 느낌만 냄
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,

    alignItems: "center",
  },

  profileImg: {
    width: 94,
    height: 94,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.panel2,

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },

  rank: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",

    backgroundColor: "rgba(201,163,106,0.14)",
    borderWidth: 1,
    borderColor: "rgba(201,163,106,0.35)",

    color: COLORS.cream,
    fontSize: 12,
    letterSpacing: 0.8,
    fontWeight: "700",
  },

  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.cream,
    letterSpacing: 0.3,
  },

  point: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gold,
    letterSpacing: 0.6,
  },

  /* ===== 메뉴 영역 ===== */
  menu: {
    marginHorizontal: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,

    backgroundColor: COLORS.panel2,
    borderWidth: 1,
    borderColor: COLORS.line,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,

    color: COLORS.cream,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  // 메뉴 구분선 (원하면 TouchableOpacity 사이에 View 넣어 쓰기)
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginHorizontal: 6,
  },

  /* ===== 예매내역 영역 ===== */
  history: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 22,

    padding: 14,
    borderRadius: 16,

    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.cream,
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  reserveCard: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,

    backgroundColor: "rgba(243,231,214,0.06)",
    borderWidth: 1,
    borderColor: "rgba(243,231,214,0.12)",

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  reserveTitle: {
    color: COLORS.cream,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
    marginBottom: 6,
  },

  reserveMeta: {
    color: COLORS.cream2,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  reserveSeat: {
    marginTop: 6,
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  emptyText: {
    color: "rgba(243,231,214,0.7)",
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  /* ===== 작은 태그(선택사항) ===== */
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(201,163,106,0.12)",
    borderWidth: 1,
    borderColor: "rgba(201,163,106,0.25)",
  },

  tagText: {
    color: COLORS.cream,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
