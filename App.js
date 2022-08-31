// import React, { useMemo, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// import { color } from './helper/Common/Colors';
// import fonts from './helper/Common/fonts';
// import { MyStack } from './helper/components/MyStack';
// import { LoaderContext, UserProvider } from './helper/utils/context';

//  const App = () => {
//   const [isShowLoader, setIsShowLoader] = useState(false);
//   const loaderContext = useMemo(
//     () => ({
//       showLoader: async () => {
//         try {
//           setIsShowLoader(true);
//         } catch (e) {
//           console.log(e);
          
//         }
//       },
//       hideLoader: async () => {
//         try {
//           setIsShowLoader(false);
//         } catch (e) {
//           console.log(e);
//         }
//       },
//     }),
//     [],
//   );
//   const toastConfig = {
   
//     success: (props) => (
//       <BaseToast
//         {...props}
//         style={{ borderLeftColor: color.green, backgroundColor: color.green }}
//         contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: color.green, margin: 4 }}
//         text1Style={{
//           fontSize: 14,
//           fontFamily: fonts.semiBold,
//           color: color.white
//         }}
//       />
//     ),
//     error: (props) => (
//       <ErrorToast
//         {...props}
//         style={{ borderLeftColor: color.darkRed, backgroundColor: color.darkRed }}
//         contentContainerStyle={{ paddingHorizontal: 12, backgroundColor: color.darkRed, margin: 4 }}
//         text1Style={{
//           fontSize: 14,
//           fontFamily: fonts.semiBold,
//           color: color.white,
//         }}
//         text2Style={{
//           fontSize: 14,
//           fontFamily: fonts.semiBold,
//           color: color.white,
//         }}
//       />
//     ),
   
//     tomatoToast: ({ text1, props }) => (
//       <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
//         <Text>{text1}</Text>
//         <Text>{props.uuid}</Text>
//       </View>
//     )
//   };
   
//   return (
//     <LoaderContext.Provider value={loaderContext}>
//       <UserProvider>
//       <MyStack/>
//       {isShowLoader && (
//           <View
//             style={{
//               width: '100%',
//               height: '100%',
//               position: 'absolute',
//               justifyContent: 'center',
//               alignItems: 'center',
//               zIndex: 1,
//               backgroundColor:"rgba(0,0,0,0.5)"
//             }}>
//             <ActivityIndicator size="large" color={color.titleBlack} />
//           </View>
//         )}
//       </UserProvider>
//     <Toast config={toastConfig} />
//     </LoaderContext.Provider>
//   );
// };
// export default App;


import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import MyComponent from "./Screens/SignUp";

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    // <View style={styles.container}>
    //   <Text style={styles.titleText}>Drag this box!</Text>
    //   <Animated.View
    //     style={{
    //       transform: [{ translateX: pan.x }, { translateY: pan.y },
    //         {
    //           rotate: pan.x.interpolate({
    //             inputRange: [-200, 0, 200],
    //             outputRange: ["-30deg", "0deg", "30deg"],
    //           }),
    //         }]
    //     }}
    //     {...panResponder.panHandlers}
    //   >
    //     <View style={styles.box} />
    //   </Animated.View>
    // </View>
    <MyComponent/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default App;