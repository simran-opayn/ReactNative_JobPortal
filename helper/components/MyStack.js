import React, { useContext, useMemo, useReducer } from "react";
import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext, UserContext } from "../utils/context";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "../Common/Colors";
import fonts from "../Common/fonts";
import navigationTheme from "./navigationTheme";
import { navigationRef } from "./rootNavigation";
import LoginView from "../../Screens/Login";
import NavigationOptions from "../Common/NavigationOptions";
import SignUpView from "../../Screens/SignUp";
import ForgotPasswordView from "../../Screens/ForgotPassword";
import SetNewPasswordView from "../../Screens/SetNewPassword";
import ProfileView from "../../Screens/Profile";
import EditProfileView from "../../Screens/EditProfile";
import CompanyProfileView from "../../Screens/CompanyProfile";
import EditCompanyProfileView from "../../Screens/EditComapnyProfile";
import JobsListView from "../../Screens/CompanyJobsList";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import SeekerDashboardView from "../../Screens/SeekerDashboard";
import RecruiterDashboardView from "../../Screens/RecruiterDashboard";
import JobDetailView from "../../Screens/JobDetail";
import AddJobView from "../../Screens/AddJob";
import ApplyJobView from "../../Screens/ApplyJob";
import ApplicantsListView from "../../Screens/ApplicantsList";
import ApplicantDetailView from "../../Screens/ApplicantDetail";
import AppliedJobsListView from "../../Screens/AppliedJobsList";
import JobSeekerListView from "../../Screens/JobSeekersList";
import JobOfferListView from "../../Screens/JobOffersList";
import JobOfferView from "../../Screens/JobOffer";
import JobOfferedListView from "../../Screens/JobOfferedTo";
import FAQView from "../../Screens/FAQ";
import ChangePasswordView from "../../Screens/ChangePassword";
import LoginToView from "../../Screens/LoginView";
import ImagesPath from "../../assets/Icons/ImagesPath";
import FavoriteJobsListView from "../../Screens/FavoriteList";
import FavoriteSeekersListView from "../../Screens/FavoriteSeekers";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const SeekerTab = createBottomTabNavigator();
const RecruiterTab = createBottomTabNavigator();

export const MyStack = () => {
    
    const [userData, setUserData] = useContext(UserContext);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const userToken = data?.data?.token.toString();
        
        try {
          await AsyncStorage.setItem('localuserdata', JSON.stringify(data));
          setUserData(data.data)
          await AsyncStorage.setItem('userToken', userToken);
          await setDefaultHeader('token', userToken);
          dispatch({type: 'LOGIN', id: 'userName', token: userToken});
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('localuserdata');
          await AsyncStorage.removeItem('userToken');
          await setDefaultHeader('token', '');
          dispatch({type: 'LOGOUT'});
        } catch (e) {
          console.log(e);
        }
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
    }, 5000);
  }, []);
  useEffect(() => {
    getToken();
  }, []);
  {
  }

  async function getToken() {
    try {
      let userData = await AsyncStorage.getItem('localuserdata');
      let userToken = await AsyncStorage.getItem('userToken');
      if (userToken != null || undefined) {
        setUserData(JSON.parse(userData).data);
       // await setDefaultHeader(userToken);
        await setDefaultHeader('token', userToken);
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      } else {
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      }
    } catch (error) {
       console.log('error: ', error);
    }
  }

  if (loginState.isLoading) {
    return (
    
    <View style={{backgroundColor:color.mainColor, flex: 1, justifyContent: "center"}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 32,
            fontFamily: fonts.bold,
            textAlign: "center"
          }}>{`JOB PORTAL`}</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
         {/* ref={navigationRef} theme={navigationRef}> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loginState.userToken == null || undefined ? (
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
          ) : (
            <Stack.Screen name="App" component={AppStackNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


const SeekerTabViews = () => {
  const [tabRoute, setTabRoute] = useState('Home');

    return (
        <SeekerTab.Navigator> 
             <SeekerTab.Screen name="SeekerDashboard" component={SeekerDashboardView} options={{tabBarActiveTintColor: color.mainColor, title: 'Dashboard', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.homeImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
            <SeekerTab.Screen name="Jobs" component={JobsListView} options={{tabBarActiveTintColor: color.mainColor, title: 'Jobs', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.listImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
            <SeekerTab.Screen name="JobOffers" component={JobOfferListView} options={{tabBarActiveTintColor: color.mainColor, title: 'Job Offers', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.offerrImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
            <SeekerTab.Screen name="Profile" component={ProfileView} options={{tabBarActiveTintColor: color.mainColor, title: 'Profile', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.userImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20,}, headerShown: true}}
            />
        </SeekerTab.Navigator>
       
    );
};

const RecruiterTabViews = () => {
  const [tabRoute, setTabRoute] = useState('Home');

    return (
        <RecruiterTab.Navigator>              
            <RecruiterTab.Screen name="RecruiterDashboard" component={RecruiterDashboardView} options={{tabBarActiveTintColor: color.mainColor, title: 'Dashboard', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.homeImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
            <RecruiterTab.Screen name="JobSeekers" component={JobSeekerListView} options={{tabBarActiveTintColor: color.mainColor, title: 'Job Seekers', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.seekersImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
            <RecruiterTab.Screen name="Applicants" component={ApplicantsListView} options={{tabBarActiveTintColor: color.mainColor, title: 'Applicants', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.applicantImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
            <RecruiterTab.Screen name="Company" component={CompanyProfileView} options={{tabBarActiveTintColor: color.mainColor, title: 'Company', 
                headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                  <Image source={ImagesPath.companyImg} style={{width: 24, height: 24, resizeMode: "contain",
                        tintColor: ((focused) ? color.mainColor : color.darkGray)}}/>
                ),
                headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20}, headerShown: true
                  }} 
            />
        </RecruiterTab.Navigator>
       
    );
};

const AuthStackNavigator = () => {
    return(
        <AuthStack.Navigator> 
          {/* <AuthStack.Screen name="LoginTo" component={LoginToView} options={{headerShown:false}}/> */}
            <AuthStack.Screen name="Login" component={LoginView} options={{headerShown:false}}/>
            <AuthStack.Screen name="Signup" component={SignUpView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AuthStack.Screen name="ForgetPassword" component={ForgotPasswordView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AuthStack.Screen name="SetPassword" component={SetNewPasswordView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AuthStack.Screen name="ChangePassword" component={ChangePasswordView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AppStack.Screen name="Profile" component={ProfileView} options={NavigationOptions.NavHeaderStyle('Profile')}/>
            <AppStack.Screen options={{headerShown:false}}  name="RecruiterTabView" component={RecruiterTabViews}/>
            <AppStack.Screen options={{headerShown:false}}  name="SeekerTabView" component={SeekerTabViews}/>
            <AuthStack.Screen name="EditProfile" component={EditProfileView} options={NavigationOptions.NavHeaderStyle('Edit Profile')}/>
            <AuthStack.Screen name="EditCompanyProfile" component={EditCompanyProfileView} options={NavigationOptions.NavHeaderStyle('Edit Profile')}/>
            <AuthStack.Screen name="JobDetail" component={JobDetailView} options={NavigationOptions.NavHeaderStyle('Job Detail')}/>
            <AuthStack.Screen name="AddJob" component={AddJobView} options={NavigationOptions.NavHeaderStyle('Add Job')}/>
            <AuthStack.Screen name="ApplyJob" component={ApplyJobView} options={NavigationOptions.NavHeaderStyle('Apply Job')}/>
            <AuthStack.Screen name="ApplicantDetail" component={ApplicantDetailView} options={NavigationOptions.NavHeaderStyle('Applicant Detail')}/>
            <AuthStack.Screen name="AppliedJobs" component={AppliedJobsListView} options={NavigationOptions.NavHeaderStyle('Applied Jobs')}/>
            <AuthStack.Screen name="Jobs" component={JobsListView} options={NavigationOptions.NavHeaderStyle('Jobs')}/>
            <AuthStack.Screen name="OfferJob" component={JobOfferView} options={NavigationOptions.NavHeaderStyle('Offer Job')}/>
            <AuthStack.Screen name="OfferedJob" component={JobOfferedListView} options={NavigationOptions.NavHeaderStyle('Offered Jobs')}/>
            <AuthStack.Screen name="FAQ" component={FAQView} options={NavigationOptions.NavHeaderStyle('FAQ')}/>
            <AuthStack.Screen name="FavoriteJobs" component={FavoriteJobsListView} options={NavigationOptions.NavHeaderStyle('Favorite Jobs')}/>
            <AuthStack.Screen name="FavoriteSeekers" component={FavoriteSeekersListView} options={NavigationOptions.NavHeaderStyle('Favorite Seekers')}/>
        </AuthStack.Navigator>
    )
};

const AppStackNavigator = () => {
    return(
        <AppStack.Navigator>
            {/* <AppStack.Screen options={{headerShown:false}}  name="TabView" component={AppTabViews}/>
            <AppStack.Screen name="ChangePassword" component={ChangePasswordView} options={NavigationOptions.NavHeaderStyle('')} headerLeft={{marginLeft: 24}}/>
            <AppStack.Screen name="AddTicket" component={AddTicketView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AppStack.Screen name="CalendarScreen" component={CalendarScreen} options={NavigationOptions.NavHeaderStyle('Holiday Listing')}/>
            <AppStack.Screen name="RequestLeaveScreen" component = {RequestLeaveScreen} options={NavigationOptions.NavHeaderStyle('Request Leave')}/>
            <AppStack.Screen name="EditProfile" component = {EditProfileView} options={NavigationOptions.NavHeaderStyle('Edit Profile')}/>
            <AppStack.Screen name="picker" component = {ImagePickerView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AppStack.Screen name="leaveList" component={LeavesRequestListing} options={NavigationOptions.NavHeaderStyle('Leave Requests')}/>
            <AppStack.Screen name="leaveDetail" component={LeaveDetail} options={NavigationOptions.NavHeaderStyle('Leave Detail')}/>
            <AppStack.Screen name="employeeList" component={EmployeeList} options={NavigationOptions.NavHeaderStyle('Employees')}/>
            <AppStack.Screen name="employeeDetail" component={EmployeeDetail} options={NavigationOptions.NavHeaderStyle('Employee')}/>
            <AppStack.Screen name="Attendance List" component={AttendanceList} options={NavigationOptions.NavHeaderStyle('Attendance List')}/>
            <AppStack.Screen name="PopUpModal" component={PopUpModal} options={NavigationOptions.NavHeaderStyle('')}/>
            <AppStack.Screen name="addEmployee" component={AddEmployee} options={NavigationOptions.NavHeaderStyle('')}/>
            <AppStack.Screen name="workHistory" component={WorkHistory} options={NavigationOptions.NavHeaderStyle('Work History')}/>
            <AppStack.Screen name="addAnnouncementView" component={AddAnnouncementView} options={NavigationOptions.NavHeaderStyle('')}/>
            <AppStack.Screen name="addHoliday" component={AddHoliday} options={NavigationOptions.NavHeaderStyle('Add Holiday')}/>
            <AppStack.Screen name="emergencyLeave" component={EmergencyLeave} options={NavigationOptions.NavHeaderStyle('Emergency Leave')}/>
            <AppStack.Screen name="Notifications" component={NotificationView} options={NavigationOptions.NavHeaderStyle('Notification')}/>
            <AppStack.Screen name="Announcements" component={AnnouncementList} options={NavigationOptions.NavHeaderStyle('Announcements')}/>
            <AppStack.Screen name="barcode" component={BarcodeScanner} options={NavigationOptions.NavHeaderStyle('Scanner')}/> */}
        </AppStack.Navigator>
    )
};
  
