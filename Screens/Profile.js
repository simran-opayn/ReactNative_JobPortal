import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, Image, View, TouchableOpacity, SafeAreaView } from 'react-native';
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import { strings } from "../helper/Common/String";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { UserContext } from "../helper/utils/context";
import SideMenuModal from "./SideMenu";

const ProfileView = ({navigation=useNavigation()}) => {
    const [ userData, setUserData ] = useContext(UserContext);
    const skills = [{id: 1, name: "Java"}, {id: 2, name: "Python"}, {id: 3, name: "Swift"}, {id: 4, name: "JavaScript"}, {id: 5, name: "iOS App Development"},
    {id: 6, name: "React-Native"}, {id: 7, name: "UI/UX Designing"}, {id: 8, name: "VS Code"}];
    const [showSideMenu, setShowSideMenu] = useState(false);
   
    React.useLayoutEffect(() => {
       {(userData.isSeeker == 1) ? navigation.setOptions({
            headerLeft: () => 
                <TouchableOpacity onPress={() => setShowSideMenu(true)}>
                    <Image 
                        source={ImagesPath.sideMenuImg} 
                        style={{width: 24, height: 24, resizeMode: "contain", tintColor: color.white, marginLeft: 20}}
                    />
                </TouchableOpacity>
        }) : null}
    }, [navigation]);
    return(
        <SafeAreaView style={{backgroundColor: color.mainColor, flex: 1, marginBottom: (userData.isSeeker == 1) ? 0:-32}}>
            <View style={{flexDirection: "row", margin: 24, width: "100%" }}>
            <View style={{flexDirection: "row", width: "80%"}}>
            <Image 
                source={ImagesPath.userwhiteImg}
                style={{width:100, height: 100, borderRadius: 50}}
            />
            <View style={{flexDirection: "column", justifyContent: "center", paddingHorizontal: 12, width: "65%"}}>
                <Text style={[CustomStyling.title, {alignSelf: "flex-start", marginBottom: 4}]} numberOfLines={2}>User Name Company Name</Text>
                <Text style={[CustomStyling.subTitle, {alignSelf: "flex-start", marginBottom: 4}]} numberOfLines={2}>User Designation</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image 
                        source={ImagesPath.locationImg}
                        style={{width: 14, height: 14, tintColor: color.white, resizeMode: "contain"}}
                    />
                    <Text style={[CustomStyling.subTitle, {alignSelf: "flex-start", marginLeft: 4}]}>User Location</Text>
                </View>
            </View>
            </View>
            {(userData.isSeeker == 1) ? <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => navigation.navigate("EditProfile")}>
                    <Image 
                        source={ImagesPath.editImg}
                        style={{height: 24, width: 24, tintColor: color.white}}
                    />
                </TouchableOpacity>
                : 
                <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => navigation.navigate("EditProfile")}>
                    <Image 
                        source={ImagesPath.heartImg}
                        style={{height: 24, width: 24, tintColor: color.white}}
                    />
                </TouchableOpacity>
            }
            </View>
        <ScrollView style={CustomStyling.curveViewStyle}>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, padding: 16}}>
                <Text style={CustomStyling.medium16Text}>About me</Text>
                <Text style={[CustomStyling.regular16Text, {marginTop: 8}]}>{strings.loremIpsum}</Text>
            </View>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16}}>
                <Text style={CustomStyling.medium16Text}>My Skills</Text>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 8, width: "100%" }}>
                {skills.map((item, index) => ( 
                    <View key={index} style={{borderRadius: 12, backgroundColor: color.white, paddingHorizontal: 8, paddingVertical: 4, marginVertical: 4, marginRight: 8, borderWidth: 1}}>
                        <Text style={[CustomStyling.regular16Text]}>{item.name}</Text>
                    </View>
                ))}
                </View>
            </View>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16}}>
                <View>
                    <Text style={CustomStyling.medium16Text}>Highest Education</Text>
                    <Text style={[CustomStyling.regular16Text, {marginTop: 4}]}>Degree in Bachelor's of Technology</Text>
                </View>
                <View style={{marginVertical: 8}}>
                    <Text style={CustomStyling.medium16Text}>Total Experience</Text>
                    <Text style={[CustomStyling.regular16Text, {marginTop: 4}]}>2 Years</Text>
                </View>
            </View>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16, marginBottom: (userData.isSeeker == 1) ? 40:48}}>
                <Text style={CustomStyling.medium16Text}>Resume</Text>
                <View style={{borderRadius: 16, backgroundColor: color.white, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 16, marginTop: 8}}>
                        <Text style={[CustomStyling.regular16Text]}>My Resume</Text>
                    </View>
            </View>
            
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

export default ProfileView;