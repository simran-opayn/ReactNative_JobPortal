import  React, { useState, useContext }  from "react";
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import { Text, Image, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import fonts from "../helper/Common/fonts";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { TextButton } from "../helper/components/TextButton";
import { useNavigation, TabActions } from "@react-navigation/native";
import { MainButton } from "../helper/components/mainButton";
import { AuthStyle } from "../helper/CustomStyle/AuthStyle";
import SideMenuModal from "./SideMenu";
import { UserContext } from "../helper/utils/context";

const RecruiterDashboardView = ({navigation=useNavigation()}) => {
    const [ userData, setUserData ] = useContext(UserContext);
    const jobs = [{id: 1, image: ImagesPath.userwhiteImg}, {id: 2, image: ImagesPath.activeUserImg}, {id: 3, image: ImagesPath.addUserImg}, {id: 4, name: ImagesPath.activeUserImg}];
    const [ showSideMenu, setShowSideMenu ] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => 
        <TouchableOpacity onPress={() => setShowSideMenu(true)}>
            <Image 
                source={ImagesPath.sideMenuImg} 
                style={{width: 24, height: 24, resizeMode: "contain", tintColor: color.white, marginLeft: 20}}
            />
          </TouchableOpacity>
        });
      }, [navigation]);

    return(
        <SafeAreaView style={{backgroundColor: color.mainColor, flex: 1}}>
            <Text style={[AuthStyle.viewTitle, {margin: 24, marginTop: 8, alignSelf: "flex-start"}]}>Hello, Recruiter</Text>
        <ScrollView style={[CustomStyling.curveViewStyle, {paddingHorizontal: 20}]}>
            <View style={{marginHorizontal: 0, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={[CustomStyling.medium16Text, {marginHorizontal: 4}]}>Jobs Added</Text>
                <TextButton
                    text={"View All (10)"}
                    showUnderLine={true}
                    onPress={() => {
                        navigation.navigate("Jobs");
                    }}
                /> 
            </View>
            {jobs.map((item, index) => ( 
                <TouchableOpacity style={[{flexDirection: "row"}, CustomStyling.cardStyle]} onPress={() => navigation.navigate("JobDetail")} key={index}>
                    <Image 
                        source={item.image}
                        style={{width: "30%", height: "100%", resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                    />
                    <View style={{paddingHorizontal: 8, width: "70%"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{fontSize: 14, fontFamily: fonts.semiBold, color: color.mainColor, marginBottom: 4}}>Full Time</Text>
                        </View>
                        <Text  style={CustomStyling.listTitle1}>Software Developer</Text>
                        <View style={{flexDirection: 'row', alignItems: "center", marginVertical: 4}}>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Opayn</Text>
                            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: color.mainColor, marginHorizontal: 8}}></View>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Ludhiana, Punjab</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text  style={{fontSize: 16, fontFamily: fonts.semiBold, color: color.subtitleBlack}}>$2500</Text>
                            <Text  style={{fontSize: 16, fontFamily: fonts.medium, color: color.darkGray}}>25 Applicants</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={{marginTop: 16, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={[CustomStyling.medium16Text, {marginHorizontal: 4}]}>Favorite Seekers</Text>
                <TextButton
                    text={"View All"}
                    showUnderLine={true}
                    onPress={() => {
                        const shiftTab = TabActions.jumpTo("Applicants");
                        navigation.dispatch(shiftTab);
                    }}
                /> 
            </View>
            {jobs.map((item, index) => ( 
                    <TouchableOpacity style={[CustomStyling.cardStyle, {flexDirection: "row"}]} onPress={() => navigation.navigate('Profile')}>
                    <Image 
                        source={item.image}
                        style={{width: "30%", height: "100%", resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                    />
                    <View style={{paddingHorizontal: 8}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text  style={CustomStyling.listTitle1}>John Smith</Text>
                            {(userData.isSeeker == 1) ?
                                null
                                :
                                <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => {}}>
                                <Image 
                                    source={ImagesPath.heartFillImg}
                                    style={{height: 20, width: 20, resizeMode: "contain"}}
                                />
                                </TouchableOpacity>
                            }
                        </View>
                        <Text  style={{fontSize: 14, fontFamily: fonts.semiBold, color: color.titleBlack}}>5 Years Experience</Text>
                        <View style={{flexDirection: 'row', alignItems: "center", marginVertical: 4}}>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Software Developer</Text>
                            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: color.mainColor, marginHorizontal: 8}}></View>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Opaynb</Text>
                        </View>
                        <View style={{flexDirection: "row", marginBottom: 4, alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.locationImg}
                                style={{width: 16, height: 16, resizeMode: "contain"}}
                            />
                            <Text style={CustomStyling.regular16Text}>Ludhiana, Punjab</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={{marginTop: 16, marginHorizontal: 4, flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={CustomStyling.medium16Text}>Recommended Employees</Text>
            {/* <TextButton
                text={"View All"}
                showUnderLine={true}
                onClick={() => navigation.navigate("JobList")}
            /> */}
            </View>
            <FlatList 
                horizontal
                data={jobs}
                style={{marginTop: 4, marginBottom: 40}}
                // keyExtractor={({id}, index) => id}
                renderItem={({item}) => (
                    <View style={[CustomStyling.cardStyle, {marginRight: 8, width: 250}]}>
                        <View style={{flexDirection: "row", marginBottom: 8}}>
                            <Image 
                                source={item.image}
                                style={{width: "30%", height: 70, resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                            />
                            <View style={{paddingHorizontal: 8, justifyContent: "center", width: "70%"}}>
                                <Text  style={CustomStyling.listTitle1}>John Thomas</Text>
                                <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray, marginVertical: 4, }}>Associate Developer, Opayn</Text>
                                <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.subtitleBlack}}>Applied For Sr. Software Developer</Text>
                                
                            </View>
                        </View>
                        <View>
                            <MainButton 
                                text={"View"}
                                viewStyle={{marginTop: 0, height: 28}}
                                textStyle={{fontSize: 14}}
                                onPress={() => navigation.navigate('Profile')}
                            />
                        </View>
                    </View>
                )}
            />
            {(showSideMenu) ? 
                <SideMenuModal 
                    onPressSubmit={(type, startDate, endDate) => {
                        setShowSideMenu(false);
                    }} 
                    onPressCancel={() => setShowSideMenu(false)} 
                />
                : 
                null
            }
        </ScrollView>
        </SafeAreaView>
    );
};

export default RecruiterDashboardView;