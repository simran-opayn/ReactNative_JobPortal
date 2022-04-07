import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, Image, View, TouchableOpacity, SafeAreaView } from 'react-native';
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import { strings } from "../helper/Common/String";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";

const ApplicantDetailView = ({navigation=useNavigation()}) => {
    const skills = [{id: 1, name: "Java"}, {id: 2, name: "Python"}, {id: 3, name: "Swift"}, {id: 4, name: "JavaScript"}, {id: 5, name: "iOS App Development"},
    {id: 6, name: "React-Native"}, {id: 7, name: "UI/UX Designing"}, {id: 8, name: "VS Code"}];
    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
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
            </View>
            <ScrollView style={CustomStyling.curveViewStyle}>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, padding: 16}}>
                    <Text style={CustomStyling.medium16Text}>Resume</Text>
                    <View style={{borderRadius: 16, backgroundColor: color.white, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 16, marginTop: 8}}>
                            <Text style={[CustomStyling.regular16Text]}>My Resume</Text>
                        </View>
                </View>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, padding: 16, marginTop: 16}}>
                    <Text style={CustomStyling.medium16Text}>Why hire me</Text>
                    <Text style={[CustomStyling.regular16Text, {marginTop: 8}]}>{strings.loremIpsum}</Text>
                </View>
                <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16}}>
                    <Text style={CustomStyling.medium16Text}>My Skills</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 8, alignContent: "space-between", justifyContent: "space-between", width: "100%" }}>
                    {skills.map((item, index) => ( 
                        <View style={{borderRadius: 12, backgroundColor: color.white, paddingHorizontal: 8, paddingVertical: 4, marginVertical: 4, borderWidth: 1}}>
                            <Text style={[CustomStyling.regular16Text]}>{item.name}</Text>
                        </View>
                    ))}
                    </View>
                </View>
                <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16, marginBottom: 40}}>
                    <View>
                        <Text style={CustomStyling.medium16Text}>Highest Education</Text>
                        <Text style={[CustomStyling.regular16Text, {marginTop: 4}]}>Degree in Bachelor's of Technology</Text>
                    </View>
                    <View style={{marginVertical: 8}}>
                        <Text style={CustomStyling.medium16Text}>Total Experience</Text>
                        <Text style={[CustomStyling.regular16Text, {marginTop: 4}]}>2 Years</Text>
                    </View>
                    <View>
                        <Text style={CustomStyling.medium16Text}>Current Salary</Text>
                        <Text style={[CustomStyling.regular16Text, {marginTop: 4}]}>$ 50k</Text>
                    </View>
                </View>
                
            </ScrollView>
       </View>
    );

};

export default ApplicantDetailView;