import React, { useMemo, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { color } from './helper/Common/Colors';
import fonts from './helper/Common/fonts';
import { MyStack } from './helper/components/MyStack';
import { LoaderContext, UserProvider } from './helper/utils/context';

 const App = () => {
  const [isShowLoader, setIsShowLoader] = useState(false);
  const loaderContext = useMemo(
    () => ({
      showLoader: async () => {
        try {
          setIsShowLoader(true);
        } catch (e) {
          console.log(e);
          
        }
      },
      hideLoader: async () => {
        try {
          setIsShowLoader(false);
        } catch (e) {
          console.log(e);
        }
      },
    }),
    [],
  );
  const toastConfig = {
   
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: color.green, backgroundColor: color.green }}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: color.green, margin: 4 }}
        text1Style={{
          fontSize: 14,
          fontFamily: fonts.semiBold,
          color: color.white
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: color.darkRed, backgroundColor: color.darkRed }}
        contentContainerStyle={{ paddingHorizontal: 12, backgroundColor: color.darkRed, margin: 4 }}
        text1Style={{
          fontSize: 14,
          fontFamily: fonts.semiBold,
          color: color.white,
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: fonts.semiBold,
          color: color.white,
        }}
      />
    ),
   
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
   
  return (
    <LoaderContext.Provider value={loaderContext}>
      <UserProvider>
      <MyStack/>
      {isShowLoader && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              backgroundColor:"rgba(0,0,0,0.5)"
            }}>
            <ActivityIndicator size="large" color={color.titleBlack} />
          </View>
        )}
      </UserProvider>
    <Toast config={toastConfig} />
    </LoaderContext.Provider>
  );
};
export default App;
