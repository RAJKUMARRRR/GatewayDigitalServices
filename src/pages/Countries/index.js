import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import CountryListItem from '../../components/CountryListItem';
import Header from '../../components/HeaderOne';
import SearchBar from '../../components/SearchBar';

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
    };
  }

  onSearchHandler = searchString => {
    if (!searchString) {
      this.setState({
        searchText: '',
        searchResult: [],
      });
      return;
    }
    let str = searchString
      .toString()
      .trim()
      .toLowerCase();
    this.setState({
      searchText: str,
      searchResult: this.props.route.params.countries.filter(
        con =>
          (con.title + ' ' + con.countryCodeTwo + ' ' + con.countryCodeThree)
            .toLowerCase()
            .indexOf(str) >= 0,
      ),
    });
  };

  render() {
    const {
        props,
        onSearchHandler,
        state: {searchText, searchResult = []},
      } = this,
      {countries = [], onCountryselected = () => 1} = props.route.params;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
        <View style={styles.main}>
          <Header
            enableBack
            onBack={() => this.props.navigation.goBack()}
            title="Select Country"
          />
          <View style={styles.scroll}>
            <SearchBar
              style={{marginLeft: 15, marginRight: 15}}
              onSearch={onSearchHandler}
              placeholder="Search for country"
            />
            <ScrollView>
              {(searchText ? searchResult : countries).map(item => (
                <CountryListItem
                  imageUrl={
                    'https://www.countryflags.io/' +
                    item.countryCodeTwo +
                    '/flat/64.png'
                  }
                  title={item.mobileCode + ' ' + item.title}
                  subTitle={item.mobileCode}
                  key={item.id}
                  id={item.id}
                  onItemSelected={() => {
                    onCountryselected(item);
                    this.props.navigation.goBack();
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
});

export default Countries;
