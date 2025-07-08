import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ArticleDetail = () => {
  const router = useRouter();

  const article = {
    title: "Understanding Heart Health: Key Factors for Prevention",
    publishDate: "April 10, 2025",
    author: "Dr. Sarah Johnson",
    authorRole: "Cardiologist",
    readTime: "7 min read",
    content: [
      "Heart disease remains one of the leading causes of mortality worldwide. However, many heart conditions can be prevented or managed with proper care and lifestyle modifications.",
      "Recent studies have shown that regular physical activity, even in small amounts, can significantly reduce the risk of heart disease. Just 30 minutes of moderate exercise five times a week can lower blood pressure and improve circulation.",
      "Diet plays an equally important role in heart health. The Mediterranean diet, rich in fruits, vegetables, whole grains, and healthy fats, has consistently been associated with improved cardiovascular outcomes.",
      "Beyond diet and exercise, stress management is often overlooked but crucial for heart health. Chronic stress can lead to inflammation and elevated blood pressure, both risk factors for heart disease.",
      "Regular check-ups are essential for early detection. Blood pressure screenings, cholesterol tests, and other preventive measures can help identify potential issues before they become serious.",
      "For those with a family history of heart disease, genetic factors can play a role. However, lifestyle choices can often mitigate genetic predispositions.",
      "New technologies are making it easier to monitor heart health at home. Wearable devices can track heart rate, detect irregular rhythms, and even perform basic ECG readings.",
      "Consultation with healthcare professionals remains the gold standard for heart health management. If you're concerned about your heart health, speak with a healthcare provider about developing a personalized prevention plan.",
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../assets/images/article2.png")}
          style={styles.headerImage}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.heading}>{article.title}</Text>

          <View style={styles.metaInfo}>
            <View style={styles.authorContainer}>
              <Text style={styles.authorName}>{article.author}</Text>
            </View>
            <View style={styles.articleStats}>
              <View style={styles.statItem}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.statText}>{article.publishDate}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.statText}>{article.readTime}</Text>
              </View>
            </View>
          </View>

          {article.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}

          {/* Related articles section */}
          {/* <Text style={styles.relatedHeading}>Related Articles</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.relatedArticles}
          >
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.relatedArticleCard}>
                <Image
                  source={require("../assets/images/article1.png")}
                  style={styles.relatedArticleImage}
                />
                <Text style={styles.relatedArticleTitle}>
                  {item === 1
                    ? "Diet Tips for Diabetic Patients"
                    : item === 2
                    ? "Understanding Blood Pressure"
                    : "Sleep and Mental Health"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  contentWrapper: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    lineHeight: 32,
    marginBottom: 16,
  },
  metaInfo: {
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  authorDetails: {
    justifyContent: "center",
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  articleStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 4,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 16,
  },
  relatedHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 16,
    marginBottom: 16,
  },
  relatedArticles: {
    marginBottom: 24,
  },
  relatedArticleCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  relatedArticleImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  relatedArticleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    padding: 12,
  },
});

export default ArticleDetail;
