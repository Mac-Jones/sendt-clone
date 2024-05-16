import { CustomerMaps, CustomerRoutes } from '@/components/templates';
import { useLocation } from '@/hooks';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3LightTheme } from 'react-native-paper';
import { SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';

const Home = () => {
  const locationProps = useLocation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'maps', title: 'Map' },
    { key: 'routes', title: 'Pickups' },
  ]);

  const renderScene = (
    props: SceneRendererProps & {
      route: {
        key: string;
        title: string;
      };
    },
  ) => {
    switch (props.route.key) {
      case 'maps':
        return <CustomerMaps {...locationProps} />;
      case 'routes':
        return <CustomerRoutes {...props} />;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      activeColor="#fff"
      labelStyle={styles.tabLabel}
      tabStyle={styles.tab}
    />
  );

  return (
    <>
      <View style={styles.user}>
        <View style={styles.pic} />
        <View style={styles.status} />
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({
  indicator: { backgroundColor: 'transparent' },
  tabBar: {
    position: 'absolute',
    top: verticalScale(60),
    width: horizontalScale(150),
    borderRadius: moderateScale(70),
    left: horizontalScale(20),
    alignSelf: 'flex-start',
    backgroundColor: MD3LightTheme.colors.primary,
  },
  tab: {
    padding: 0,
    alignSelf: 'auto',
    paddingRight: horizontalScale(10),
  },
  tabLabel: {
    textTransform: 'capitalize',
    fontWeight: '500',
    fontSize: moderateScale(13),
    color: MD3LightTheme.colors.inversePrimary,
  },
  pic: {
    position: 'relative',
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(100),
    backgroundColor: MD3LightTheme.colors.primary,
    marginBottom: verticalScale(10),
  },
  status: {
    width: horizontalScale(10),
    height: verticalScale(10),
    backgroundColor: 'green',
    borderRadius: 100,
    top: verticalScale(-20),
    position: 'relative',
    right: moderateScale(-35),
  },
  user: {
    position: 'absolute',
    top: verticalScale(60),
    right: horizontalScale(20),
    zIndex: 100,
  },
});

export default Home;
