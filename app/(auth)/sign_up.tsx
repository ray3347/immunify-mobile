import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import FormField from "../../components/FormField";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import PrimaryButton from "../../components/PrimaryButton";
import { useActiveSession } from "../../utilities/zustand";
import HttpService from "../../constants/HttpService";
import { IApiResult } from "../../interfaces/api";
import { IUserAccount } from "../../interfaces/db/IAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MD5 from "crypto-js/md5";
import { addUser } from "../../utilities/api/user";
import { IUser } from "../../interfaces/db/IUser";
const SignUp = () => {
  const { activeAccount, switchAccount } = useActiveSession();
  const [testConfig, setTestConfig] = useState<any[]>([]);
  const [registerUser, setRegisterUser] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  useEffect(() => {
    if (activeAccount) {
      router.push("/(auth)/log_in");
    }
  }, [activeAccount]);

  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
  });

  const [dobInputs, setDobInputs] = useState({
    day: "",
    month: "",
    year: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

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

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      setRegisterUser(true);
      // HttpService.post("/user/register", requestBody).then(
      //   async (res: IApiResult<IUserAccount>) => {
      //     const user = res.data.data;
      //     await AsyncStorage.setItem("accountId", user.id);
      //     switchAccount(user);
      //   }
      // );
      // router.push("/(tabs)/home");
    }
  };

  const handleRegister = () => {
    setLoading(true);
    const notifToken = AsyncStorage.getItem("notificationToken").then((res)=>{
      return res;
    })
    const requestBody = {
      userData: {
        hashedUsername: form.email,
        hashedPassword: MD5(form.password).toString(),
        notificationToken: notifToken ?? ""
      },
    };
    HttpService.post("/user/register", requestBody).then(
      async (rr: IApiResult<IUserAccount>) => {
        // console.log(rr);
        const user = rr.data.data;
        console.log(user);
        await AsyncStorage.setItem("accountId", user.id);
        const reqBody: IUser = {
          id: "",
          fullName: userFormData.fullName,
          gender: userFormData.gender,
          dateOfBirth: new Date(
            `${dobInputs.year}-${dobInputs.month}-${dobInputs.day}T00:00:000`
          ),
          scheduledAppointments: [],
          vaccinationHistory: [],
        };
        console.log(reqBody);
        const addUserData = await addUser(user.id, reqBody);
        switchAccount(addUserData);

        router.push("/(tabs)/home");
      }
    );
    setLoading(false)
  };

  const goToLogin = () => {
    router.push("/(auth)/log_in");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {!registerUser ? (
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "pbold",
                  color: "#333333",
                  marginBottom: 20,
                }}
              >
                Create Account
              </Text>
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
                secureTextEntry={true}
                error={errors.password}
              />
              <FormField
                label="Confirm Password"
                value={form.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                placeholder="Confirm your password"
                secureTextEntry={true}
                error={errors.confirmPassword}
              />

              <PrimaryButton
                title="Next"
                onPress={handleSubmit}
                style={{ marginTop: 20 }}
                loading={false}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <Text style={{ fontFamily: "pregular", color: "#666666" }}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={{ fontFamily: "pbold", color: "#008B8B" }}>
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <>
            
            <ScrollView style={styles.content}>
              <Text
              style={{
                fontSize: 24,
                fontFamily: "pbold",
                color: "#333333",
                marginBottom: 20,
              }}
            >
              Create Account
            </Text>
              {/* Full Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={userFormData.fullName}
                  onChangeText={(text) =>
                    setUserFormData({ ...userFormData, fullName: text })
                  }
                  placeholder="Enter your full name"
                />
              </View>

              {/* Gender Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      userFormData.gender.toLowerCase().startsWith("m") &&
                        styles.genderButtonActive,
                    ]}
                    onPress={() =>
                      setUserFormData({ ...userFormData, gender: "M" })
                    }
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        userFormData.gender.toLowerCase().startsWith("m") &&
                          styles.genderButtonTextActive,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      userFormData.gender.toLowerCase().startsWith("f") &&
                        styles.genderButtonActive,
                    ]}
                    onPress={() =>
                      setUserFormData({ ...userFormData, gender: "F" })
                    }
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        userFormData.gender.toLowerCase().startsWith("f") &&
                          styles.genderButtonTextActive,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Date of Birth Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <View style={styles.dobContainer}>
                  <TextInput
                    style={styles.dobInput}
                    value={dobInputs.day}
                    onChangeText={(text) =>
                      setDobInputs({
                        ...dobInputs,
                        day: text.replace(/[^0-9]/g, "").slice(0, 2),
                      })
                    }
                    placeholder="DD"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={styles.dobInput}
                    value={dobInputs.month}
                    onChangeText={(text) =>
                      setDobInputs({
                        ...dobInputs,
                        month: text.replace(/[^0-9]/g, "").slice(0, 2),
                      })
                    }
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={[styles.dobInput, styles.yearInput]}
                    value={dobInputs.year}
                    onChangeText={(text) =>
                      setDobInputs({
                        ...dobInputs,
                        year: text.replace(/[^0-9]/g, "").slice(0, 4),
                      })
                    }
                    placeholder="YYYY"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
              </View>
              <PrimaryButton
                title="Register"
                onPress={handleRegister}
                style={{ marginTop: 20 }}
                loading={loading}
              />
            </ScrollView>

            {/* <View style={styles.saveButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Register</Text>
              </TouchableOpacity>
            </View> */}
          </>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  profileSelector: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  profileSelectorLabel: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "600",
  },
  profileChip: {
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  profileChipActive: {
    backgroundColor: "#009999",
  },
  profileChipText: {
    color: "#374151",
    fontWeight: "500",
  },
  profileChipTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    alignItems: "center",
  },
  genderButtonActive: {
    borderColor: "#009999",
    backgroundColor: "#E6FFFF",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#6B7280",
  },
  genderButtonTextActive: {
    color: "#009999",
    fontWeight: "600",
  },
  dobContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dobInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: "center",
  },
  yearInput: {
    flex: 2,
  },
  saveButtonContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  saveButton: {
    backgroundColor: "#009999",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignUp;
