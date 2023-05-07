import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from '../../server/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUsername,ChangeEmail,ChangePassword} from '../../redux/slices/UserSlices';
import {en,tr} from '../../Localization/localization';
import * as Localization from 'expo-localization';
import {I18n} from 'i18n-js';
import { useState } from 'react';
import { ChangeLanguage } from '../../redux/slices/LocalizationSlice';


const Login = () => {

    const dispatch=useDispatch();
    const user=useSelector((state)=>state.User.username);
    const email=useSelector((state)=>state.User.email);
    const password=useSelector((state)=>state.User.password);

    const currentLanguage=useSelector((state)=>state.Localization.currentLoc);
   

    const translations={
        en:{
            HopinSeniCebindenTanır:"Your Hopi recognizes you in your pocket!",
            Hopiüyeliğiniçinkullanmakistediğin:"You must enter",
            adıemailadresi:" name, email address",
            ve:"and",
            parolanı:"password you want to use ",
            aşağıdakialanayazmalısın:" for your Hopi membership in the field below",
            devamet:"NEXT",
            kullanıcıadı:"Username",
            şifre:"Password",
        },
        tr:{
            HopinSeniCebindenTanır:"Hopi'n seni cebinden tanır!",
            Hopiüyeliğiniçinkullanmakistediğin:"Hopi üyeliğin için kullanmak istediğin",
            adıemailadresi:"adı,email adresi",
            ve:"ve",
            parolanı:"parolanı",
            aşağıdakialanayazmalısın:"aşağıdaki alana yazmalısın",
            devamet:"DEVAM ET",
            kullanıcıadı:"Kullanıcı Adı",
            şifre:"Şifre",



        },
    }
    const i18n=new I18n(translations);
    i18n.locale=currentLanguage;
    i18n.enableFallback=true;

    


    const navigation=useNavigation();

    const handleLogin=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            console.log("BUTONA BASILDI",user);
            navigation.navigate('Welcome',{user:user});
            
        })
        .catch(error=>alert(error.message))
    };

    return (
        <SafeAreaView style={styles.logincontainer}>
            <Image
                source={require('../../img/hopi-logo.png')}
                style={
                    {
                        width: 200,
                        height: 200,
                    }
                }
            />
            <Text style={styles.loginboldtext}>{i18n.t('HopinSeniCebindenTanır')}</Text>
            <Text style={styles.logindefaulttext}>{i18n.t('Hopiüyeliğiniçinkullanmakistediğin')} <Text style={styles.loginminiboldtext}>{i18n.t('adıemailadresi')}</Text> {i18n.t('ve')} <Text style={styles.loginminiboldtext}>{i18n.t('parolanı')}</Text> {i18n.t('aşağıdakialanayazmalısın')}</Text>
            <View>
                <TextInput value={user} onChangeText={text=>dispatch(ChangeUsername(text))} style={styles.logininput} placeholder='Kullanıcı Adı' />
                <TextInput value={email} onChangeText={text=>dispatch(ChangeEmail(text))} style={styles.logininput} placeholder='Email' />
                <TextInput value={password} onChangeText={text=>dispatch(ChangePassword(text))} style={styles.logininput} secureTextEntry={true} />
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.loginbutton}>
                <Text style={styles.loginbuttontext}>{i18n.t('devamet')}</Text>
            </TouchableOpacity>
            <Text>{i18n.t('kullanıcıadı')} : kuscuf15@gmail.com</Text>
            <Text>{i18n.t('şifre')}: 123456</Text>

            <View style={{flexDirection:'row',justifyContent:'space-around',gap:30}}>
                <TouchableOpacity onPress={()=>dispatch(ChangeLanguage("tr"))}>
                    <Text style={{color:'blue'}}>
                        Türkçe
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(ChangeLanguage("en"))}>
                    <Text style={{color:'blue'}}>
                        İngilizce
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    logincontainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap:15
    },
    loginboldtext: {
        fontSize: 15,
        fontWeight: 800
    },
    logindefaulttext: {
        fontSize: 12,
        maxWidth: 350
    },
    loginminiboldtext: {
        fontSize: 12,
        fontWeight: 800
    },
    logininput: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingHorizontal: 45,
        paddingVertical: 10,
        fontWeight:800,
        fontSize:16,
        
    },
    loginbutton: {
        backgroundColor: '#cd2a7d',
        borderRadius: 7
    },
    loginbuttontext: {
        paddingHorizontal: 100,
        paddingVertical: 10,
        color:'#fff',fontSize:16
    }
})