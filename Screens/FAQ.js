import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { color } from "../helper/Common/Colors";
import ImagesPath from "../assets/Icons/ImagesPath";

const FAQView = ({navigation=useNavigation(), route}) => {
    const [noticeData, setNoticeData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [listPage, setListPage] = useState(1);

    const setData = () => {
        let DummyNotices = [{id: 0, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: false},
        {id: 1, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
        {id: 2, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
        {id: 3, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
        {id: 4, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
        {id: 5, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
        {id: 6, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
        {id: 7, question: "Lorem lpsum is simply dummy text, Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true}];
        setNoticeData(DummyNotices);
    }
       
        const getAttendanceData = async(pageNum) => {
           
        };

        const toggleNoticeView = (index) => {
            var notices = [...noticeData];
            notices[index].hidden = !notices[index].hidden;
            setNoticeData(notices);
        }

        useEffect(() => {
            setData();
        }, []);
    
    return(
        <View style={{backgroundColor: color.mainColor, flex: 1}}>
        
            <View style={[CustomStyling.curveViewStyle, {padding: 0, flex: 1}]}>
               
                    <FlatList 
                            data={noticeData}
                            keyExtractor={({id}, index) => id}
                            style={{marginVertical: 8, paddingHorizontal: 20}}
                            renderItem={({item, index}) => ( <View style = {CustomStyling.cardStyle}>
                                <TouchableOpacity onPress={() => {
                                    toggleNoticeView(index);
                                }}>
                                    {/* <View style={{width:4, height: 4, borderRadius: 2, backgroundColor: color.darkRed, marginTop: 4, marginLeft: 4}}>

                                    </View> */}
                                    <View style={{ flexDirection: "row", marginHorizontal: 8, marginVertical: 8}}>
                                        <Text style={[CustomStyling.medium16Text, {width: '90%', }]}>{item.question}</Text>
                                        <View style={{width: '10%', justifyContent: "center"}}>
                                            <Image source={(item.hidden) ? ImagesPath.downArrowImg : ImagesPath.upArrowImg}
                                            style={{width: 16, height: 16, resizeMode: "contain"}}
                                            />
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    {(!item.hidden) ? (<View>
                                        <View style={CustomStyling.seperatorStyle}>
                                        </View>
                                        <View style={{flexDirection: "row", margin: 8}}>
                                            <Text style={[CustomStyling.regular16Text, {fontSize: 14}]}>{item.answer}</Text>
                                    
                                        </View> 
                                    </View>) : null}
                                </View> )
                            }
                            
                    />
            </View>  
        </View>
    );
};

export default FAQView;
