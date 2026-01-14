import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a97f3f",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* 검색창 */
  searchBox: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 16,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },

  searchBtn: {
    backgroundColor: "#755205",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 6,
  },

  searchBtnText: {
    color: "#fff",
    fontSize: 16,
  },

  /* 영화 섹션 */
  section: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "#a97f3f",
  },

  poster: {
    width: 130,
    height: 200,
    borderRadius: 6,
  },

  infoBox: {
    flex: 1,
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },

  desc: {
    color: "#f5f5f5",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },

  meta: {
    color: "#ffe9c4",
    fontSize: 13,
    marginTop: 4,
  },
});
