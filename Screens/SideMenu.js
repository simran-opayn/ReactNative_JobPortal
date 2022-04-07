import { useNavigation, TabActions } from '@react-navigation/native';
import React, {useState, useCallback, useContext} from 'react';
import {Text, StyleSheet, FlatList, View, TouchableOpacity, Image, Modal, SafeAreaView} from 'react-native';
import ImagesPath from '../assets/Icons/ImagesPath';
import { color } from '../helper/Common/Colors';
import fonts from '../helper/Common/fonts';
import { CustomStyling } from '../helper/CustomStyle/CustomStyling';
import { UserContext } from '../helper/utils/context';

const SideMenuModal = ({onPressSubmit = () => {}, onPressCancel = () => {}, navigation=useNavigation()}) => {
    const [userData, setUserData] = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const seekerItems = [{id: 1, name: "Edit Profile", viewName: "EditProfile", icon: ImagesPath.editImg}, {id: 2, name: "Recent Jobs", viewName: "Jobs", icon: ImagesPath.listImg}, 
                            {id: 3, name: "Applied Jobs", viewName: "AppliedJobs", icon: ImagesPath.jobAppliedImg}, {id: 4, name: "Favorite Jobs", viewName: "FavoriteJobs", icon: ImagesPath.favListImg}, 
                            {id: 5, name: "Change Password", viewName: "ChangePassword", icon: ImagesPath.passwordImg}, {id: 6, name: "FAQ", viewName: "FAQ", icon: ImagesPath.faqImg}, 
                            {id: 7, name: "About App", icon: ImagesPath.aboutImg}, {id: 8, name: "Terms & Conditions", icon: ImagesPath.termsImg}, {id: 9, name: "Privacy Policy", icon: ImagesPath.policyImg}];
                            
    const recruiterItems = [{id: 1, name: "Edit Profile", viewName: "EditCompanyProfile", icon: ImagesPath.editImg}, {id: 2, name: "Add Job", viewName: "AddJob", icon: ImagesPath.addJobImg}, 
                                {id: 3, name: "Jobs Listed", viewName: "Jobs", icon: ImagesPath.listImg},  {id: 4, name: "Jobs Offered", viewName: "OfferedJob", icon: ImagesPath.offerrImg}, 
                                {id: 5, name: "Favorite Seekers", viewName: "FavoriteSeekers", icon: ImagesPath.favUsersImg}, {id: 6, name: "Change Password", viewName: "ChangePassword", icon: ImagesPath.passwordImg}, {id: 7, name: "FAQ", viewName: "FAQ", icon: ImagesPath.faqImg}, 
                                {id: 8, name: "About App", icon: ImagesPath.aboutImg}, {id: 9, name: "Terms & Conditions", icon: ImagesPath.termsImg}, {id: 9, name: "Privacy Policy", icon: ImagesPath.policyImg}];

    const onTextChange = (key, value) => {
        var data = {...formData};
        data[key] = value;
        setFormData(data);
      };

    const onPressListItem = (item) => {
        if (userData.isSeeker == 1){
            console.log("Seeker  "+item.viewName+item.id);
            switch(item.id){
                case 1: case 3: case 5: case 6: case 4:
                    console.log("View Name "+item.viewName);
                    navigation.navigate(item.viewName);
                case 2:
                    const jumpToAction = TabActions.jumpTo(item.viewName);
                    navigation.dispatch(jumpToAction);
                default:
                    break;
            }
        }
        else{
            switch(item.id){
                case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    navigation.navigate(item.viewName);
                
                default:
                    break;
            }
        }
        console.log("View Name  >  "+item.viewName);
        onPressCancel();
    };


    return (
        <Modal
            // animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.overlaycontainer}>
                <SafeAreaView style={styles.sectionview}>
                    <View style={{flexDirection: 'row', marginHorizontal: 16}}>
                        <Image
                            source={ImagesPath.userwhiteImg}
                            style={{width: 80, height: 80, borderRadius: 40, borderWidth: 1}}
                        />
                        <View style={{justifyContent: 'center', width: "65%", padding: 8}}>
                            <Text style={[CustomStyling.title, {color: color.titleBlack, alignSelf: 'flex-start'}]}>Joh Smith</Text>
                            <Text style={[CustomStyling.subTitle, {color: color.titleBlack, alignSelf: 'flex-start'}]}>Software Developer</Text>
                        </View>
                    </View>
                    <View style={[CustomStyling.seperatorStyle, {marginVertical: 12, backgroundColor: color.mainColor}]}></View>
                    <FlatList 
                        data={(userData.isSeeker == 1) ? seekerItems : recruiterItems}
                        style={{marginTop: 0, marginBottom: 0}}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}) => (
                            <TouchableOpacity style={[{flexDirection: "row", marginHorizontal: 16, marginVertical: 4, paddingVertical: 8}]} onPress={() => onPressListItem(item)}>
                                <Image 
                                    source={item?.icon}
                                    style={{width: 20, height: 20, resizeMode: "contain", tintColor: color.mainColor, alignSelf: 'flex-start'}}
                                />
                                <View style={{paddingHorizontal: 8, width: "90%"}}>
                                    <Text style={{fontSize: 15, fontFamily: fonts.semiBold, color: color.titleBlack, marginBottom: 4}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={[CustomStyling.seperatorStyle, {marginVertical: 12, backgroundColor: color.mainColor}]}></View>
                    <TouchableOpacity style={[{flexDirection: "row", marginHorizontal: 16, marginVertical: 4, paddingVertical: 8}]} onPress={() => {
                        navigation.navigate("Login")
                        onPressCancel();}}
                    >
                        <Image 
                            source={ImagesPath.logOutImg}
                            style={{width: 20, height: 20, resizeMode: "contain", tintColor: color.mainColor}}
                        />
                        <View style={{paddingHorizontal: 8, width: "90%"}}>
                            <Text style={{fontSize: 15, fontFamily: fonts.semiBold, color: color.mainColor, marginBottom: 4}}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
                <TouchableOpacity style={{width: "15%", height: "100%"}} onPress={() => onPressCancel()}>

                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  overlaycontainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sectionview: {
    backgroundColor: color.backgroundGray,
    borderRadius: 2,
    paddingHorizontal: 56,
    paddingBottom: 24,
    paddingTop: 12,
    alignSelf: 'flex-start',
    height: "100%",
    borderRadius: 8,
    width: '85%',
  },
  mainText: {
    color: color.darkGray,
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 8
  },
  subtext: {
    color: color.subtitleBlack,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8
  },
  cancelmodal: {
    color: color.red,
    fontSize: 16,
    marginTop: 24,
  },
  lineview: {
    height:1,
    width: '80%',
    marginTop: 32,
    backgroundColor: '#808B96',
  },
});
export default SideMenuModal;
