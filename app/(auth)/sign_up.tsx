import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

const SignUp = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    fullname:'',
    email: '',
    password: '',
  })
  
  const [errors, setErrors] = useState({
    fullname:'',
    email: '',
    password: ''
  })

  const handleChange = (field: string, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    const newErrors = {
      fullname:'',
      email: '',
      password: ''
    }
    
    if (!form.fullname) {
      newErrors.fullname = 'Full name is required'
    } 

    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    
    if (!newErrors.email && !newErrors.password) {
      router.push('/(tabs)/home')
    }
  }

  const goToLogin = () => {
    router.push('/(auth)/log_in') 
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: 'pbold', color: '#333333', marginBottom: 20 }}>Create Account</Text>
            <FormField
              label="Parent Full Name"
              value={form.fullname}
              onChangeText={(text) => handleChange('fullname', text)}
              placeholder="Enter your full name"
              keyboardType="default"
              error={errors.fullname}
            />
            <FormField
              label="Email"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter your email address"
              keyboardType="email-address"
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
              <Text style={{ 
                color: '#FFFFFF', 
                fontFamily: 'pbold', 
                fontSize: 16,
                textAlign: 'center',
              }}>Sign Up</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
              <Text style={{ fontFamily: 'pregular', color: '#666666' }}>Already have an account? </Text>
              <TouchableOpacity onPress={goToLogin}>
                <Text style={{ fontFamily: 'pbold', color: '#008B8B' }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default SignUp