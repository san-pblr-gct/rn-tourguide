import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native'
import {
  TourGuideProvider,
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController,
} from './src'

const uri =
  'https://pbs.twimg.com/profile_images/1223192265969016833/U8AX9Lfn_400x400.jpg'

// Add <TourGuideProvider/> at the root of you app!
function App() {
  return (
    <TourGuideProvider {...{ borderRadius: 16 }}>
      <AppContent />
    </TourGuideProvider>
  )
}

const AppContent = () => {
  const iconProps = { size: 40, color: '#888' }
  const scrollViewRef = React.useRef(null)

  // Use Hooks to control!
  const { start, canStart, stop, eventEmitter } = useTourGuideController()

  React.useEffect(() => {
    // start at mount
    if (canStart) {
      start(0, scrollViewRef)
    }
  }, [canStart]) // wait until everything is registered

  React.useEffect(() => {
    eventEmitter.on('start', () => console.log('start'))
    eventEmitter.on('stop', () => console.log('stop'))
    eventEmitter.on('stepChange', () => console.log(`stepChange`))
    return () => eventEmitter.off('*', null)
  }, [])
  return (
    <ScrollView ref={scrollViewRef}>
      <View style={styles.container}>
        {/* Use TourGuideZone only to wrap */}
        <TourGuideZone
          isTourGuide
          keepTooltipPosition
          zone={1}
          text={'A react-native-copilot remastered! 🎉'}
          borderRadius={16}
        >
          <Text style={styles.title}>
            {'Welcome to the demo of\n"rn-tourguide"'}
          </Text>
        </TourGuideZone>
        <View style={styles.middleView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => start(0, scrollViewRef)}
          >
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => start(4)}>
            <Text style={styles.buttonText}>Step 4</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => start(2)}>
            <Text style={styles.buttonText}>Step 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>

          <Image source={{ uri }} style={styles.profilePhoto} />
        </View>
        <View style={styles.row}>
          <Ionicons name='ios-contact' {...iconProps} />

          <Ionicons name='ios-chatbubbles' {...iconProps} />
          <Ionicons name='ios-globe' {...iconProps} />

          <Ionicons name='ios-navigate' {...iconProps} />

          <Ionicons name='ios-rainy' {...iconProps} />
        </View>
      </View>
      <View style={{ marginTop: 100, height: 400 }}></View>

      <View style={styles.container1}>
        {/* Use TourGuideZone only to wrap */}
        <TourGuideZone
          keepTooltipPosition
          zone={2}
          text={'A react-native-copilot remastered! 🎉'}
          borderRadius={16}
        >
          <Text style={styles.title}>
            {'Welcome to the demo of\n"rn-tourguide"'}
          </Text>
        </TourGuideZone>
        <View style={styles.middleView}>
          <TouchableOpacity style={styles.button} onPress={() => start()}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => start(4)}>
            <Text style={styles.buttonText}>Step 4</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => start(2)}>
            <Text style={styles.buttonText}>Step 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TourGuideZone
            zone={3}
            shape='circle'
            text={'With animated SVG morphing with awesome flubber 🍮💯'}
          >
            <Image source={{ uri }} style={styles.profilePhoto} />
          </TourGuideZone>
        </View>
        <View style={{ marginTop: 100, height: 400 }}></View>
        <View style={styles.row}>
          <Ionicons name='ios-contact' {...iconProps} />

          <Ionicons name='ios-chatbubbles' {...iconProps} />
          <Ionicons name='ios-globe' {...iconProps} />
          <TourGuideZone zone={4}>
            <Ionicons name='ios-navigate' {...iconProps} />
          </TourGuideZone>
          <TourGuideZone zone={5} shape={'circle'}>
            <Ionicons name='ios-rainy' {...iconProps} />
          </TourGuideZone>
        </View>
        {Platform.OS !== 'web' ? (
          <TourGuideZoneByPosition
            zone={6}
            shape={'rectangle_and_keep'}
            isTourGuide
            top={191}
            left={88}
            width={64}
            height={64}
            borderRadiusObject={{
              topLeft: 0,
              bottomRight: 0,
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
})

export default App
