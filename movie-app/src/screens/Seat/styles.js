import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  inner: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  infoBox: {
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#ddd",
  },
  screenBar: {
    marginTop: 10,
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#666",
    paddingVertical: 6,
    alignItems: "center",
  },
  screenText: {
    fontSize: 12,
    color: "#ccc",
    letterSpacing: 4,
  },
  seatGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  seat: {
    width: 46,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  seatReserved: {
    backgroundColor: "#444",
    borderColor: "#888",
  },
  seatSelected: {
    backgroundColor: "#ff0044",
    borderColor: "#ff7a99",
  },
  seatText: {
    fontSize: 12,
    color: "#fff",
  },
  bottomBox: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#111",
  },
  bottomLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  countBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
  countBtnText: {
    fontSize: 20,
    color: "#fff",
  },
  personCount: {
    width: 40,
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
  selectedText: {
    fontSize: 13,
    color: "#ddd",
    marginBottom: 10,
  },
  reserveBtn: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#ff0044",
    alignItems: "center",
  },
  reserveBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
