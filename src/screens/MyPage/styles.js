import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  userName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  userEmail: {
    color: "#777",
  },

  menuGrid: {
    marginTop: 10,
  },

  menuBtn: {
    paddingVertical: 18,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 12,
  },

  menuLabel: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  bottomBox: {
    marginTop: 40,
  },

  bottomItem: {
    fontSize: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
