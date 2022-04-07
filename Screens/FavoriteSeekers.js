import  React, { useState, useContext }  from "react";
import ImagesPath from "../assets/Icons/ImagesPath";
import { color } from "../helper/Common/Colors";
import { Text, Image, View, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import fonts from "../helper/Common/fonts";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { useNavigation } from "@react-navigation/native";
import SideMenuModal from "./SideMenu";
import { UserContext } from "../helper/utils/context";

const FavoriteSeekersListView = ({navigation=useNavigation()}) => {
    const [ userData, setUserData ] = useContext(UserContext);
    const jobs = [{id: 1, image: ImagesPath.demoLogoImg}, {id: 2, image: ImagesPath.clockImg}, {id: 3, image: ImagesPath.addImg}, {id: 4, name: ImagesPath.activeUserImg},
        {id: 5, image: ImagesPath.demoLogoImg}, {id: 6, image: ImagesPath.clockImg}, {id: 7, image: ImagesPath.addImg}, {id: 8, name: ImagesPath.activeUserImg}];
    const [showSideMenu, setShowSideMenu] = useState(false);
   
        // React.useLayoutEffect(() => {
        //     navigation.setOptions({
        //       headerLeft: () => 
        //     <TouchableOpacity onPress={() => setShowSideMenu(true)}>
        //         <Image 
        //             source={ImagesPath.sideMenuImg} 
        //             style={{width: 24, height: 24, resizeMode: "contain", tintColor: color.white, marginLeft: 20}}
        //         />
        //       </TouchableOpacity>
        //     });
        //   }, [navigation]);

    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
            {/* <CustomTextField
                placeholder={"Search Job"}
                rightImagePath={ImagesPath.searchImg}
                containerStyle={{marginHorizontal: 24}}
            /> */}
            
            <View style={[CustomStyling.curveViewStyle, {padding: 0}]}>
            
                <FlatList 
                    data={jobs}
                    style={{marginVertical: 8, paddingHorizontal: 20}}
                    keyExtractor={({id}, index) => id}
                    renderItem={({item}) => (
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
                    )}
                />
            {/* <View  style={{ marginTop: -140, alignItems: "flex-end", marginBottom: 50}}>
                <TouchableOpacity  onPress={() => navigation.navigate("EditProfile")} style={{ height: 52, width: 52}}>
                    <Image 
                        source={ImagesPath.addImg}
                        style={{height: 52, width: 52, tintColor: color.buttonColor}}
                    />
                </TouchableOpacity>
            </View> */}
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
        </View>
    );
};

export default FavoriteSeekersListView;