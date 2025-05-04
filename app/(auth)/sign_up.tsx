import { View, Text } from "react-native";
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
import HttpService from "@/constants/HttpService";
const SignUp = () => {
  const [testConfig, setTestConfig] = useState<any[]>([]);

  useEffect(()=>{
    HttpService.get("/wiki/vaccine").then((res)=>{
      setTestConfig(res.data.data);
      console.log(res.data.data)
    })
  },[]);

  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword:''
  })
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword:''
  })

  const handleChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      email: '',
      password: '',
    confirmPassword:''
    }
    
   

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
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors)
    
    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      router.push('/(tabs)/home')
    }
  };

  const goToLogin = () => {
    router.push("/(auth)/log_in");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: 'pbold', color: '#333333', marginBottom: 20 }}>Create Account</Text>
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
              onChangeText={(text) => handleChange('confirmPassword', text)}
              placeholder="Confirm your password"
              secureTextEntry={true}
              error={errors.confirmPassword}
            />

            
            <PrimaryButton
              title="Sign up"
              onPress={handleSubmit}
              style={{ marginTop: 20 }}
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
            {testConfig.map((vax)=>(
              <View key={vax.vaccineName}>
                <Text>{vax.vaccineName}</Text>
                <Text>{vax.vaccineInformation}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignUp;
