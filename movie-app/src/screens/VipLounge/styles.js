import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const isLargeScreen = width > 900;

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3b2a1d",
  },

  vipWrapper: {
    flex: 1,
    flexDirection: isLargeScreen ? "row" : "column",
    padding: isLargeScreen ? 24 : 16,
    paddingTop: isLargeScreen ? 32 : 16,
    paddingBottom: 10,
  },

  /* VIP 정보 박스 */
  vipSide: {
    width: isLargeScreen ? 260 : "100%",
    backgroundColor: "#f8f3ea",
    padding: isLargeScreen ? 24 : 14,
    borderRadius: 16,
    marginRight: isLargeScreen ? 24 : 0,
    marginBottom: isLargeScreen ? 0 : 12,
    elevation: 6,
  },

  vipTitle: {
    fontSize: isLargeScreen ? 22 : 18,
    fontWeight: "700",
    color: "#3a2413",
    marginBottom: 12,
  },

  vipUserBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  vipProfileImg: {
    width: isLargeScreen ? 70 : 54,
    height: isLargeScreen ? 70 : 54,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },

  vipUserText: {
    flexDirection: "column",
    gap: 2,
  },

  vipUserName: {
    fontSize: isLargeScreen ? 17 : 15,
    fontWeight: "700",
    color: "#3a2413",
  },

  vipUserPoint: {
    fontSize: isLargeScreen ? 14 : 13,
    color: "#7a5a35",
  },

  vipUserDesc: {
    fontSize: isLargeScreen ? 13 : 12,
    color: "#a27b4c",
  },

  vipBackBtn: {
    marginTop: 10,
    width: "100%",
    paddingVertical: isLargeScreen ? 10 : 8,
    borderRadius: 999,
    backgroundColor: "#d8860c",
    alignItems: "center",
    justifyContent: "center",
  },
  vipBackBtnText: {
    color: "#fff",
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: "600",
  },

  /* 채팅 영역 */
  vipChatSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: isLargeScreen ? 22 : 14,
    paddingVertical: isLargeScreen ? 20 : 10,
    elevation: 8,
    minHeight: isLargeScreen ? undefined : height * 0.65,
  },

  vipChatBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: isLargeScreen ? 12 : 8,
    backgroundColor: "#f8f9fb",
    flexGrow: 1,
    marginBottom: 12,
  },

  /* 입력창 */
  vipInputRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  vipInput: {
    flex: 1,
    minHeight: 45,
    maxHeight: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },

  vipSendBtn: {
    width: isLargeScreen ? 90 : 70,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#d8860c",
    alignItems: "center",
    justifyContent: "center",
  },

  vipSendBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: isLargeScreen ? 15 : 14,
  },

  /* 메시지 */
  chatMsgRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },

  chatOther: {},
  chatMine: {
    justifyContent: "flex-end",
  },

  chatProfileImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  chatBubble: {
    maxWidth: "75%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 2,
  },

  chatBubbleMine: {
    backgroundColor: "#d4ecff",
  },

  chatName: {
    fontWeight: "700",
    marginBottom: 3,
    fontSize: 13,
  },

  chatText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#222",
  },

  chatTime: {
    fontSize: 10,
    color: "#777",
    textAlign: "right",
  },

  chatImage: {
    width: isLargeScreen ? 160 : 120,
    height: isLargeScreen ? 160 : 120,
    borderRadius: 10,
    marginTop: 4,
  },

  /* 이미지 확대 */
  zoomOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  zoomImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
});
