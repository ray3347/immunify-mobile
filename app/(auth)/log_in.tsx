import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { formatDynamicAPIAccesses } from 'next/dist/server/app-render/dynamic-rendering'
import { useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [errors, setErrors] = useState({
    email:'',
    password:'',
  })
 

  const handleChange = (field: string, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }))
  }

  const handleSubmit = () =>{
    const newErrors = {
      email:'',
      password:''
    }

    if(!form.email){
      newErrors.email = 'Email is required'
    }else if(!/\S+@\S+\.\S+/.test(form.email)){
      newErrors.email = 'Invalid email format'
    }

    if(!form.password) {
      newErrors.password = 'Password is required'
    }else if(form.password.length < 6){
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)

    if(!newErrors.email && !newErrors.password){
      router.push('/(tabs)/home')
    }

  }

  const goToSignUp = () => {
    router.push('/(auth)/sign_up')
  }

  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: 'pbold', color: '#333333', marginBottom: 20 }}>Welcome Back</Text>

            <FormField
              label="Email"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter your email address"
              keyboardType='email-address'
              error={errors.email}
            />
            <FormField
              label="Password"
              value={form.password}
              onChangeText={(text) => handleChange('password', text)}
              placeholder="Create a password"
              secureTextEntry={true}
              error={errors.password}
            />

            <TouchableOpacity
              style={{
                backgroundColor: '#008B8B',
                paddingVertical: 15,
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={handleSubmit}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                  Login
                </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
              <Text style={{ fontFamily: 'pregular', color: '#666666' }}>Don't have an account? </Text>
              <TouchableOpacity onPress={goToSignUp}>
                <Text style={{ fontFamily: 'pbold', color: '#008B8B' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Login