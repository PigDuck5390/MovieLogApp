// src/components/headerStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "#3b2413",
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },

  /* ===== 상단 라인 ===== */
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#2b1a0e",
  },
  headerTopLeft: {
    flexDirection: "row",
    gap: 14,
  },
  headerTopRight: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  topText: {
    color: "#d9c3ac",
    fontSize: 12,
  },
  welcomeText: {
    color: "#e6d6c4",
    fontSize: 12,
  },
  topBtn: {
    color: "#e8d6c0",
    fontSize: 11,
  },

  /* ===== 메뉴 라인 ===== */
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#5a3a1f",
  },
  menuItem: {
    color: "#f6e2c4",
    fontSize: 15,
    letterSpacing: 1,
  },

  /* ===== 로고 ===== */
  logoBox: {
    borderWidth: 2,
    borderColor: "rgba(255,240,210,0.9)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  logoText: {
    color: "#fff8e8",
    fontSize: 20,
    letterSpacing: 3,
    fontWeight: "bold",
  },
});
