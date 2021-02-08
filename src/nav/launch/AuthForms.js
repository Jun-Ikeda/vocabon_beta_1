import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import { atom, useRecoilState } from 'recoil';
import { func } from '../../config/Const';
import Icon from '../../components/Icon';

const formsInputState = atom({
  key: 'formsInputState',
  default: { name: '', email: '', password: '' },
});

const style = StyleSheet.create({
  absoluteIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
  },
});

const AuthForms = (props) => {
  // props
  const { /* navigation, */ visible } = props;
  // recoil
  const [formsInput, setFormsInput] = useRecoilState(formsInputState);
  const [name, setName] = useState(formsInput.name);
  const [email, setEmail] = useState(formsInput.email);
  const [password, setPassword] = useState(formsInput.password);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (!func.objectEqual(formsInput, { name, email, password })) { setFormsInput({ name, email, password }); }
  }, [name, email, password]);
  useEffect(() => {
    if (!func.objectEqual(formsInput, { name, email, password })) {
      setName(formsInput.name);
      setEmail(formsInput.email);
      setPassword(formsInput.password);
    }
  }, [formsInput]);

  const inputs = [
    {
      title: 'Name', value: name, onChangeText: setName, buttons: [/* { icon: { collection: '', name: '' }, onPress: () => {} } */],
    },
    {
      title: 'Email', value: email, onChangeText: setEmail, buttons: [],
    },
    {
      title: 'Password',
      value: password,
      onChangeText: setPassword,
      buttons: [{ icon: { collection: 'Ionicons', name: hidePassword ? 'md-eye' : 'md-eye-off' }, onPress: () => setHidePassword(!hidePassword) }],
    },
  ];
  return (
    <View style={{ }}>
      {inputs.map((input) => ((visible?.[input.title.toLowerCase()]) ? (
        <View style={{ paddingHorizontal: 30 }} key={input.title.toLowerCase()}>
          <Text style={{ padding: 10, fontSize: 18 }}>{input.title.toUpperCase()}</Text>
          <TextInput
            value={input.value}
            onChangeText={input.onChangeText}
            label={input.title}
            secureTextEntry={(input.title.toLowerCase() === 'password') && hidePassword}
          />
          <View style={style.absoluteIconContainer}>
            {input.buttons.map((button) => {
              const IconComponent = Icon[button.icon.collection];
              return (
                <IconComponent name={button.icon.name} onPress={button.onPress} />
              );
            })}
          </View>
        </View>
      ) : null))}
    </View>
  );
};

AuthForms.propTypes = {
  // navigation: PropTypes.object.isRequired,
  visible: PropTypes.shape({
    name: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool,
  }),
};

AuthForms.defaultProps = {
  visible: { name: true, email: true, password: true },
};

export default AuthForms;
