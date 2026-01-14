import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#8C611C",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: 330,
    padding: 30,
    backgroundColor: "#f8f6f2",
    borderRadius: 4,
    elevation: 6,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 40,
    color: "#222",
  },

  penIcon: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 30,
    right: 30,
    opacity: 0.9,
    transform: [{ rotate: "-10deg" }],
  },

  label: {
    marginTop: 18,
    fontSize: 16,
    color: "#333",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.4)",
    paddingVertical: 6,
    fontSize: 17,
  },

  link: {
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: "underline",
    color: "#4a3420",
  },

  joinBtn: {
    marginTop: 30,
    alignSelf: "flex-end",
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#c17b7b",
    color: "#2a1c02",
    fontWeight: "600",
    paddingBottom: 4,
  },
});
