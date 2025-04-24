import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import FormField from "../../components/FormField";
import PrimaryButton from "../../components/PrimaryButton";

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = () => {
    if (validate()) {
      router.push("/(tabs)/home");
    }
  };

  const goToSignUp = () => {
    router.push("/(auth)/sign_up");
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Welcome Back</Text>

          <FormField
            label="Email"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter your email address"
            keyboardType="email-address"
            error={errors.email}
          />

          <FormField
            label="Password"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />

          <PrimaryButton title="Login" onPress={handleSubmit} style={styles.loginButton} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "pbold",
    color: "#333333",
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontFamily: "pregular",
    color: "#666666",
  },
  signUpText: {
    fontFamily: "pbold",
    color: "#008B8B",
  },
});

export default Login;
