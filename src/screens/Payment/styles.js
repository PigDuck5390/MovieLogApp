import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  inner: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  infoBox: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#1f1f1f",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 4,
  },
  cardSection: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  noCardText: {
    fontSize: 13,
    color: "#ccc",
    lineHeight: 20,
  },
  cardItem: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 10,
    backgroundColor: "#1a1a1a",
  },
  cardItemSelected: {
    borderColor: "#ffcc00",
    backgroundColor: "#2a1a00",
  },
  cardBank: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  cardNum: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: "#aaa",
  },
  payBtn: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#ff0044",
    alignItems: "center",
  },
  payBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});
