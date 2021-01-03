import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { atom } from 'recoil';

import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';

import PopUpMenu from '../../../../components/menu/PopUpMenu';

import EditContent from './EditContent';
import EditPopUp from './EditPopUp';
import EditButtons from './EditButtons';
import EditDelete from './EditDelete';

import { decksContent } from '../../../../config/deck/Deck';

export const termState = atom({
  key: 'termState',
  defalut: '',
});
export const definitionState = atom({
  key: 'definitionState',
  defalut: [],
});
export const synonymState = atom({
  key: 'synonymState',
  defalut: [],
});
export const antonymState = atom({
  key: 'antonymState',
  defalut: [],
});
export const prefixState = atom({
  key: 'prefixState',
  defalut: [],
});
export const suffixState = atom({
  key: 'suffixState',
  defalut: [],
});
export const exampleTState = atom({
  key: 'exampleTState',
  defalut: [],
});
export const exampleDState = atom({
  key: 'exampleDState',
  defalut: [],
});
export const cfState = atom({
  key: 'cfState',
  defalut: [],
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.defaultBackground,
  },
  containers: {
    flex: 1,
  },
  overlayStyle: {
    backgroundColor: Color.gray1,
    opacity: 0.5,
    color: Color.white3,
    flex: 1,
  },
  menuview: {
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    left: '5%',
    right: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popview: {
    backgroundColor: Color.white1,
    paddingTop: 6,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 10,
  },
});

/**
 * Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('edit', { deckID });
 * props: { navigation, route };
 * recoil: { decksState };
 * state: { layout, deckID, general };
 *
 * ```
 */
const Edit = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // recoil
  // const generals = useRecoilValue(decksGeneral);
  // state
  const [content, setContent] = useState(decksContent[deckID]);
  // const content = decksContent[deckID];
  const [deleteVisible, setDeleteVisible, backVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [layout, setLayout] = useState({ height: 300, width: 300 });

  const renderDeleteView = () => <EditDelete content={content} />;

  const renderBasicView = () => (
    <View style={style.container}>
      <EditContent
        content={content}
        setVisible={setEditVisible}
      />
    </View>
  );

  const renderPopUp = () => {
    const renderMenuView = () => (
      <View
        style={style.menuview}
        onLayout={(e) => setLayout(func.onLayoutContainer(e))}
      >
        <View style={style.popview}>
          <EditPopUp
            width={layout.width}
            setVisible={setEditVisible}
          />
        </View>
      </View>
    );
    return (
      <PopUpMenu
        isVisible={editVisible}
        setVisible={setEditVisible}
        renderMenu={renderMenuView}
        overlayStyle={style.overlayStyle}
        onPress={() => {}}
      />
    );
  };

  return (
    <View style={style.container}>
      <View style={{ flex: 1 }}>
        <EditButtons
          deleteVisible={deleteVisible}
          backVisible={backVisible}
          setVisible={setDeleteVisible}
        />
        {deleteVisible ? renderDeleteView() : renderBasicView()}
      </View>
      {renderPopUp()}
    </View>
  );
};

Edit.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Edit.defaultProps = {

};

export default Edit;

/* export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckC: [],
      editVisible: false,
      deleteVisible: false,
      layout: { height: 0, width: 0 }, // layoutの初期値はすぐ
      term: '',
      definition: '',
      antonym: '', // 配列型にする、tagsinpu的な物の導入
      prefix: '',
      suffix: '',
      exampleT: '',
      exampleD: '',
      cf: '',
    };
  }

  componentDidMount() {
    this.setState({ deckC: DeckContent[0] });
  }

  renderPopUp = () => {
    const { editVisible } = this.state;
    return (
      <PopUpMenu
        isVisible={editVisible}
        setVisible={(bool) => this.setState({ editVisible: bool })}
        renderMenu={this.renderMenuView}
        overlayStyle={style.overlayStyle}
      />
    );
  }

  renderMenuView = () => (
    <View
      style={style.menuview}
      onLayout={(e) => this.setState({ layout: func.onLayoutContainer(e) })}
    >
      <View style={style.popview}>
        {this.renderMenu()}
      </View>
    </View>
  )

  renderMenu = () => {
    const {
      layout: { width },
      term, definition, antonym, prefix, suffix, exampleT, exampleD, cf,
    } = this.state;
    return (
      <EditPopUp
        term={term}
        definition={definition}
        antonym={antonym}
        prefix={prefix}
        suffix={suffix}
        exampleT={exampleT}
        exampleD={exampleD}
        cf={cf}
        setState={(state) => this.setState(state)} // { term: 'apple' }
        width={width}
      />
    );
  }

  renderMainContents = () => {
    const {
      deckC,
    } = this.state;
    return (
      <EditContent
        deckC={deckC}
        onPressEditIcon={(content) => this.setState({
          term: content.term,
          definition: deck.formatArrayContent(content.definition),
          antonym: deck.formatArrayContent(content.antonym), // 配列型にする、tagsinpu的な物の導入
          prefix: deck.formatArrayContent(content.prefix),
          suffix: deck.formatArrayContent(content.suffix),
          exampleT: deck.formatArrayContent(content.exampleT),
          exampleD: deck.formatArrayContent(content.exampleD),
          cf: deck.formatArrayContent(content.cf),
        })}
        setVisible={(bool) => this.setState({ editVisible: bool })}
      />
    );
  }

  renderButtons = () => {
    const { navigation } = this.props;
    const { deleteVisible } = this.state;
    return (
      <EditButtons
        navigation={navigation}
        deleteVisible={deleteVisible}
        setState={(state) => this.setState(state)}
      />
    );
  }

  renderDeleteView = () => {
    const { deckC } = this.state;
    const { navigation } = this.props;
    return (

      <View style={style.container}>
        {this.renderButtons()}
        <EditDelete
          deckC={deckC}
        />
      </View>
    );
  }

  renderBasicView = () => {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        {this.renderButtons()}
        <ScrollView style={style.containers}>
          {this.renderMainContents()}
        </ScrollView>
        {this.renderPopUp()}
      </View>
    );
  }

  render() {
    const { deleteVisible } = this.state;
    return (
      deleteVisible ? this.renderDeleteView() : this.renderBasicView()
    );
  }
} */

/*
<View

>onLayout={e=>{
    const height = e.nativeEvent.layout.height;
    const width = e.nativeEvent.layout.width
  }}

              term: content.term,
              definition: content.definition,
              antonym: content.antonym, // 配列型にする、tagsinpu的な物の導入
              prefix: content.prefix,
              suffix: content.suffix,
              exampleT: content.exampleT,
              exampleD: content.exampleD,
              cf: content.cf,
</View>
*/
