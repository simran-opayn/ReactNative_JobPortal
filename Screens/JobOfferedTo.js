import  React, { useState, useContext }  from "react";
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import CustomTextField from "../helper/components/CustomTextField";
import { Text, Image, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import fonts from "../helper/Common/fonts";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { useNavigation } from "@react-navigation/native";
import JobFilterModal from "./JobFilter";
import SideMenuModal from "./SideMenu";
import { UserContext } from "../helper/utils/context";
import { AuthStyle } from "../helper/CustomStyle/AuthStyle";

const JobOfferedListView = ({navigation=useNavigation()}) => {
    const jobs = [{id: 1, image: ImagesPath.demoLogoImg}, {id: 2, image: ImagesPath.clockImg}, {id: 3, image: ImagesPath.addImg}, {id: 4, name: ImagesPath.activeUserImg},
        {id: 5, image: ImagesPath.demoLogoImg}, {id: 6, image: ImagesPath.clockImg}, {id: 7, image: ImagesPath.addImg}, {id: 8, name: ImagesPath.activeUserImg}];
    const [showFilter, setShowFilter] = useState(false);
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [userData, setUserData] = useContext(UserContext);
   

    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
            
            <View style={[CustomStyling.curveViewStyle, {padding: 0, flex: 1}]}>
            
                <FlatList 
                    data={jobs}
                    style={{marginVertical: 8, paddingHorizontal: 20}}
                    keyExtractor={({id}, index) => id}
                    renderItem={({item}) => (
                        <View style={[CustomStyling.cardStyle, {flexDirection: "row"}]}>
                            <Image 
                                source={item.image}
                                style={{width: "30%", height: "100%", resizeMode: "contain", borderRadius: 12, borderWidth: 0, backgroundColor: color.white}}
                            />
                            <View style={{paddingHorizontal: 8, width: "70%"}}>
                                <Text  style={CustomStyling.listTitle1}>John Smith</Text>
                                <Text  style={{fontSize: 14, fontFamily: fonts.semiBold, color: color.titleBlack}}>3 Years Experience</Text>
                                <View style={{flexDirection: 'row', alignItems: "center", marginVertical: 4}}>
                                    <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Software Developer</Text>
                                    <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: color.mainColor, marginHorizontal: 8}}></View>
                                    <Text  style={{fontSize: 14, fontFamily: fonts.medium, color: color.darkGray}}>Opayn</Text>
                                </View>
                                <View style={{flexDirection: "row", marginBottom: 4, alignItems: "center"}}>
                                    <Text style={CustomStyling.regular16Text}>Job Offered: "Sr. Software Developer</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
                
            </View>
            {(showFilter) ? 
                <JobFilterModal onPressSubmit={(type, startDate, endDate) => {
                    setShowFilter(false);
                    // setListPage(1);
                    // let newParams = {type: type, startDate: startDate, endDate: endDate};
                    // setParams(newParams)
                    // getAttendanceData(1, newParams);
                    }} 
                    onPressCancel={() => setShowFilter(false)} 
                /> 
                : 
                null
            }
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
        </View>
    );
};

export default JobOfferedListView;