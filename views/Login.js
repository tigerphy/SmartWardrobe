/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import { CenterFocusStrong } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px',
    marginTop: '56px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  companyName1: {
    padding: '10px',
    display: 'flex',
    marginTop: theme.spacing(35),
    fontFamily: 'sofia',
    fontSize: '40px',
    color: 'red',
    justifyContent: 'center',
  },
  companyName2: {
    padding: '10px',
    display: 'flex',
    marginTop: theme.spacing(4),
    fontFamily: 'sofia',
    fontSize: '24px',
    color: 'red',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sv: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    padding: 20,
  },
}));

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(true);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
        navigation.navigate('Home');
      } catch (error) {
        console.log('token check failed', error.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth="xs" padding='10px'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className={classes.inner}>
            <ImageBackground
              source={require('../assets/sakura.png')}
              className={classes.image}
            >
              <Typography className={classes.companyName1} component="h1" variant="h5">
          Smart Wardrobe
        </Typography>
        <Typography className={classes.companyName2} component="h1" variant="h5">
          Your green way of living
        </Typography>
              <View className={classes.form}>
                <Card>
                  {formToggle ? (
                    <>
                      <LoginForm navigation={navigation} />
                    </>
                  ) : (
                    <>
                      <Card.Title h5>Register</Card.Title>
                      <Card.Divider />
                      <RegisterForm navigation={navigation} />
                    </>
                  )}
                  <ListItem
                    onPress={() => {
                      setFormToggle(!formToggle);
                    }}
                  >
                    <ListItem.Content>
                      <Text className={classes.text}>
                        {formToggle
                          ? 'No account? Register here.'
                          : 'Already registered? Login here.'}
                      </Text>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </Card>
              </View>
            </ImageBackground>
          </View>       
        </TouchableWithoutFeedback>
      </Container>
  );
};


Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
