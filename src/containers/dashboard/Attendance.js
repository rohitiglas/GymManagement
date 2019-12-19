import {Card} from 'react-native-paper';
import {Text, View} from 'react-native';
import React from 'react';
import {
  getTimeFromDate,
  ShowCurrentDate,
} from '../../components/GetCurrentDate';

const Attendance = props => {
  let isPunch =
    props.userPunch &&
    Object.entries(props.userPunch).length === 0 &&
    props.userPunch.constructor === Object;
  return (
    <View style={{margin: 20}}>
      <Card style={{width: '100%'}}>
        <View
          style={{
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#2116a8', fontSize: 12, marginLeft: 15}}>
            Mark Attendance
          </Text>
          <Text style={{color: '#2116a8', fontSize: 12, marginRight: 15}}>
            Locate Me
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 10,
            height: 0.5,
            width: '90%',
            flexDirection: 'row',
            backgroundColor: '#858d8c',
          }}
        />

        <Card
          onPress={props.onPunchClick}
          style={{
            borderRadius: 20,
            marginTop: 20,
            alignItems: 'center',
            alignSelf: 'center',
            width: '70%',
            backgroundColor: !isPunch ? '#2b88ff' : '#fd2906',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 15,
              color: '#FFFFFF',
              fontSize: 14,
            }}>
            {ShowCurrentDate()}
          </Text>

          {isPunch && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 25,
                marginBottom: 35,
                color: '#FFFFFF',
                fontSize: 20,
              }}>
              No Time
            </Text>
          )}

          {!isPunch && (
            <View>
              <Text style={{marginTop: 15, color: '#FFFFFF', fontSize: 16}}>
                IN TIME :{' '}
                {props.userPunch
                  ? getTimeFromDate(props.userPunch.checkInTime)
                  : ''}
              </Text>
              <Text
                style={{
                  marginBottom: 30,
                  marginTop: 5,
                  color: '#FFFFFF',
                  fontSize: 16,
                }}>
                OUT TIME :{' '}
                {props.userPunch
                  ? props.userPunch.checkOutTime > 0
                    ? getTimeFromDate(props.userPunch.checkOutTime)
                    : ''
                  : ''}
              </Text>
            </View>
          )}
        </Card>

        <Text
          style={{
            marginTop: 15,
            textAlign: 'center',
            color: '#525252',
            fontSize: 12,
            marginLeft: 15,
          }}>
          Note: Tap above to mark attendance
        </Text>

        <View
          style={{
            alignSelf: 'center',
            marginTop: 10,
            height: 0.5,
            width: '90%',
            flexDirection: 'row',
            backgroundColor: '#858d8c',
          }}
        />

        <View
          style={{
            marginBottom: 10,
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#2116a8', fontSize: 12, marginLeft: 15}}>
            Apply Leave
          </Text>
          <Text style={{color: '#2116a8', fontSize: 12, marginRight: 15}}>
            Apply On Duty
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default Attendance;
