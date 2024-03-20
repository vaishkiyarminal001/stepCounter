import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import {Pedometer} from 'expo-sensors';
import { useEffect, useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {

  const [pedoMeterAvailability, setPedoMeterAvailability] = useState("");
  const [stepCount, updateStepCount] = useState(0);

  var WindowHeight = Dimensions.get("window").height;
  var Dist = stepCount / 1300;
  var DistanceCovered = Dist.toFixed(4);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  useEffect(() =>{
    subscribe();
  }, []);

  // This is for counting the steps and storing the result in the result.step

  const subscribe = () =>{
    const subscription = Pedometer.watchStepCount((result) =>{
      updateStepCount(result.steps);
    });


  // This Function is to check the availibility of the pedometer in the device


Pedometer.isAvailableAsync().then(
  (result) =>{
    setPedoMeterAvailability(String(result));
  },
  (error) =>{
    setPedoMeterAvailability(error);
  }
);

};

  return (
    <View style={styles.container}>

      <ImageBackground
      style={{flex:1}}
      resizeMode='cover'
      blurRadius={8}
      source={require('./assets/running.jpg')}
      >

        <View style={{flex:1, justifyContent: 'center'}}>
        <Text style={styles.headingDesign}>
          Is Step Counter is available on the device : {pedoMeterAvailability}
        </Text>
        </View>

       <View style={{flex:3}}>
        <CircularProgress 
        value={stepCount}
        maxValue={6500}
        radius={210}
        textColor={"#ecf0f1"}
        activeStrokeColor={"#f39c12"}
        inActiveStrokeColor={"#9b59b6"}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={40}
        activeStrokeWidth={40}
        title={"Step Count"}
        titleColor={"#ecf0f1"}
        titleStyle={{ fontWeight: "bold" }}
        />
       </View>


       <View style={{ flex: 1, justifyContent: "center" }}>

         <View style={{ flex: 1 }}>
           <Text
             style={[
               styles.textDesign,
               { paddingLeft: 20, marginLeft: '12%' },
             ]}>Targer : 6500 steps(5kms)</Text>
       </View>

       <View style={{ flex: 1 }}>
           <Text
             style={[
               styles.textDesign,
               { width: "93%", paddingLeft: 20, marginLeft: '1%' },
             ]}>Distance Cover : {DistanceCovered} </Text>
       </View>

       <View style={{ flex: 1 }}>
           <Text
             style={[
               styles.textDesign,
               {  paddingLeft: 10, marginLeft: '12%' },
             ]}>Calories Burnt : {caloriesBurnt}
           </Text>
         </View>

         <StatusBar style="auto" />
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headingDesign:{
    color: 'white',
    backgroundColor: 'rgba(155, 89, 182, 0.5)',
    alignSelf: 'center',
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 40,
    borderColor: 'white',
    // borderWidth: 1
    // fontFamily: "Papyrus",
  },

  textDesign:{
    backgroundColor : "rgba(155, 89, 182, 0.5)",
    height: 50,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
  }
});
