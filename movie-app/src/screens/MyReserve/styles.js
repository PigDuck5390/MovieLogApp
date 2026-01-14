import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },

  poster: {
    width: 90,
    height: 130,
    borderRadius: 8,
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  movieTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  text: {
    fontSize: 14,
    marginBottom: 3,
  },
});
