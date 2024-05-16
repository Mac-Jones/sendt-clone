import { Checkbox } from '@/components/atoms';
import { horizontalScale, moderateScale, verticalScale } from '@/themes';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';

const Availability = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <TextInput mode="outlined" label="From" style={{ flex: 1 }} />
        <TextInput mode="outlined" label="To" style={{ flex: 1 }} />
      </View>
      <View style={{ marginTop: verticalScale(20), flex: 1 }}>
        <Text variant="bodyLarge">Repeat</Text>
        <ScrollView contentContainerStyle={{ gap: moderateScale(10) }}>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Sunday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Monday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Tuesday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Wednesday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Thursday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Friday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
          <Checkbox>
            <Text variant="bodyLarge" style={{ marginLeft: horizontalScale(20) }}>
              Every Saturday
            </Text>
          </Checkbox>
          <Divider style={styles.divider} />
        </ScrollView>
      </View>
      <TextInput mode="outlined" label="Suburbs" />
      <Button mode="contained" style={{ marginTop: verticalScale(20), padding: moderateScale(5) }}>
        Save changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  divider: {
    width: '100%',
    marginVertical: verticalScale(5),
  },
});

export default Availability;
