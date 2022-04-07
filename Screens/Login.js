import React, {useState, useContext, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup';
import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { color } from "../helper/Common/Colors";
import CustomTextField from "../helper/components/CustomTextField";
import { MainButton } from "../helper/components/mainButton";
import { TextButton } from "../helper/components/TextButton";
import { AuthStyle } from "../helper/CustomStyle/AuthStyle";
import { CustomStyling } from "../helper/CustomStyle/CustomStyling";
import { UserContext } from "../helper/utils/context";

const LoginView = ({navigation=useNavigation()}) => {
    const [userData, setUserData] = useContext(UserContext);
    const [showErrorMsg, setShowErrMsg] = useState(false);

    const loginValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Please enter email'),
        password: yup
          .string()
          .min(6, ({ min }) => `Please enter password of at least ${min} characters`)
          .required('Please enter password'),
    });

    useEffect(() => {
        setShowErrMsg(false);
    }, []); 

    return(
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
                setUserData({isSeeker: 1});
                navigation.navigate("SeekerTabView");
            }}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
        <SafeAreaView style={{backgroundColor: color.mainColor, flex: 1}}>
            <Text style={[AuthStyle.viewTitle, {marginTop: 40}]}>Login</Text>
        <ScrollView style={[CustomStyling.curveViewStyle, {marginTop: 40, marginBottom: -32}]}>
            <Text style={[{marginTop: 40, marginBottom: 60}, AuthStyle.viewSubTitile]}>Welcome, please login to continue</Text>
            <CustomTextField 
                pickerLabel="Email"
                placeholder={"Enter email"}
                defaultValue={""}
                onTextChange={handleChange("email")}
                errorText={errors.email}
                showError={ showErrorMsg && errors.email }
            />
            <CustomTextField 
                pickerLabel="Password"
                placeholder={"Enter password"}
                defaultValue={""}
                isPasswordField={true}
                onTextChange={handleChange("password")}
                errorText={errors.password}
                showError={ showErrorMsg && errors.password }
            />
            <MainButton 
                text={"Job Seeker Login"}
                // onPress={() => {(isValid) ? handleSubmit() : setShowErrMsg(true);
                // }}
                // disabled={!isValid}
                onPress={()=>{
                    setUserData({isSeeker: 1});
                    navigation.navigate("SeekerTabView");
                }}
            />
            <MainButton 
                text={"Job Recruiter Login"}
                onPress={()=>{
                    setUserData({isSeeker: 0});
                    navigation.navigate("RecruiterTabView");
                }}
                // disabled={!isValid}
            />
            <TextButton 
                text={"Forgot Password?"}
                viewStyle={{alignSelf: "flex-end", marginTop: 12}}
                onPress={() => navigation.navigate("ForgetPassword")}
            />
            <View style={{flexDirection: "row", alignSelf: "center", marginTop: 24, marginBottom: 48}}>
                <Text style={CustomStyling.regular16Text}>Don't have an account? </Text>
                <TextButton 
                    text={"Signup Here"}
                    onPress={() => navigation.navigate("Signup")}
                />
            </View>
            
        </ScrollView>
       </SafeAreaView>
       )}
       </Formik>
    );

};

export default LoginView;