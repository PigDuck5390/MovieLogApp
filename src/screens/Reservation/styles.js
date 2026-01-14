import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  cardHighlighted: {
    borderWidth: 2,
    borderColor: "#ffcc00",
  },
  cardLeft: {
    marginRight: 12,
  },
  poster: {
    width: 90,
    height: 130,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  cardRight: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: "#ccc",
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: "#ddd",
    marginRight: 8,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#fff",
    fontSize: 14,
  },
  dateHelp: {
    fontSize: 11,
    color: "#888",
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  timeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#ff0044",
  },
  timeText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },

  dateButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  dateButtonText: {
    fontSize: 14,
    color: "#333",
  },
});

