import React, {useState, useCallback} from 'react';
import {Text, StyleSheet, FlatList, View, Modal, TouchableOpacity, Image} from 'react-native';
import RangeSlider from 'rn-range-slider';
import ImagesPath from '../assets/Icons/ImagesPath';
import { color } from '../helper/Common/Colors';
import DropDownPicker from '../helper/components/DropDownPicker';
import { MainButton } from '../helper/components/mainButton';
import { CustomStyling } from '../helper/CustomStyle/CustomStyling';

const JobSeekerFilterModal = ({onPressSubmit = () => {}, onPressCancel = () => {}}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const CompanyLocations = [{id: 1, name: "Ludhiana, Punjab"}, {id: 2, name: "Chandigarh"}, {id: 3, name: "Mohali"}, {id: 4, name: "Noida"}];
    const JobTypes = [{id: 1, name: "Developer"}, {id: 2, name: "Engineer"}, {id: 3, name: "Intern"}, {id: 4, name: "Tester"}, {id: 5, name: "UI/UX Designer"}];
    const [formData, setFormData] = useState({});
    const [lowRange, setLowRange] = useState('');
    const [highRange, setHighRange] = useState('');
    const renderThumb = useCallback(() => <View style={{width: 16, height: 16, borderRadius: 8, backgroundColor: color.mainColor}}></View>, []);
    const renderRail = useCallback(() => <View style={{width: "100%", height: 3, borderRadius: 8, backgroundColor: color.lightGray}}></View>, []);
    const renderRailSelected = useCallback(() => <View style={{flex: 1, height: 3, borderRadius: 8, backgroundColor: color.mainColor}}></View>, []);
    const renderLabel = useCallback(value => <Text>{value}</Text>, []);

    const onTextChange = (key, value) => {
        var data = {...formData};
        data[key] = value;
        setFormData(data);
      };

    const onClickSubmit = () => {
        // if (selectedFilter == 3){
        //     if (startDate == "" || endDate == ""){
        //         setShowErrMsg(true);
        //     }
        //     else{
        //         setShowErrMsg(false);
        //         let from = new Date(startDate);
        //         let to  = new Date(endDate);
        //         let fromDate = moment(from).format("yyyy-MM-DD HH:mm:ss");
        //         let toDate = moment(to).format("yyyy-MM-DD HH:mm:ss");
        //         onPressSubmit(filterData[2].name, fromDate, toDate);
        //     }
        // }
        // else if (selectedFilter == 2 || selectedFilter == 1){
        //     onPressSubmit(filterData.find(item => item.id == selectedFilter).name, "", "");
        // }
        // else{
        //     onPressSubmit("", "", "");
        // }
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                
        }}>
            <View style={styles.overlaycontainer}>
                <View style={styles.sectionview}>
                    <TouchableOpacity style={{zIndex: 110, alignSelf: "flex-end", marginRight: -16}} onPress={() => onPressCancel()}>
                        <Image 
                            source={ImagesPath.cancelImg}
                            style={{height: 40, width: 40, borderRadius: 10, tintColor: color.buttonColor, resizeMode: "contain", zIndex: 1200, backgroundColor: color.white}}
                        />
                    </TouchableOpacity>
                    <Text style={CustomStyling.containerTitle}>Filter</Text>
                    <View>
                        <Text style={[CustomStyling.medium16Text]}>Job Type</Text>
                        <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 4, width: "100%" }}>
                        {JobTypes.map((item, index) => ( 
                            <TouchableOpacity style={{borderRadius: 12, backgroundColor: (formData?.jobType == item.id) ? color.mainColor : color.white, paddingHorizontal: 8, paddingVertical: 4, marginVertical: 4, marginRight: 8, borderWidth: 1}}
                                onPress={() => onTextChange("jobType", item.id)}
                            >
                                <Text style={[CustomStyling.regular16Text, {color: (formData?.jobType == item.id) ? color.white : color.subtitleBlack}]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                    </View>
                    

                    <DropDownPicker
                        pickerLabel="Location"
                        pickerPlaceholder={"Select Location"}
                        value={formData?.officeBranch}
                        pickerData={CompanyLocations}
                        onSelectValue={(val) => onTextChange("officeBranch", val)}
                        
                        containerStyle={{zIndex: 150}}
                    />

                    <View>
                        <Text style={[CustomStyling.medium16Text]}>Expearience</Text>
                        <RangeSlider
                            style={{width: "100%", height: 40}}
                            gravity={'center'}
                            min={0}
                            max={20}
                            step={1}
                            selectionColor="#3df"
                            blankColor="#f618"
                            renderThumb={renderThumb}
                            renderRail={renderRail}
                            renderRailSelected={renderRailSelected}
                            renderLabel={renderLabel}
                            onTouchEnd={(low, high) => {
                                setLowRange(low);
                                setHighRange(high);
                            }}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}> 
                            <Text style={CustomStyling.medium16Text}>{lowRange} Years</Text>
                            <Text style={CustomStyling.medium16Text}>{highRange} Years</Text>
                        </View>
                        
                    </View>
                    <MainButton 
                        text={'Submit'}
                        onPress={() =>{
                            onClickSubmit();
                        }}
                        viewStyle={{marginTop: 12}}
                    />     
                </View>
                
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  overlaycontainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sectionview: {
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    alignSelf: 'center',
    
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
export default JobSeekerFilterModal;
