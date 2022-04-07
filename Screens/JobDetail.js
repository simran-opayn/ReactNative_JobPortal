import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import fonts from "../helper/Common/fonts";
import { strings } from "../helper/Common/String";
import { MainButton } from "../helper/components/mainButton";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { UserContext } from "../helper/utils/context";

const JobDetailView = ({navigation=useNavigation()}) => {
    const CompanyImages = [{id: 1, name: ImagesPath.activeUserImg}, {id: 2, name: ImagesPath.activeUserImg}, {id: 3, name: ImagesPath.activeUserImg}, {id: 4, name: ImagesPath.activeUserImg}];
    const CompanyLocations = [{id: 1, name: "Ludhiana, Punjab"}, {id: 2, name: "Chandigarh"}, {id: 3, name: "Mohali"}, {id: 4, name: "Noida"}];
    const [showJobDetail, setShowJobDetail] = useState(true);
    const [ userData, setUserData ] = useContext(UserContext);

    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
            <View style={{flexDirection: "row", marginHorizontal: 24, marginTop: 24, width: "100%" }}>
                <View style={{flexDirection: "row", width: "80%"}}>
                    <Image 
                        source={ImagesPath.userwhiteImg}
                        style={{width:"35%", height: 100, borderRadius: 16, backgroundColor: color.white}}
                    />
                    <View style={{flexDirection: "column", justifyContent: "center", paddingHorizontal: 12, width: "65%"}}>
                        <Text style={[CustomStyling.title, {alignSelf: "flex-start", marginBottom: 4}]} numberOfLines={2}>Softare Developer Softare Developer</Text>
                        <Text style={[CustomStyling.subTitle, {alignSelf: "flex-start", marginBottom: 4}]} numberOfLines={2}>Company Name</Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.locationImg}
                                style={{width: 14, height: 14, tintColor: color.white, resizeMode: "contain"}}
                            />
                            <Text style={[CustomStyling.subTitle, {alignSelf: "flex-start", marginLeft: 4}]}>Company Location</Text>
                        </View>
                    </View>
                </View>
                {(userData.isSeeker == 1) ?  <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => {}}>
                    <Image 
                        source={ImagesPath.heartImg}
                        style={{height: 24, width: 24, tintColor: color.white}}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => navigation.navigate("AddJob")}>
                    <Image 
                        source={ImagesPath.editImg}
                        style={{height: 24, width: 24, tintColor: color.white}}
                    />
                </TouchableOpacity>}
            </View>
            {(userData.isSeeker == 1) ? <View style={[empStyle.HalfLeaveView, {paddingHorizontal: 24, marginTop: 16}]}>
                    <TouchableOpacity onPress={() => {setShowJobDetail(true)}}  style={[
                        (showJobDetail) ? empStyle.SelectedHalfView : empStyle.UnselectedHalfView, 
                        {borderTopLeftRadius: 8, borderBottomLeftRadius: 8}]}
                    >
                        <Text style={(showJobDetail) ? empStyle.selectedText : empStyle.UnselectedText}>Description</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowJobDetail(false)}  style={[
                        (!showJobDetail) ? empStyle.SelectedHalfView : empStyle.UnselectedHalfView,
                        {borderTopRightRadius: 8, borderBottomRightRadius: 8}]}
                    >
                        <Text style={(!showJobDetail) ? empStyle.selectedText : empStyle.UnselectedText}>About Company</Text>
                    </TouchableOpacity>
                </View>
                :
                null
            }
            {(showJobDetail) ? 
                <ScrollView style={[CustomStyling.curveViewStyle, { marginTop: 24 }]}>
                    
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                        <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 8, width: "32%", alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.salaryImg}
                                style={{width: 30, height: 30, resizeMode: "contain", marginBottom: 8}}
                            />
                            <Text style={CustomStyling.medium16Text}>Salary</Text>
                            <Text style={[CustomStyling.regular14Text, {marginTop: 4}]}>$50-60k</Text>
                        </View>
                        <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 8, width: "32%", alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.jobTypeImg}
                                style={{width: 30, height: 30, resizeMode: "contain", marginBottom: 8}}
                            />
                            <Text style={CustomStyling.medium16Text}>Job Type</Text>
                            <Text style={[CustomStyling.regular14Text, {marginTop: 4}]}>Full-Time</Text>
                        </View>
                        <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 8, width: "32%", alignItems: "center"}}>
                            <Image 
                                source={ImagesPath.levelImg}
                                style={{width: 30, height: 30, resizeMode: "contain", marginBottom: 8}}
                            />
                            <Text style={CustomStyling.medium16Text}>Position</Text>
                            <Text style={[CustomStyling.regular14Text, {marginTop: 4}]}>Entry-Level</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16}}>
                        <Text style={CustomStyling.medium16Text}>Requirments</Text>
                        <Text style={[CustomStyling.regular16Text, {marginTop: 8}]}>{strings.loremIpsum}</Text>
                    </View>
                    <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16, marginBottom: (userData.isSeeker == 1)?0:48}}>
                        <Text style={CustomStyling.medium16Text}>Benefits</Text>
                        <Text style={[CustomStyling.regular16Text, {marginTop: 8}]}>{strings.loremIpsum} {strings.loremIpsum}</Text>
                    </View>
                    {(userData.isSeeker == 1) ? 
                        <MainButton
                            text={"Apply"}
                            onPress={() => navigation.navigate("ApplyJob")}
                            viewStyle={{marginBottom: 48}}
                        />
                        :
                        null
                    }
                </ScrollView>
                :
                <ScrollView style={[CustomStyling.curveViewStyle, { marginTop: 24 }]}>
                    <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, padding: 16}}>
                        <Text style={CustomStyling.medium16Text}>About Company</Text>
                        <Text style={[CustomStyling.regular16Text, {marginTop: 8}]}>{strings.loremIpsum}</Text>
                    </View>
                    <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16}}>
                        <Text style={CustomStyling.medium16Text}>Portfolio</Text>
                        <FlatList 
                            horizontal
                                data={CompanyImages}
                                keyExtractor={({id}, index) => id}
                                renderItem={({item}) => (
                                    <View style={{paddingHorizontal: 8, paddingVertical: 4, marginTop: 8, width: 140}}>
                                        <Image 
                                            source={item.name}
                                            style={{width: "100%", height: 120, resizeMode: "contain", borderRadius: 12, borderWidth: 1, backgroundColor: color.white}}
                                        />
                                    </View>
                                )}
                        />
                    </View>
                    <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, marginBottom: 48, padding: 16}}>
                        <Text style={CustomStyling.medium16Text}>Company Locations & Contact Detail</Text>
                        {CompanyLocations.map((item, index) => ( 
                            <View>
                                <View style={{flexDirection: "row", paddingVertical: 4, marginVertical: 4, alignItems: "center"}}>
                                    <Image 
                                        source={ImagesPath.locationImg}
                                        style={{width: 14, height: 14, tintColor: color.buttonColor, resizeMode: "contain"}}
                                    />
                                    <Text style={[CustomStyling.regular16Text]}>{item.name}</Text>
                                </View>
                                <View style={{flexDirection: "row", marginBottom: 8, alignItems: "center"}}>
                                    <Image 
                                        source={ImagesPath.phoneImg}
                                        style={{width: 14, height: 14, tintColor: color.buttonColor, resizeMode: "contain"}}
                                    />
                                    <Text style={[CustomStyling.regular16Text]}>+91-8794561263</Text>
                                </View>
                            </View>
                            ))
                        }
                    </View>
                    
                </ScrollView>
            }
       </View>
    );

};

export default JobDetailView;

const empStyle = StyleSheet.create({
    
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 8,
        //resizeMode: "contain"

    },
    HalfLeaveView: {
        marginTop: 12,
        // flex: 1,
        width: '100%',
        flexDirection: "row",
    },
    SelectedHalfView: {
        backgroundColor: color.buttonColor,
        borderWidth: 1,
        borderColor: color.lightGray,
        // flex: 1,
        width: '50%',
        height: 60,
        justifyContent: "center",
    },
    UnselectedHalfView: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.lightGray,
        // flex: 1,
        width: '50%',
        height: 60,
        justifyContent: "center"
    },
    selectedText: {
        fontSize: 16,
        fontFamily: fonts.bold,
        textAlign: "center",
        color: color.white,
    },
    UnselectedText: {
        fontSize: 16,
        textAlign: "center",
        color: color.titleBlack,
        fontFamily: fonts.bold,
    },
});