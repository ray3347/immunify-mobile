import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router'

const Home = () => {
  const router = useRouter()

  const handleNext = async()=>{
    router.push('../clinic_detail')
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ marginVertical: 24, paddingHorizontal: 16 }}>
          {/* Greeting Section */}
          <View>
            <Text style={{ fontWeight: 'normal', fontSize: 12, color: '#6B7280' }}>Hello,</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#4B5563' }}>Jane Doe</Text>
              <Image source={require('../../assets/icons/chevron_down.png')} style={{ width: 20, height: 20 }} />
            </View>
          </View>

          {/* Upcoming Vaccine Section */}
          <View style={{ paddingTop: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#4B5563' }}>Upcoming Vaccine</Text>
            <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#9E9E9E', marginTop: 8 }}>
              Don't forget to schedule your upcoming vaccine
            </Text>

            {/* Vaccine Card */}
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 16,
                marginVertical: 8,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/icons/injection_fill.png')} style={{ width: 24, height: 24 }} />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontWeight: 'semibold', fontSize: 16, color: '#4B5563' }}>HPV</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#9E9E9E', marginTop: 4 }}>
                        Next dose due in
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#FFF9F2',
                          borderRadius: 20,
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                          marginLeft: 8,
                          borderWidth: 1,
                          borderColor: '#CD7B2E',
                        }}
                      >
                        <Text style={{ color: '#CD7B2E' }}>3 Days</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Image source={require('../../assets/icons/chevron_down.png')} style={{ width: 28, height: 28 }} />
              </View>
            </TouchableOpacity>

          </View>

          {/* Clinics Nearby Section */}
          <View style={{ paddingTop:16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#4B5563' }}>Clinics Nearby</Text>
            <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#9E9E9E', marginTop: 8, marginBottom: 16 }}>
              Find the closest clinic to your location
            </Text>

            {/* Clinic Card */}
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                overflow: 'hidden',
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                width: '100%',
              }}
              onPress={(handleNext)}
            >
              {/* Image at the top */}
              <Image
                source={require('../../assets/images/image 1.png')} 
                style={{ width: '100%', height: 180, resizeMode: 'cover' }}
              />

              {/* Bottom section for name, location, distance */}
              <View style={{ padding: 12 }}>
                {/* Name, Location, Distance */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>
                    Example Clinic
                  </Text>
                  <Text style={{ fontSize: 14, color: '#777' }}>
                    1.2 km
                  </Text>
                </View>
                
                <Text style={{ fontSize: 14, color: '#777', marginTop: 4 }}>
                  123 Main St, City, Country
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
