import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, Feather, FontAwesome, Entypo, SimpleLineIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ReadMore from 'react-native-read-more-text';
import moment from 'moment'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { width, height } = Dimensions.get('screen')

const BOX_SIZE = height * 0.068

const stack = createStackNavigator()
const data = [
  {
    image: require('./assets/doctor3.png'),
    name: 'Dr. Kevin William',
    majorIn: 'Senior Cartiologist & Surgeon',
    id: 1
  },
  {
    image: require('./assets/doctor1.png'),
    name: 'Dr. Jane Foster',
    majorIn: 'Cartiologist',
    id: 2
  },
  {
    image: require('./assets/doctor2.png'),
    name: 'Dr. William Richard',
    majorIn: 'Dentist',
    id: 3
  }
]
const DoctorCard = ({ name, image, majorIn, index, item }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={{
      width: width * 0.5,
      height: height * 0.38,
      backgroundColor: '#166dda',
      borderRadius: 20,
      marginTop: 20,
      marginLeft: 20,
      overflow: 'hidden',
      marginRight: index === data.length - 1 ? 20 : 0
    }}
      onPress={() => navigation.navigate('Appointment', item)}
    >
      <Image source={image}
        style={{
          resizeMode: 'contain',
          width: '100%',
          height: '95%',
          top: 15,
          transform: [{ scale: 1.5 }]
        }}
      />
      <View style={{
        width: '100%',
        height: '25%',
        backgroundColor: 'white',
        bottom: 0,
        borderRadius: 20,
        paddingHorizontal: 10,
        bottom: '20%'
      }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'RubikBold',
            color: '#166dda', marginTop: 15
          }}
        >{name}</Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Rubik',
            color: '#166dda', marginTop: 5
          }}>{majorIn}</Text>
      </View>
    </TouchableOpacity>
  )
}
const AppointmentScreen = ({ navigation, route }) => {

  const [activeindex, setIndex] = React.useState(-1)
  const [loaded] = useFonts({
    Rubik: require('./assets/Rubik-Regular.ttf'),
    RubikBold: require('./assets/Rubik-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }



  const NumberOfDays = []
  for (let i = 0; i <= moment().endOf('month').format('DD') - moment().add(1, 'days').format('DD') + 1; i++) {

    let m = moment().add(i, 'days')
    NumberOfDays.push({ dayName: m.format('llll').slice(0, 3), dayNumber: m.format('DD'), Month: m.format('MMMM'), Year: m.format('Y') })


  }

  return (
    <View style={styles.container}>
      <View style={{
        flex: 2.5,
        backgroundColor: '#166dda',
        width,
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        alignItems: 'center'
      }}>

        <Image
          source={route.params.image}
          style={{
            resizeMode: 'contain',
            width: '80%',
            height: height * 0.5,
          }}
        />
      </View>

      <View style={{
        flex: 3,
        backgroundColor: '#f5f6f9',
        width,
        alignItems: 'center'
      }}>

        <View style={{
          width: width * 0.65,
          height: height * 0.1,
          marginTop: 45,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',

        }}>
          <TouchableOpacity style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            backgroundColor: '#b9cafd',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Ionicons name="call" size={25} color="#166dda" />
          </TouchableOpacity>

          <TouchableOpacity style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            backgroundColor: '#b9cafd',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FontAwesome name="video-camera" size={25} color="#166dda" />
          </TouchableOpacity>

          <TouchableOpacity style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            backgroundColor: '#b9cafd',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Entypo name="chat" size={25} color="#166dda" />
          </TouchableOpacity>
        </View>

        <View style={{
          height: '25%',
          width: '88%',
          justifyContent: 'center',
          paddingBottom: 20
        }}>
          <ReadMore numberOfLines={3}
            renderTruncatedFooter={(handlePress) => {
              return (
                <Text style={{
                  color: '#166dda', marginTop: 5, fontFamily: 'Rubik',
                  fontSize: 15,
                }} onPress={handlePress}>
                  Read more
                </Text>
              )
            }}
            renderRevealedFooter={(handlePress) => {
              return (
                <Text style={{
                  color: '#166dda', marginTop: 5, fontFamily: 'Rubik',
                  fontSize: 15,
                }} onPress={handlePress}>
                  Show Less
                </Text>
              )
            }}
          >
            <Text
              style={{
                fontFamily: 'Rubik',
                fontSize: 17,
                color: '#312a37',

              }}
            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </Text>
          </ReadMore>

        </View>

        <View style={{
          height: height * 0.16,
          width: width,
          justifyContent: 'center',
          bottom: 10,
        }}>
          <Text style={{
            fontFamily: 'RubikBold',
            fontSize: 25,
            letterSpacing: 0.3,
            marginLeft: 25,
          }}>{moment().format('MMMM YYYY')}</Text>
          <FlatList
            data={NumberOfDays}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={width * 0.2 + 20}
            pagingEnabled
            keyExtractor={(item, index) => { return index }}
            renderItem={({ item, index }) => {

              return (

                <TouchableOpacity onPress={() => setIndex(index)}>
                  <View style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: '20',
                    shadowOpacity: 0.1,
                    shadowOffset: { height: 2 },
                    backgroundColor: index === activeindex ? '#166dda' : '#f5f6f9',
                    marginLeft: 20,
                    marginTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: index === NumberOfDays.length - 1 ? 10 : 0,
                    transform: [{
                      translateY: index === activeindex ? -7 : 0
                    }]
                  }} >
                    <Text
                      style={{
                        fontFamily: 'Rubik',
                        color: index === activeindex ? 'white' : '#84849e',
                        fontSize: 15
                      }}
                    >{item.dayName}</Text>
                    <Text style={{
                      fontFamily: 'RubikBold',
                      color: index === activeindex ? 'white' : 'black',
                      fontSize: 35
                    }}>{item.dayNumber}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
            }
          />

        </View>

        <View style={{
          width,
          height: height * 0.1,
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
          <TouchableOpacity style={{
            backgroundColor: '#166dda',
            width: width * 0.15,
            height: width * 0.15,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <SimpleLineIcons name="clock" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#166dda',
            width: width * 0.75,
            height: width * 0.15,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Rubik',
              letterSpacing: 0.2
            }}>Book an Appointment</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={{
        width: '82%',
        height: '10%',
        borderRadius: 20,
        backgroundColor: '#f5f6f9',
        position: 'absolute',
        bottom: height * 0.5,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { height: 1 },
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontFamily: 'RubikBold',
          marginBottom: 8,
          fontSize: 22,
          color: '#312a37',
          letterSpacing: 0.5
        }}>{route.params.name}</Text>
        <Text style={{
          fontFamily: 'Rubik',
          color: '#84849e',
          opacity: 0.6,
          marginBottom: 2,
          fontSize: 13,
          letterSpacing: 0.5
        }}>{route.params.majorIn}</Text>
        <Text style={{
          fontFamily: 'Rubik',
          color: '#84849e',
          opacity: 0.6,
          fontSize: 13,
          letterSpacing: 0.5
        }}>City State Medical College & Hospital</Text>
      </View>

    </View>
  );
}


const HomeScreen = () => {
  const [loaded] = useFonts({
    Rubik: require('./assets/Rubik-Regular.ttf'),
    RubikBold: require('./assets/Rubik-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container1}>
      <View style={{
        width,
        height: height * 0.07,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
      }}>
        <Ionicons name="menu" size={40} color="black" />
        <Image
          source={require('./assets/profile.jpg')}
          style={{
            width: width * 0.12,
            height: width * 0.12,
            borderRadius: (width * 0.2) / 2,
            resizeMode: 'contain',
            marginRight: 10
          }}
        />
      </View>

      <View style={{
        width,
        height: height * 0.25,
        justifyContent: 'center',
        paddingHorizontal: 20,
        bottom: 20
      }}>
        <Text style={{
          fontFamily: 'Rubik',
          color: '#b9cafd',
          fontSize: 35
        }}>Hi</Text>
        <Text style={{
          fontFamily: 'RubikBold',
          color: 'black',
          fontSize: 32
        }}
          numberOfLines={1}
        >Let's Find Your Doctor!</Text>

        <View style={{
          width: '85%',
          height: '20%',
          borderColor: '#c4c3d0',
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 30,
        }}>
          <TextInput placeholder='Search Doctor...' style={{
            fontFamily: 'Rubik',
            fontSize: 16,
            width: '80%',
            left: 5,
            opacity: 0.8
          }}
          />
          <View style={{
            width: '15%',
            height: '110%',
            backgroundColor: '#166dda',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            left: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="search1" size={20} color="white" />
          </View>
        </View>
      </View>

      <View style={{
        width,
        height: height * 0.2,
        bottom: 10
      }}>
        <Text style={{
          paddingHorizontal: 20,
          fontFamily: 'RubikBold',
          color: 'black',
          fontSize: 25,
          bottom: 10
        }}>Category</Text>

        <View style={{
          width,
          height: height * 0.12,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>

          <TouchableOpacity style={{
            alignItems: 'center'
          }}>
            <View style={{
              width: width * 0.15,
              height: width * 0.15,
              backgroundColor: '#d4ecfc',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="brain" size={40} color="#b0daf7" />
            </View>
            <Text style={{
              fontFamily: 'RubikBold',
              marginTop: 5,
              fontSize: 15
            }}>Brain</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            alignItems: 'center'
          }}>
            <View style={{
              width: width * 0.15,
              height: width * 0.15,
              backgroundColor: '#d4ecfc',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="stomach" size={40} color="#b0daf7" />
            </View>
            <Text style={{
              fontFamily: 'RubikBold',
              marginTop: 5,
              fontSize: 15
            }}>Stomach</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            alignItems: 'center'
          }}>
            <View style={{
              width: width * 0.15,
              height: width * 0.15,
              backgroundColor: '#d4ecfc',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="eye-outline" size={40} color="#b0daf7" />
            </View>
            <Text style={{
              fontFamily: 'RubikBold',
              marginTop: 5,
              fontSize: 15
            }}>Eye</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            alignItems: 'center'
          }}>
            <View style={{
              width: width * 0.15,
              height: width * 0.15,
              backgroundColor: '#d4ecfc',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="foot-print" size={40} color="#b0daf7" />
            </View>
            <Text style={{
              fontFamily: 'RubikBold',
              marginTop: 5,
              fontSize: 15
            }}>Foot</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        width,
        height: height * 0.44,
        bottom: 30
      }}>
        <Text style={{
          fontFamily: 'RubikBold',
          color: 'black',
          fontSize: 25,
          paddingHorizontal: 20
        }}
        >Popular Doctors</Text>

        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => { return index }}
          renderItem={({ item, index }) => {
            return (
              <DoctorCard name={item.name} image={item.image} majorIn={item.majorIn} index={index} item={item} />
            )
          }}
        />

      </View>
    </View >
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false
        }} />
        <stack.Screen name="Appointment" component={AppointmentScreen} options={{
          headerTransparent: true,
          title: '',
          headerLeft: (props) => {
            return (
              <View style={{ marginLeft: 15 }}>
                <MaterialCommunityIcons name="keyboard-backspace" size={40} color="white" {...props} />
              </View>
            )
          },
          headerRight: (props) => {
            return (
              <Image
                source={require('./assets/profile.jpg')}
                style={{
                  width: width * 0.12,
                  height: width * 0.12,
                  borderRadius: (width * 0.2) / 2,
                  resizeMode: 'contain',
                  marginRight: 10
                }}
              />
            )
          }
        }} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#f5f6f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 5,
    backgroundColor: '#f5f6f9',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textStyles: {
    alignSelf: 'center',
  }
});
