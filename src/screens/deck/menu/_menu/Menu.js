import React, { useEffect } from 'react';
import {
  View, StyleSheet, Image, ScrollView, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import { useNavigationState } from '@react-navigation/native';
import Color from '../../../../config/Color';
import { unshortenURI } from '../../../../config/Unsplash';
import MenuButtons from './MenuButtons';
import MenuUtility from './MenuUtility';
import { decksGeneral, getDeckGeneral } from '../../../../config/deck/Deck';
import { getAccountContent, getAccountGeneral } from '../../../../config/account/Account';
import MenuShareButton from './MenuShareButton';

// import DeckMenuButtons from './DeckMenuButtons';
// import DeckMenuUtilities from './DeckMenuUtilities';

const imgHeight = 300;
// const normalFontSize = 15;
// const wideIndent = 20;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  // thumbnail: {
  // },
  overlay: {
    backgroundColor: Color.gray1,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,

  },
  buttonContainer: {
    paddingTop: 5,
  },
});

/**
 * Menu Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('deckmenu', { deckID });
 * props: { navigation, route };
 * recoil: { decksState };
 * state: { layout, deckID, general };
 * ```
 */
const Menu = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // recoil
  const decksGeneralState = useRecoilValue(decksGeneral);
  //
  const deckGeneral = getDeckGeneral(decksGeneralState, deckID);
  const accountContent = getAccountContent(deckID);
  const accountGeneral = getAccountGeneral();

  const routes = useNavigationState((_state) => _state.routes);
  useEffect(() => console.log(routes), []);

  const renderThumbnail = () => (
    <View>
      <Image
        style={{ width: '100%', height: imgHeight }}
        source={{ uri: unshortenURI(deckGeneral.thumbnail.uri) }}
      />
      <View style={style.overlay} />
    </View>
  );

  const renderContent = () => (
    <MenuUtility accountContent={accountContent} deckGeneral={deckGeneral} accountGeneral={accountGeneral} deckID={deckID} navigation={navigation} />
  );

  const renderButtons = () => (
    <View style={style.buttonContainer}>
      <MenuButtons navigation={navigation} deckID={deckID} userID={deckGeneral.user} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={style.container}
        contentContainerStyle={{ paddingBottom: 10 }}
        // onLayout={(e) => setLayout(func.onLayoutContainer(e))}
      >
        {renderThumbnail()}
        {renderContent()}
        {renderButtons()}
      </ScrollView>
      <MenuShareButton deckID={deckID} />
    </View>
  );
};

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Menu.defaultProps = {

};

export default Menu;

/* class DeckMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckG: {
        title: '',
        id: '',
        language: {
          term: '',
          definition: '',
        },
        thumbnail: {
          uri: '',
          user: {
            link: '',
            name: '',
          },
        },
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const deckG = navigation.getParam('deckG');
    this.setState({ deckG });
  }

  renderHeader = () => {
    // const { deck: { title } } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
      }}
      >
        <HeaderWithBack
          navigation={navigation}
          iconStyle={{ color: Color.black }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

  renderThumbnail = () => {
    const { deckG: { thumbnail: { uri } } } = this.state;
    return (
      <View>
        <Image
          style={{ width: '100%', height: imgHeight }}
          source={{ uri: Unsplash.unshortenURI(uri) }}
        />
        <View style={style.overlay} />
      </View>
    );
  }

  renderContent = () => {
    const { deckG: { title, language, thumbnail: { user } } } = this.state;
    return (
      <DeckMenuUtilities title={title} language={language} user={user} />
    );
  }

  renderButtons = () => {
    const { navigation } = this.props;
    return (
      <View style={style.buttonContainer}>
        <DeckMenuButtons navigation={navigation} />
      </View>
    );
  };

  render() {
    return (
      <View
        style={style.container}
        onLayout={(e) => this.setState({ layout: func.onLayoutContainer(e) })}
      >
        {this.renderThumbnail()}
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderButtons()}
      </View>
    );
  }
} */
