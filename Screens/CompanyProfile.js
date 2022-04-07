import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import { strings } from "../helper/Common/String";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import SideMenuModal from "./SideMenu";

const CompanyProfileView = ({navigation=useNavigation()}) => {
    const CompanyImages = [{id: 1, name: ImagesPath.activeUserImg}, {id: 2, name: ImagesPath.activeUserImg}, {id: 3, name: ImagesPath.activeUserImg}, {id: 4, name: ImagesPath.activeUserImg}];
    const CompanyLocations = [{id: 1, name: "Ludhiana, Punjab"}, {id: 2, name: "Chandigarh"}, {id: 3, name: "Mohali"}, {id: 4, name: "Noida"}];
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
           <View style={{flexDirection: "row", margin: 24, width: "100%" }}>
            <View style={{flexDirection: "row", width: "80%"}}>
            <Image 
                source={ImagesPath.userwhiteImg}
                style={{width:"35%", height: 100, borderRadius: 16, backgroundColor: color.white}}
            />
            <View style={{flexDirection: "column", justifyContent: "center", paddingHorizontal: 12, width: "65%"}}>
                <Text style={[CustomStyling.title, {alignSelf: "flex-start", marginBottom: 4}]} numberOfLines={2}>Company Name</Text>
                <Text style={[CustomStyling.subTitle, {alignSelf: "flex-start", marginBottom: 4}]} numberOfLines={2}>Company Specification</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image 
                        source={ImagesPath.locationImg}
                        style={{width: 14, height: 14, tintColor: color.white, resizeMode: "contain"}}
                    />
                    <Text style={[CustomStyling.subTitle, {alignSelf: "flex-start", marginLeft: 4}]}>Company Location</Text>
                </View>
            </View>
            </View>
            <TouchableOpacity style={{alignItems: "flex-end", borderColor: "#fff", width: 24}} onPress={() => navigation.navigate("EditCompanyProfile")}>
                <Image 
                    source={ImagesPath.editImg}
                    style={{height: 24, width: 24, tintColor: color.white}}
                />
            </TouchableOpacity>
            </View>
        <ScrollView style={CustomStyling.curveViewStyle}>
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, padding: 16}}>
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
            <View style={{backgroundColor: color.backgroundGray, borderRadius: 16, marginTop: 16, marginBottom: 40, padding: 16}}>
                <Text style={CustomStyling.medium16Text}>Company Locations & Contact Detail</Text>
                {CompanyLocations.map((item, index) => ( 
                    <View  key={index}>
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

export default CompanyProfileView;