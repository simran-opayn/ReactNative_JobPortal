import  React, { useState }  from "react";
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

const SeekerDashboardView = ({navigation=useNavigation()}) => {
    const jobs = [{id: 1, image: ImagesPath.demoLogoImg}, {id: 2, image: ImagesPath.clockImg}, {id: 3, image: ImagesPath.addImg}, {id: 4, image: ImagesPath.activeUserImg}];
    const [showSideMenu, setShowSideMenu] = useState(false);
   
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
             <Text style={[AuthStyle.viewTitle, {margin: 24, marginTop: 8, alignSelf: "flex-start"}]}>Hello, Use Name</Text>
        <ScrollView style={CustomStyling.curveViewStyle}>
            <View style={{marginHorizontal: 0, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={[CustomStyling.medium16Text, {marginHorizontal: 4}]}>Jobs Applied</Text>
                <TextButton
                text={"View All (14)"}
                showUnderLine={true}
                onPress={() => {
                    navigation.navigate("AppliedJobs");
                }}
            /> 
            </View>
            {/* <FlatList 
                data={jobs}
                style={{marginTop: 4}}
                keyExtractor={({id}, index) => id}
                renderItem={({item}) => ( */}
                {jobs.map((item, id) => ( 
                    <TouchableOpacity style={[CustomStyling.cardStyle, {flexDirection: "row"}]} onPress={() => navigation.navigate("JobDetail")}>
                    <Image 
                        source={item.image}
                        style={{width: "30%", height: "100%", resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                    />
                    <View style={{paddingHorizontal: 8, width: "70%"}}>
                        <Text style={{fontSize: 14, fontFamily: fonts.medium, color: color.mainColor, marginBottom: 4}}>Full Time</Text>
                        <Text  style={CustomStyling.listTitle1}>Software Developer</Text>
                        <View style={{flexDirection: 'row', alignItems: "center", marginVertical: 4, flexWrap: "wrap"}}>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}} numberOfLines={1}>Opayn</Text>
                            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: color.mainColor, marginHorizontal: 8}}></View>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}} numberOfLines={1}>Ludhiana, Punjab</Text>
                        </View>
                        <Text  style={{fontSize: 16, fontFamily: fonts.semiBold, color: color.subtitleBlack}}>$2500</Text>
                        
                    </View>
                </TouchableOpacity>
                ))}
                {/* )}
            /> */}
            <View style={{marginTop: 16, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={[CustomStyling.medium16Text, {marginHorizontal: 4}]}>Favorite Jobs</Text>
                <TextButton
                text={"View All (18)"}
                showUnderLine={true}
                onPress={() => {
                    navigation.navigate("FavoriteJobs");
                }}
            /> 
            </View>
            {jobs.map((item, index) => ( 
                <TouchableOpacity style={[CustomStyling.cardStyle, {flexDirection: "row"}]} onPress={() => navigation.navigate("JobDetail")}>
                    <Image 
                        source={item.image}
                        style={{width: "30%", height: "100%", resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                    />
                    <View style={{paddingHorizontal: 8, width: "70%"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{fontSize: 14, fontFamily: fonts.semiBold, color: color.mainColor, marginBottom: 4}}>Full Time</Text>
                            <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => {}}>
                                <Image 
                                    source={ImagesPath.heartFillImg}
                                    style={{height: 20, width: 20, resizeMode: "contain"}}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text  style={CustomStyling.listTitle1}>Software Developer</Text>
                        <View style={{flexDirection: 'row', alignItems: "center", marginVertical: 4, flexWrap: "wrap"}}>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}} numberOfLines={1}>Opayn</Text>
                            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: color.mainColor, marginHorizontal: 8}}></View>
                            <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}} numberOfLines={1}>Ludhiana, Punjab</Text>
                        </View>
                        <Text  style={{fontSize: 16, fontFamily: fonts.semiBold, color: color.subtitleBlack}}>$2500</Text>
                        
                    </View>
                </TouchableOpacity>
                ))}
            <View style={{marginTop: 16, marginHorizontal: 4, flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={CustomStyling.medium16Text}>Recently Viewed</Text>
            {/* <TextButton
                text={"View All"}
                showUnderLine={true}
                onPress={() => {
                    const jumpToAction = TabActions.jumpTo("Jobs");
                    navigation.dispatch(jumpToAction);
                }}
            /> */}
            </View>
            <FlatList 
                horizontal
                data={jobs}
                style={{marginTop: 4, marginBottom: 40}}
                keyExtractor={({id}, index) => id}
                renderItem={({item}) => (
                    <TouchableOpacity style={[CustomStyling.cardStyle, {marginRight: 8, width: 250}]} onPress={() => navigation.navigate("JobDetail")}>
                        <View style={{flexDirection: "row", marginBottom: 8}}>
                            <Image 
                                source={item.image}
                                style={{width: "30%", height: 50, resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                            />
                            <View style={{paddingHorizontal: 8, width: "70%"}}>
                                <Text  style={CustomStyling.listTitle1}>Software Developer</Text>
                                <View style={{flexDirection: 'row', alignItems: "center", marginVertical: 4}}>
                                    <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Opayn</Text>
                                    {/* <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: color.mainColor, marginHorizontal: 8}}></View>
                                    <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Ludhiana, Punjab</Text> */}
                                </View>
                                {/* <Text  style={{fontSize: 16, fontFamily: fonts.semiBold, color: color.subtitleBlack}}>$2500</Text> */}
                                
                            </View>
                        </View>
                        <View style={{flexDirection: "row", marginBottom: 4, alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.locationImg}
                                style={{width: 16, height: 16, resizeMode: "contain"}}
                            />
                            <Text style={CustomStyling.regular16Text}>Ludhiana, Punjab</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 4}}>
                            <Text  style={{fontSize: 16, fontFamily: fonts.semiBold, color: color.subtitleBlack}}>$2500</Text>
                            {/* <Text  style={{fontSize: 16, fontFamily: fonts.medium, color: color.darkGray}}>25 Applicants</Text> */}
                            <MainButton 
                                text={"Apply"}
                                viewStyle={{marginTop: 0, height: 28, width: "250%", alignSelf: "flex-end"}}
                                textStyle={{fontSize: 14}}
                                onPress={() => navigation.navigate("ApplyJob")}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
            {(showSideMenu) ? 
                <SideMenuModal 
                    onPressSubmit={(type, startDate, endDate) => {
                        setShowSideMenu(false);
                    }} 
                    onPressCancel={() => setShowSideMenu(false)} 
                    // navigation={navigation}
                />
                : 
                null
            }
        </ScrollView>
        </SafeAreaView>
    );
};

export default SeekerDashboardView;