import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import { atom, useRecoilState } from 'recoil';

const formsInputState = atom({
  key: 'formsInputState',
  default: { name: '', email: '', password: '' },
});

const AuthForms = (props) => {
  // props
  const { /* navigation, */ visible } = props;
  // recoil
  const [formsInput, setFormsInput] = useRecoilState(formsInputState);
  const [name, setName] = useState(formsInput.name);
  const [email, setEmail] = useState(formsInput.email);
  const [password, setPassword] = useState(formsInput.password);

  useEffect(() => setFormsInput({ name, email, password }), [name, email, password]);
  // useEffect(() => {
  //   setName(formsInput.name);
  //   setEmail(formsInput.email);
  //   setPassword(formsInput.password);
  // }, [formsInput]);

  const inputs = [
    { title: 'Name', value: name, onChangeText: setName },
    { title: 'Email', value: email, onChangeText: setEmail },
    { title: 'Password', value: password, onChangeText: setPassword },
  ];

  return (
    <View style={{ }}>
      {inputs.map((input) => ((visible?.[input.title.toLowerCase()]) ? (
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={{ padding: 10, fontSize: 18 }}>{input.title.toUpperCase()}</Text>
          <TextInput value={input.value} onChangeText={input.onChangeText} label={input.title} />
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
